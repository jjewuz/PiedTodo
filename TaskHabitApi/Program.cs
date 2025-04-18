using Microsoft.EntityFrameworkCore;
using TaskHabitApi.Controllers;
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

var tgBot = new BotContoller();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = "server=localhost;database=library;user=user;password=password";
    options.UseMySQL(connectionString);
});

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();
app.Run();

