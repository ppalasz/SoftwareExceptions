using AutoMapper;
using SoftwareExceptions.DB.Dto;
using SoftwareExceptions.DB.Models;

namespace SoftwareExceptions.Startup
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<SoftwareException, SoftwareExceptionSelectDto>();

			CreateMap<SoftwareException, SoftwareExceptionDetailsDto>();

			CreateMap<SoftwareExceptionInsertDto, SoftwareException>();

			CreateMap<SoftwareExceptionUpdateDto, SoftwareException>();

			CreateMap<SoftwareExceptionView, SoftwareExceptionViewSelectDto>();

			CreateMap<SoftwareVersionView, SoftwareVersionViewSelectDto>();

			CreateMap<Customer, CustomerSelectDto>();
		}
	}
}