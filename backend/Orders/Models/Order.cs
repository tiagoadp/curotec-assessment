using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Orders.Models
{
    public class Order
    {
        public int Id { get; set; }
        
        [Required]
        public int CustomerId { get; set; }
        
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Pending";
        
        public List<OrderItem> OrderItems { get; set; } = new();
    }
}