using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SoftwareExceptions.DB.Data;
using SoftwareExceptions.DB.Dto;
using SoftwareExceptions.DB.Helpers;
using SoftwareExceptions.DB.Models;

namespace SoftwareExceptions.DB.Services
{
	public class SoftwareExceptionService : ISoftwareExceptionService
	{
		private readonly SoftExceptionsDbContext _softExceptionContext;
		private readonly IMapper _mapper;

		public SoftwareExceptionService(SoftExceptionsDbContext softExceptionContext, IMapper mapper)
		{
			_softExceptionContext = softExceptionContext;
			_mapper = mapper;
		}

		public IQueryable<SoftwareExceptionViewSelectDto> GetAll(
			string search,
			string sortBy,
			string sortOrder,
			int pageNr = 1,
			int pageSize = 0)
		{
			var softExceptionvViews = _softExceptionContext
				.SoftwareExceptionViews
				.Where(x => x.IsDeleted == false)
				.Where(x =>
					x.ExceptionName.Contains(search)
					|| string.IsNullOrWhiteSpace(search));

			if (!string.IsNullOrWhiteSpace(sortBy))
			{
				if (sortOrder == "desc")
				{
					softExceptionvViews = softExceptionvViews
						.OrderByDescending(sortBy);
				}
				else
				{
					softExceptionvViews = softExceptionvViews
						.OrderBy(sortBy);
				}
			}

			if (pageNr > 1)
			{
				softExceptionvViews = softExceptionvViews
					.Skip(pageSize * (pageNr - 1))
					.Take(pageSize);
			}

			if (pageSize > 0)
			{
				softExceptionvViews = softExceptionvViews
					.Take(pageSize);
			}

			var results = softExceptionvViews.ToList().AsQueryable();

			return results
				.Select(x => _mapper.Map<SoftwareExceptionViewSelectDto>(x));
		}

		private SoftwareException Find(int id)
		{
			var softException = _softExceptionContext
				.SoftwareExceptions
				.Where(x => x.IsDeleted == false)
				.SingleOrDefault(x => x.SoftwareExceptionId == id);

			return softException;
		}


		public SoftwareExceptionDetailsDto Get(int id)
		{
			var softException = Find(id);

			return _mapper.Map<SoftwareExceptionDetailsDto>(softException);
		}

		public int Add(SoftwareExceptionInsertDto softException)
		{
			var newProduct = _mapper.Map<SoftwareException>(softException);

			var softExceptionAdded = _softExceptionContext
				.SoftwareExceptions
				.Add(newProduct);

			_softExceptionContext.SaveChanges();

			return softExceptionAdded.Entity.SoftwareExceptionId;
		}

		public void Update(int id, SoftwareExceptionUpdateDto softException)
		{
			var softExceptionFound = Find(id);

			if (softExceptionFound == null || softException.SoftwareExceptionId != id)
				throw new KeyNotFoundException();


			_mapper.Map(softException, softExceptionFound);

			_softExceptionContext.SoftwareExceptions.Update(softExceptionFound);

			_softExceptionContext.SaveChanges();
		}

		public void Delete(int id, string userName)
		{
			var softExceptionFound = Find(id);

			if (softExceptionFound == null)
				throw new KeyNotFoundException();

			softExceptionFound.Log += $"deleted by {userName}\n";
			softExceptionFound.IsDeleted = true; //soft delete

			_softExceptionContext.SoftwareExceptions.Update(softExceptionFound);

			_softExceptionContext.SaveChanges();
		}
	}
}