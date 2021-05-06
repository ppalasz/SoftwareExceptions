using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.Logging;
using SoftwareExceptions.DB.Dto;
using SoftwareExceptions.DB.Models;
using SoftwareExceptions.DB.Services;

namespace SoftwareExceptions.Controllers
{
	[ApiController]

	[Produces("application/json")]
	[Route("api/[controller]")]
	public class SoftwareExceptionsController : ControllerBase
	{
		private readonly ILogger<SoftwareExceptionsController> _logger;
		private readonly ISoftwareExceptionService _softExceptionService;
		private readonly IIdentity _user;

		public SoftwareExceptionsController(ILogger<SoftwareExceptionsController> logger,
			ISoftwareExceptionService softExceptionService,
			IHttpContextAccessor httpContextAccessor
			)
		{
			_logger = logger;
			_softExceptionService = softExceptionService;
			_user = httpContextAccessor?.HttpContext?.User.Identity;
		}


		[HttpGet("Get")]
		public ActionResult<SoftwareException> GetSoftwareException(int id)
		{
			try
			{
				var softException = _softExceptionService.Get(id);

				if (softException == null)
				{
					return StatusCode(StatusCodes.Status500InternalServerError,
						new
						{
							success = false,
							message = $"Error: id:{id} not found"
						});
				}

				return Ok(new
				{
					data = softException,
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

		[HttpGet]
		public ActionResult<IQueryable<SoftwareExceptionView>> GetSoftwareExceptions(
			string search = null,
			 string sortBy = null,
			 string sortOrder = null,
			 int pageNr = 1,
			 int pageSize = 0)
		{

			try
			{

				var softExceptions = _softExceptionService
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

		[HttpPost]
		public IActionResult PostSoftwareException([FromBody] SoftwareExceptionInsertDto softExceptionInsert)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			softExceptionInsert.CreatedBy = _user.Name;
			try
			{
				var newId = _softExceptionService.Add(softExceptionInsert);

				return StatusCode(StatusCodes.Status201Created, new
				{
					success = true,
					newId = newId,
					message = $"new Software Exception has been inserted, id:{newId} "
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

		[HttpPut]
		public IActionResult PutSoftwareException(int id, [FromBody] SoftwareExceptionUpdateDto softwareExceptionUpdate)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			softwareExceptionUpdate.ModifiedBy = _user.Name;

			if (id != softwareExceptionUpdate.SoftwareExceptionId)
			{
				return StatusCode(StatusCodes.Status404NotFound, new
				{
					success = false,
					message = $"Wrong ID: {id}<>{softwareExceptionUpdate.SoftwareExceptionId}"
				});
			}

			try
			{
				_softExceptionService.Update(id, softwareExceptionUpdate);
			}
			catch (KeyNotFoundException)
			{
				return StatusCode(StatusCodes.Status404NotFound, new
				{
					success = false,
					message = $"Software Exception id:{id} not found"
				});
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, new
				{
					success = false,
					message = e.Message
				});
			}

			return Ok(new
			{
				success = true,
				message = "Software Exception has been updated"
			});
		}

		[HttpDelete]
		public IActionResult DeleteSoftwareException(int id)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			try
			{
				_softExceptionService.Delete(id, _user.Name);
			}
			catch (KeyNotFoundException)
			{
				return StatusCode(StatusCodes.Status404NotFound, new
				{
					success = false,
					message = $"Software Exception id:{id} not found"
				});
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, new
				{
					success = false,
					message = e.Message
				});
			}

			return StatusCode(StatusCodes.Status200OK, new
			{
				success = true,
				message = $"Software Exception id:{id} has been deleted"
			});
		}
	}
}