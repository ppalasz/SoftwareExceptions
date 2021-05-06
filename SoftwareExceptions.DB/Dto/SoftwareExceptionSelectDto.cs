﻿
using System;
using System.ComponentModel.DataAnnotations;

namespace SoftwareExceptions.DB.Dto
{
	public class SoftwareExceptionSelectDto
	{

		[Required]
		[Key]
		public int SoftwareExceptionId { get; set; }


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

	}
}
