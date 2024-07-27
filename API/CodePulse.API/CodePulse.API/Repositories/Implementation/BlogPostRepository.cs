using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDbContext dbContext;
        public BlogPostRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<BlogPost> CreateAsync(BlogPost blogPost)
        {
            await dbContext.BlogPosts.AddAsync(blogPost);
            await dbContext.SaveChangesAsync();
            return blogPost;
        }

        async Task<IEnumerable<BlogPost>> IBlogPostRepository.GetAllAsync()
        {
            return await dbContext.BlogPosts.Include(x=> x.Categories).ToListAsync();
        }

        public async  Task<BlogPost?> GetByIdAsync(Guid id)
        {
           return await dbContext.BlogPosts.Include(x=> x.Categories).FirstOrDefaultAsync(x=> x.Id == id);
        }

        async Task<BlogPost?> IBlogPostRepository.UpdateAsync(BlogPost blogpost)
        {
             var existingBlogPost = await dbContext.BlogPosts.Include(x=> x.Categories)
                .FirstOrDefaultAsync(x=>x.Id == blogpost.Id);

            if (existingBlogPost == null) {

                return null;
             }

            // Update BlogPost
            dbContext.Entry(existingBlogPost).CurrentValues.SetValues(blogpost);

            // Update categories

            existingBlogPost.Categories = blogpost.Categories;

            await dbContext.SaveChangesAsync();

            return blogpost;
        }
    }
}
