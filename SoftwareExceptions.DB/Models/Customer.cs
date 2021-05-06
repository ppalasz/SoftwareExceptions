using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SoftwareExceptions.DB.Models
{
	[Table("Customer", Schema = "dbo")]
	public class Customer
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Key]
		public int CustomerId { get; set; }

		[Required]
		public string CustomerName { get; set; }

	}
}
