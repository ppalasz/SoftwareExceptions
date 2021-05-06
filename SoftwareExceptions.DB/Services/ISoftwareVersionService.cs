using System.Linq;
using System.Threading.Tasks;
using SoftwareExceptions.DB.Dto;

namespace SoftwareExceptions.DB.Services
{
	public interface ISoftwareVersionService
	{
		public IQueryable<SoftwareVersionViewSelectDto> GetAll(string search, string sortBy, string sortOrder, int pageNr = 1, int pageSize = 50);
	}
}