using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SummaryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SummaryController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSummary()
        {
            var people = await _context.People.ToListAsync();
            var transactions = await _context.Transactions.ToListAsync();

            var result = people.Select(person =>
            {
                var personTransactions = transactions
                    .Where(t => t.PersonId == person.Id);

                var income = personTransactions
                    .Where(t => t.Type == "income")
                    .Sum(t => t.Amount);

                var expense = personTransactions
                    .Where(t => t.Type == "expense")
                    .Sum(t => t.Amount);

                return new
                {
                    person.Id,
                    person.Name,
                    Income = income,
                    Expense = expense,
                    Balance = income - expense
                };
            });

            var totalIncome = transactions
                .Where(t => t.Type == "income")
                .Sum(t => t.Amount);

            var totalExpense = transactions
                .Where(t => t.Type == "expense")
                .Sum(t => t.Amount);

            var totalBalance = totalIncome - totalExpense;

            return Ok(new
            {
                People = result,
                Totals = new
                {
                    Income = totalIncome,
                    Expense = totalExpense,
                    Balance = totalBalance
                }
            });
        }
    }
}