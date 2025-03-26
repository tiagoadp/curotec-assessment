using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Products.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Precision(18,2)]
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }
}