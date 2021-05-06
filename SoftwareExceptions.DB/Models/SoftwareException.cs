using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SoftwareExceptions.DB.Models
{
	[Table("SoftwareException", Schema = "dbo")]
	public class SoftwareException
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Key]
		public int SoftwareExceptionId { get; set; }

		[Required]
		[Column("ExceptionName")]
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

		public bool IsDeleted { get; set; } = false;

		public string Log { get; set; }


		public string CreatedBy { get; set; }

		[DefaultValue("Getdate()")]
		public DateTime? CreatedOnDate { get; set; }

		public string ModifiedBy { get; set; }

		public DateTime? ModifiedOnDate { get; set; }

		#endregion  metadata fields
	}
}
