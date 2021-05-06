
using System;
using System.ComponentModel.DataAnnotations;

namespace SoftwareExceptions.DB.Dto
{
	public class SoftwareExceptionViewSelectDto
	{

		[Required]
		[Key]
		public int SoftwareExceptionId { get; set; }


		public string ExceptionName { get; set; }


		public string CustomerName { get; set; }


		public DateTime? InitiationDate { get; set; }


		public DateTime? ExpirationDate { get; set; }


		public string Initiator { get; set; }


		public string ProductOwner { get; set; }


		public string WorkstationScope { get; set; }


		public string SoftwareName { get; set; }


		public string SoftwareVendor { get; set; }


		public string SoftwareVersion { get; set; }


		public DateTime? ReleaseDate { get; set; }


		public decimal? CvssScore { get; set; }


		public string SeverityLevel { get; set; }


		public string Reason { get; set; }


		public string BusinessRiskAssessment { get; set; }


		public string Decision { get; set; }


		public DateTime? ExceptionDate { get; set; }

	}
}
