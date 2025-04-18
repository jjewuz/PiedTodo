using Microsoft.EntityFrameworkCore;

namespace TaskHabitApi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<HabitItem> Habits { get; set; }
    }
}