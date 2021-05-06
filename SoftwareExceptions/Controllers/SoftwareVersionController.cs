using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SoftwareExceptions.DB.Helpers;
using SoftwareExceptions.DB.Models;
using SoftwareExceptions.DB.Services;

namespace SoftwareExceptions.Controllers
{
	[ApiController]
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class SoftwareVersionController : ControllerBase
	{
		private readonly ILogger<SoftwareVersionController> _logger;
		private readonly ISoftwareVersionService _softVersionService;

		public SoftwareVersionController(ILogger<SoftwareVersionController> logger,
			ISoftwareVersionService softVersionService
			)
		{
			_logger = logger;
			_softVersionService = softVersionService;
		}

		[HttpGet("Dropdown"), ActionName("Dropdown")]
		public ActionResult GetSoftwareVersionForDropdown()
		{
			var customers = _softVersionService
				.GetAll(null, null, null, 1, 0)
				.Select(x => new
				{
					value = x.SoftwareVersionId,
					label = $"{x.SoftwareName.Replace("_", " ").ToFirstUpper()} " +
							$"{x.SoftwareVersion} ({x.SoftwareVendor.ToFirstUpper()})"
				})
				.OrderBy(x => x.label); ;

			return Ok(new
			{
				data = customers,
				success = true,
				message = "OK"
			});
		}

		[HttpGet]
		public ActionResult<IQueryable<SoftwareVersionView>> GetSoftwareVersion(
			string search = null,
			 string sortBy = null,
			 string sortOrder = null,
			 int pageNr = 1,
			 int pageSize = 0)
		{
			try
			{
				var softExceptions = _softVersionService
					.GetAll(search, sortBy, sortOrder, pageNr, pageSize);

				return Ok(new
				{
					data = softExceptions,
					success = true,
					message = "OK"
				});
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					new
					{
						success = false,
						message = $"Error: {e.Message} {e.InnerException?.Message}"
					});
			}
		}
	}
}