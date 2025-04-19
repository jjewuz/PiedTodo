using Microsoft.EntityFrameworkCore;
using TaskHabitApi.Models;

var filePath = Path.GetFullPath("../.env");

if (File.Exists(filePath))
{
    foreach (var line in File.ReadAllLines(filePath))
    {
        var parts = line.Split(
            '=',
            StringSplitOptions.RemoveEmptyEntries);

        if (parts.Length != 2)
            continue;

        Environment.SetEnvironmentVariable(parts[0], parts[1]);
    }
}

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = $"server=localhost;database={Environment.GetEnvironmentVariable("REACT_APP_DATABASE_NAME")};" +
        $"user={Environment.GetEnvironmentVariable("REACT_APP_DATABASE_USER")};password={Environment.GetEnvironmentVariable("REACT_APP_DATABASE_PASSWORD")}";
    options.UseMySQL(connectionString);
});

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();

