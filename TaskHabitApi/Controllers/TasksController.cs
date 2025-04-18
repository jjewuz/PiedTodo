using Microsoft.AspNetCore.Mvc;
using TaskHabitApi.Models;

namespace TaskHabitApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public IActionResult GetAll(string userId)
        {
            var tasks = _context.Tasks.Where(t => t.UserId == userId).ToList();
            var habits = _context.Habits.Where(h => h.UserId == userId).ToList();
            return Ok(new { tasks, habits });
        }

        [HttpPost("task")]
        public IActionResult AddTask([FromBody] TaskItem task)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();
            return Ok(task);
        }

        [HttpPost("habit")]
        public IActionResult AddHabit([FromBody] HabitItem habit)
        {
            _context.Habits.Add(habit);
            _context.SaveChanges();
            return Ok(habit);
        }

        [HttpDelete("task/{id}")]
        public IActionResult DeleteTask(int id)
        {
            var task = _context.Tasks.Find(id);
            if (task == null) return NotFound();
            _context.Tasks.Remove(task);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("habit/{id}")]
        public IActionResult DeleteHabit(int id)
        {
            var habit = _context.Habits.Find(id);
            if (habit == null) return NotFound();
            _context.Habits.Remove(habit);
            _context.SaveChanges();
            return NoContent();
        }
    }
}