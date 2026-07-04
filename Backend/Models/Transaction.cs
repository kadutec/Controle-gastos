namespace Backend.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        public string Description { get; set; } = string.Empty;

        public decimal Amount { get; set; }

        public string Type { get; set; } = string.Empty;

        public int PersonId { get; set; }

        // Relacionamento com a Pessoa
        public Person? Person { get; set; }
    }
}