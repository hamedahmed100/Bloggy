using CodePulse.API.Models.Domain;
using System.Globalization;

namespace CodePulse.API.Repositories.Interface
{
    public interface ICategoryRepository
    {
        public Task<Category> CreateAsync(Category category);
        public Task<IEnumerable<Category>> GetAllAsync(string? query,string? sortBy, string? sortDirection, int? pageNumber, int? pageSize);
        public Task<Category?> GetByIdAsync(Guid id);
        public Task<Category?> UpdateAsync(Category category);
        Task<Category?> DeleteAsync(Guid id);
        public Task<int> getCount();
    }
}
