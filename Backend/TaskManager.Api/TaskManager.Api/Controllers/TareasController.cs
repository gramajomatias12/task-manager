using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.DTOs;
using TaskManager.Api.Models;

namespace TaskManager.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TareasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TareasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/tareas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TareaDto>>> GetTareas()
        {
            var tareas = await _context.Tareas
                .Select(t => new TareaDto
                {
                    Id = t.Id,
                    Titulo = t.Titulo,
                    Descripcion = t.Descripcion,
                    Estado = t.Estado,
                    FechaCreacion = t.FechaCreacion
                })
                .ToListAsync();

            return Ok(tareas);
        }


        // GET: api/tareas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tarea>> GetTarea(int id)
        {
            var tarea = await _context.Tareas.FindAsync(id);

            if (tarea == null)
                return NotFound();

            return tarea;
        }

        // POST: api/tareas
        [HttpPost]
        public async Task<ActionResult<TareaDto>> CreateTarea(TareaCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tarea = new Tarea
            {
                Titulo = dto.Titulo,
                Descripcion = dto.Descripcion,
                Estado = dto.Estado
            };

            _context.Tareas.Add(tarea);
            await _context.SaveChangesAsync();

            var result = new TareaDto
            {
                Id = tarea.Id,
                Titulo = tarea.Titulo,
                Descripcion = tarea.Descripcion,
                Estado = tarea.Estado,
                FechaCreacion = tarea.FechaCreacion
            };

            return CreatedAtAction(nameof(GetTarea), new { id = tarea.Id }, result);
        }


        // PUT: api/tareas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTarea(int id, Tarea tarea)
        {
            if (id != tarea.Id)
                return BadRequest();

            _context.Entry(tarea).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tareas.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/tareas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarea(int id)
        {
            var tarea = await _context.Tareas.FindAsync(id);

            if (tarea == null)
                return NotFound();

            _context.Tareas.Remove(tarea);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
