using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface IBlogPostRepository
    {
        public Task<BlogPost> CreateAsync(BlogPost blogpost);
        public Task<IEnumerable<BlogPost>> GetAllAsync();
        public Task<BlogPost?> GetByIdAsync(Guid id);
        public Task<BlogPost?> UpdateAsync(BlogPost blogpost);
        public Task<BlogPost?> DeleteAsync(Guid id);
        public Task<BlogPost?> GetByUrlHandleAsync(string urlHandle);
    }
}
