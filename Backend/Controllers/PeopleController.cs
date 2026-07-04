using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : ControllerBase
    {
        private readonly AppDbContext _context;

        // O ASP.NET injeta automaticamente o AppDbContext
        public PeopleController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPeople()
        {
            return await _context.People.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Person>> CreatePerson(Person person)
        {
            // Validação simples
            if (string.IsNullOrWhiteSpace(person.Name))
            {
                return BadRequest("O nome é obrigatório.");
            }

            if (person.Age < 0)
            {
                return BadRequest("A idade não pode ser negativa.");
            }

            _context.People.Add(person);
            await _context.SaveChangesAsync();

            // Retorna 201 Created com a URL do novo recurso
            return CreatedAtAction(nameof(GetPeople), new { id = person.Id }, person);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            // Procura a pessoa pelo ID
            var person = await _context.People.FindAsync(id);

            if (person == null)
            {
                return NotFound("Pessoa não encontrada.");
            }

            // Remove a pessoa
            _context.People.Remove(person);

            // Salva as alterações
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}