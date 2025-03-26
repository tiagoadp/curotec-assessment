using Microsoft.EntityFrameworkCore;
using Customers.Models;

namespace Customers.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        
        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>().HasData(
                new Customer { Id = 1, Name = "Tiago Diaz", Email = "tiagoadp@gmail.com", Password = "123456" },
                new Customer { Id = 2, Name = "Fake Customer", Email = "fake-user@gmail.com", Password = "654321" }
            );
        }
    }
}
