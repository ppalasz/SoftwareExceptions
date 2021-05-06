using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SoftwareExceptions.DB.Models;
using SoftwareExceptions.DB.Services;
using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Server.IISIntegration;
using SoftwareExceptions.DB.Helpers;

namespace SoftwareExceptions.Controllers
{
	[ApiController]
	
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class CustomerController : ControllerBase
	{
		private readonly ILogger<CustomerController> _logger;
		private readonly ICustomerService _customerService;

		public CustomerController(ILogger<CustomerController> logger,
			ICustomerService customerService
			)
		{
			_logger = logger;
			_customerService = customerService;
		}

		[HttpGet("Dropdown"), ActionName("Dropdown")]
		public ActionResult GetCustomersForDropdown()
		{
			var customers = _customerService
				.GetAll(null, null, null, 1, 0)
				.Select(x => new { value = x.CustomerId, label = x.CustomerName.ToFirstUpper() })
				.OrderBy(x => x.label);

			return Ok(new
			{
				data = customers,
				success = true,
				message = "OK"
			});
		}

		[HttpGet]
		public ActionResult<IQueryable<Customer>> GetCustomers(
			string search = null,
			 string sortBy = null,
			 string sortOrder = null,
			 int pageNr = 1,
			 int pageSize = 0)
		{
			try
			{
				var customers = _customerService
					.GetAll(search, sortBy, sortOrder, pageNr, pageSize);

				return Ok(new
				{
					data = customers,
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