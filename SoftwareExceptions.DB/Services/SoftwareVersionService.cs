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
	public class SoftwareVersionService : ISoftwareVersionService
	{
		private readonly SoftExceptionsDbContext _softExceptionContext;
		private readonly IMapper _mapper;

		public SoftwareVersionService(SoftExceptionsDbContext softExceptionContext, IMapper mapper)
		{
			_softExceptionContext = softExceptionContext;
			_mapper = mapper;
		}

		public IQueryable<SoftwareVersionViewSelectDto> GetAll(
			string search,
			string sortBy,
			string sortOrder,
			int pageNr = 1,
			int pageSize = 0)
		{
			var softExceptionvViews = _softExceptionContext
				.SoftwareVersionViews
				//.Where(x => x.IsDeleted == false)
				.Where(x =>
					x.SoftwareVersion.Contains(search)
					|| x.SoftwareName.Contains(search)
					|| x.SoftwareVendor.Contains(search)
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
				.Select(x => _mapper.Map<SoftwareVersionViewSelectDto>(x));
		}


	}
}