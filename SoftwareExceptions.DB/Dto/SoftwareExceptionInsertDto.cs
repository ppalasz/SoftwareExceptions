using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace SoftwareExceptions.DB.Dto
{
	public class SoftwareExceptionInsertDto
	{
		public int SoftwareExceptionId { get; set; }

		[Required]
		public string ExceptionName { get; set; }


		public int CustomerId { get; set; }


		public DateTime? InitiationDate { get; set; }


		public DateTime? ExpirationDate { get; set; }


		public string Initiator { get; set; }


		public string ProductOwner { get; set; }


		public string WorkstationScope { get; set; }


		public int SoftwareVersionId { get; set; }


		public DateTime? ReleaseDate { get; set; }


		public decimal? CvssScore { get; set; }


		public string SeverityLevel { get; set; }


		public string Reason { get; set; }


		public string BusinessRiskAssessment { get; set; }


		public string Decision { get; set; }


		public DateTime? ExceptionDate { get; set; }


		#region  metadata fields


		public string CreatedBy { get; set; }

		[Required] public DateTime? CreatedOnDate { get; } = DateTime.Now;

		#endregion  metadata fields
	}

}
