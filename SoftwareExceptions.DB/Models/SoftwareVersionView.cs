using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SoftwareExceptions.DB.Models
{
	[Table("SoftwareVersionView", Schema = "dbo")]
	public class SoftwareVersionView
	{
		[Key]
		public int SoftwareVersionId { get; set; }

		public string SoftwareName { get; set; }

		public string SoftwareVersion { get; set; }

		public string SoftwareVendor { get; set; }

		public int SoftwareId { get; set; }

		public int SoftwareVendorId { get; set; }
	}
}
