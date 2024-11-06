using System.ComponentModel.DataAnnotations;

namespace WebApiTarefas.Models
{
    public class TarefaModel
    {
        [Key]
        public int Id { get; set; }
        public string? Nometarefa { get; set; }
        public int Custo { get; set; }
        public DateTime Datalimite { get; set; }
    }
}
