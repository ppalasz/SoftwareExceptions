using System.Linq;
using System.Threading.Tasks;
using SoftwareExceptions.DB.Dto;

namespace SoftwareExceptions.DB.Services
{
	public interface ISoftwareExceptionService
	{
		public IQueryable<SoftwareExceptionViewSelectDto> GetAll(string search, string sortBy, string sortOrder, int pageNr = 1, int pageSize = 50);

		public SoftwareExceptionDetailsDto Get(int id);

		public int Add(SoftwareExceptionInsertDto product);

		public void Update(int id, SoftwareExceptionUpdateDto product);

		public void Delete(int id, string userName);
	}
}