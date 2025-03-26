using Microsoft.EntityFrameworkCore;
using Products.Models;

namespace Products.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Product n° 1", Price = 9.99m, Stock = 12 },
                new Product { Id = 2, Name = "Product n° 2", Price = 19.99m, Stock = 35 }
            );
        }
    }
}