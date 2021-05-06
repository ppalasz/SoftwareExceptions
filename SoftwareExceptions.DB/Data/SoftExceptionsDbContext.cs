using Microsoft.EntityFrameworkCore;
using SoftwareExceptions.DB.Models;

namespace SoftwareExceptions.DB.Data
{
	public class SoftExceptionsDbContext : DbContext
	{
		public DbSet<SoftwareException> SoftwareExceptions { get; set; }

		public DbSet<SoftwareExceptionView> SoftwareExceptionViews { get; set; }

		public DbSet<SoftwareVersionView> SoftwareVersionViews { get; set; }

		public DbSet<Customer> Customers { get; set; }


		public SoftExceptionsDbContext(DbContextOptions<SoftExceptionsDbContext> options)
			: base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<SoftwareException>()
				.Property(s => s.CreatedOnDate)
				.HasDefaultValueSql("Getdate()");

			modelBuilder.Entity<SoftwareException>();
			modelBuilder.Entity<SoftwareExceptionView>();

			modelBuilder.Entity<SoftwareVersionView>();
			modelBuilder.Entity<Customer>();

			base.OnModelCreating(modelBuilder);
		}

	}
}
