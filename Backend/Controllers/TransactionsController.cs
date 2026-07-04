using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            return await _context.Transactions.Include(t => t.Person).ToListAsync();
        }

        // POST: api/transactions
        [HttpPost]
        public async Task<ActionResult<Transaction>> CreateTransaction(Transaction transaction)
        {
            var person = await _context.People.FindAsync(transaction.PersonId);

            if (person == null)
                return BadRequest("Pessoa não encontrada.");

            // REGRA DO DESAFIO:
            // menor de 18 anos só pode ter despesa
            if (person.Age < 18 && transaction.Type.ToLower() == "income")
                return BadRequest("Menores de idade só podem cadastrar despesas.");

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }
    }
}