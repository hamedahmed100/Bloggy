using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CodePulse.API.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext dbContext;

        public CategoryRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await dbContext.Categories.AddAsync(category);
            await dbContext.SaveChangesAsync();

            return category;
        }

        async Task<Category?> ICategoryRepository.DeleteAsync(Guid id)
        {
            var category = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if(category is null)
            {
                return null;
            }
            dbContext.Categories.Remove(category);
            await dbContext.SaveChangesAsync();
            return category;
        }

        async Task<IEnumerable<Category>> ICategoryRepository.GetAllAsync()
        {
            return await dbContext.Categories.ToListAsync();
            
        }

         async Task<Category?> ICategoryRepository.GetByIdAsync(Guid id)
        {
            return await dbContext.Categories.FirstOrDefaultAsync(x=> x.Id == id);
        }

         async Task<Category?> ICategoryRepository.UpdateAsync(Category category)
        {
            var existingCategory = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == category.Id);

            if (existingCategory != null)
            {
                dbContext.Entry(existingCategory).CurrentValues.SetValues(category);
                await dbContext.SaveChangesAsync();
                return category;
            }

           
            return null;
        }
    }
}
 