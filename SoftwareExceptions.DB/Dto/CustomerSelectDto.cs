
using System;
using System.ComponentModel.DataAnnotations;

namespace SoftwareExceptions.DB.Dto
{
	public class CustomerSelectDto
	{

		[Required]
		[Key]
		public int CustomerId { get; set; }


		public string CustomerName { get; set; }

	}
}
