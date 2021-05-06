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
	public class CustomerService : ICustomerService
	{
		private readonly SoftExceptionsDbContext _softExceptionContext;
		private readonly IMapper _mapper;

		public CustomerService(SoftExceptionsDbContext softExceptionContext, IMapper mapper)
		{
			_softExceptionContext = softExceptionContext;
			_mapper = mapper;
		}

		public IQueryable<CustomerSelectDto> GetAll(
			string search,
			string sortBy,
			string sortOrder,
			int pageNr = 1,
			int pageSize = 0)
		{
			var softExceptionvViews = _softExceptionContext
				.Customers
				//.Where(x => x.IsDeleted == false)
				.Where(x =>
					x.CustomerName.Contains(search)
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
				.Select(x => _mapper.Map<CustomerSelectDto>(x));
		}


	}
}