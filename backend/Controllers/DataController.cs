using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class DataController : ControllerBase
{
    private readonly AppDbContext _context;

    public DataController(AppDbContext context)
    {
        _context = context;
    }

    // Метод для записи данных
    [HttpPost]
    public IActionResult Post([FromBody] TaskData data)
    {
        if (data == null)
        {
            Console.WriteLine("Received null data");
            return BadRequest("Invalid data");
        }

        Console.WriteLine($"Received data: {JsonSerializer.Serialize(data)}");

        try
        {
            _context.Tasks.Add(data);
            _context.SaveChanges();
            return Ok("Data saved successfully");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }
}