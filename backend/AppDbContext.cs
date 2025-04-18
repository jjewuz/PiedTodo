using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<TaskData> Tasks { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("YourConnectionStringHere");
    }
}

public class TaskData
{
    public DateTime id {get; set;}
    public required string title {get; set;}
    public DateTime date {get; set;}
    public bool done {get; set;}
}