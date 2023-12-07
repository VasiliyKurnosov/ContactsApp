using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace ContactsApp.Data
{
    public class ContactsDbContext : DbContext
    {
        public DbSet<Contact> Contacts => Set<Contact>();

        public ContactsDbContext(DbContextOptions<ContactsDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder { DataSource = "Contacts.db" };
            var connectionString = connectionStringBuilder.ToString();
            optionsBuilder.UseSqlite(connectionString);
        }
    }
}
