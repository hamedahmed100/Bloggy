using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Data
{
    public class AuthDbContext : IdentityDbContext

    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
            
        }


        // Setting roles
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "925fadb6-9aff-430d-aaea-4d132650730d";
            var WriterRoleId = "78f74c2e-29e4-4119-a84d-3b91f19d6f43";

            // Create reader and writer role
            var roles = new List<IdentityRole> {

                new IdentityRole()
                {
                    Id = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper(),
                    ConcurrencyStamp = readerRoleId
                },
                 new IdentityRole()
                {
                    Id = WriterRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper(),
                    ConcurrencyStamp = WriterRoleId
                }
            };

            // Seed the roles
            builder.Entity<IdentityRole>().HasData(roles);
            var adminUserId = "19fa593e-a281-44f0-9c10-2ef95b5673a9";
            // Create an admin user
            var admin = new IdentityUser()
            {
                Id = adminUserId,
                UserName = "admin@cp.com",
                Email = "admin@cp.com",
                NormalizedEmail = "admin@cp.com".ToUpper(),
                NormalizedUserName = "admin@cp.com".ToUpper()
            };
            admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Admin@123");

            builder.Entity<IdentityUser>().HasData(admin);

            // Give roles to admin
            var adminRoles = new List<IdentityUserRole<string>>()
            {
                new()
                {
                    UserId = adminUserId,
                    RoleId = readerRoleId
                },
                new()
                {
                    UserId = adminUserId,
                    RoleId = WriterRoleId
                }
            };

            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
        }

    }
}
