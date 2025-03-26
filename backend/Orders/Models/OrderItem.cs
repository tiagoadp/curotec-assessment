using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Orders.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        [Required]
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        [Precision(18,2)]
        public decimal Price { get; set; }
    }
}