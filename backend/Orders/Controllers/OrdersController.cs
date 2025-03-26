using Orders.Data;
using Orders.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using System.Threading.Tasks;
using System.Collections.Generic;
using Orders.Models;
using System.Text.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;

namespace Orders.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly HttpClient _httpClient;
        private readonly IHubContext<OrderHub> _hubContext;
        private readonly IConfiguration _configuration;

        public OrdersController(DataContext context, IHttpClientFactory httpClientFactory, IHubContext<OrderHub> hubContext, IConfiguration configuration)
        {
            _context = context;
            _httpClient = httpClientFactory.CreateClient();
            _hubContext = hubContext;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            // Validate if customer exists
            var customerUrl = $"{_configuration["Services:Customers"]}/api/customers/{orderDto.CustomerId}";
            var customerResponse = await _httpClient.GetAsync(customerUrl);
            if (!customerResponse.IsSuccessStatusCode)
                return BadRequest("Invalid customer");

            // Get product information
            var productIds = orderDto.Items.Select(i => i.ProductId).Distinct();
            var products = await GetProductInformation(productIds);

            // Create order
            var order = new Order
            {
                CustomerId = orderDto.CustomerId,
                OrderItems = orderDto.Items.Select(item => new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = products[item.ProductId].Price
                }).ToList()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Update product stock
            await UpdateProductStock(order.OrderItems);

            // Send SignalR notification
            await _hubContext.Clients.All.SendAsync("OrderCreated", order);

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] OrderStatusUpdateDto statusUpdate)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            order.Status = statusUpdate.NewStatus;
            await _context.SaveChangesAsync();

            // Send SignalR notification
            await _hubContext.Clients.All.SendAsync("OrderStatusUpdated", id, statusUpdate.NewStatus);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            // Send SignalR notification
            await _hubContext.Clients.All.SendAsync("OrderDeleted", id);

            return NoContent();
        }

        private async Task<Dictionary<int, ProductInfo>> GetProductInformation(IEnumerable<int> productIds)
        {
            var productsUrl = $"{_configuration["Services:Products"]}/api/products/batch";
            var response = await _httpClient.PostAsJsonAsync(productsUrl, productIds);
            
            response.EnsureSuccessStatusCode();
            
            return await response.Content.ReadFromJsonAsync<Dictionary<int, ProductInfo>>();
        }

        private async Task UpdateProductStock(List<OrderItem> items)
        {
            var stockUpdates = items.Select(i => new StockUpdateDto(i.ProductId, i.Quantity));
            var stockUrl = $"{_configuration["Services:Products"]}/api/products/stock";
            
            await _httpClient.PutAsJsonAsync(stockUrl, stockUpdates);
        }
    }

    // DTO Classes
    public record OrderDto(int CustomerId, List<OrderItemDto> Items);
    public record OrderItemDto(int ProductId, int Quantity);
    public record ProductInfo(int Id, decimal Price, int Stock);
    public record StockUpdateDto(int ProductId, int Quantity);
    public record OrderStatusUpdateDto(string NewStatus);
}