
using System;
using System.ComponentModel.DataAnnotations;

namespace SoftwareExceptions.DB.Dto
{
	public class SoftwareVersionViewSelectDto
	{

		[Required]
		[Key]
		public int SoftwareVersionId { get; set; }

		public string SoftwareName { get; set; }

		public string SoftwareVersion { get; set; }

		public string SoftwareVendor { get; set; }

		public int SoftwareId { get; set; }

		public int SoftwareVendorId { get; set; }

	}
}
