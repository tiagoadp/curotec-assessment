using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Customers.Data;
using Customers.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;

namespace Customers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDistributedCache _cache;
        private readonly IConfiguration _configuration;

        public CustomersController(DataContext context, IDistributedCache cache, IConfiguration configuration)
        {
            _context = context;
            _cache = cache;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var cacheKey = $"customer_{id}";
            var cachedCustomer = await _cache.GetStringAsync(cacheKey);
            
            if (!string.IsNullOrEmpty(cachedCustomer))
                return Ok(JsonSerializer.Deserialize<Customer>(cachedCustomer));

            var customer = await _context.Customers.FindAsync(id);
            if (customer == null) return NotFound();

            await _cache.SetStringAsync(cacheKey, 
                JsonSerializer.Serialize(customer),
                new DistributedCacheEntryOptions {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
                });

            return customer;
        }

        [HttpPost]
        public async Task<ActionResult<Customer>> CreateCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, Customer customer)
        {
            if (id != customer.Id) return BadRequest();
            
            _context.Entry(customer).State = EntityState.Modified;
            
            try {
                await _context.SaveChangesAsync();
                await _cache.RemoveAsync($"customer_{id}");
            }
            catch (DbUpdateConcurrencyException) {
                if (!CustomerExists(id)) return NotFound();
                throw;
            }
            
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null) return NotFound();
            
            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
            await _cache.RemoveAsync($"customer_{id}");
            
            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }
    }
}