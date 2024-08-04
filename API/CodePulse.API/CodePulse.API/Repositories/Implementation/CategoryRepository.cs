using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Linq.Expressions;

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
            if (category is null)
            {
                return null;
            }
            dbContext.Categories.Remove(category);
            await dbContext.SaveChangesAsync();
            return category;
        }


        async Task<IEnumerable<Category>> ICategoryRepository.GetAllAsync(string? query, string? sortBy, string? sortDirection, int? pageNumber, int? pageSize)
        {
            // Query the database  
            var categories = dbContext.Categories.AsQueryable();

            // Create a dictionary to map sortBy values to sorting functions
            var sortOptions = new Dictionary<string, Expression<Func<Category, object>>>(StringComparer.OrdinalIgnoreCase)
            {
                { "name", x => x.Name },
                { "url", x => x.UrlHandle }
            };


            // Filtering 

            if (!string.IsNullOrEmpty(query))
            {
                categories = categories.Where(x => x.Name.Contains(query));
            }

            // Sorting
            if (!string.IsNullOrEmpty(sortBy) && sortOptions.TryGetValue(sortBy, out var sortExpression))
            {
                var isAsc = string.Equals(sortDirection, "asc", StringComparison.OrdinalIgnoreCase);
                categories = isAsc ? categories.OrderBy(sortExpression) : categories.OrderByDescending(sortExpression);
            }

            // Pagination
            // Pagenumber 1, pageSize 5 -> skip 0, take 5
            // Pagenumber 2, pageSize 5 -> skip 6, take 5
            // Pagenumber 3, pageSize 5 -> skip 10, take 5

            var skipResults = (pageNumber - 1) * pageSize;
            categories = categories.Skip(skipResults ?? 0).Take(pageSize ?? 100);

            return await categories.ToListAsync();

        }

        async Task<Category?> ICategoryRepository.GetByIdAsync(Guid id)
        {
            return await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
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

        public async Task<int> getCount()
        {
            return await dbContext.Categories.CountAsync();
        }
    }
}
