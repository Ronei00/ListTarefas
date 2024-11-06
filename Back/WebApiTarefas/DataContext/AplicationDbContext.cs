using Microsoft.EntityFrameworkCore;
using WebApiTarefas.Models;

namespace WebApiTarefas.DataContext
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<TarefaModel> Tarefas { get; set; }
    }
}
