using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Orders.Hubs
{
    public class OrderHub : Hub
    {
        public async Task NotifyOrderUpdate(int orderId, string status)
        {
            await Clients.All.SendAsync("OrderUpdated", orderId, status);
        }
    }
}