using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SoftwareExceptions.DB.Models;
using SoftwareExceptions.DB.Services;
using System;
using System.Linq;
using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Server.IISIntegration;
using SoftwareExceptions.DB.Helpers;

namespace SoftwareExceptions.Controllers
{
	[ApiController]

	[Produces("application/json")]
	[Route("api/[controller]")]
	public class UserController : ControllerBase
	{
		private readonly ILogger<CustomerController> _logger;
		private readonly IHttpContextAccessor _httpContextAccessor;

		public UserController(ILogger<CustomerController> logger,
			IHttpContextAccessor httpContextAccessor
		)
		{
			_logger = logger;
			_httpContextAccessor = httpContextAccessor;

		}

		[HttpGet]
		public ActionResult WhoAmI()
		{
			try
			{
				var UserName = Environment.UserName;
				var _user = _httpContextAccessor.HttpContext.User.Identity;

				return Ok(new
				{
					data = _user,
					UserName,
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