using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        // Construtor responsável por receber as configurações do banco
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Representa a tabela de Pessoas
        public DbSet<Person> People { get; set; }

        // Representa a tabela de Transações
        public DbSet<Transaction> Transactions { get; set; }
    }
}