using WebApiTarefas.Models;

namespace WebApiTarefas.Service.TarefasService
{
    public interface ITarefasInterface
    {
        Task<ServiceModel<List<TarefaModel>>> GetTarefas();
        Task<ServiceModel<List<TarefaModel>>> CreateTarefa(TarefaModel novaTarefa);
        Task<ServiceModel<List<TarefaModel>>> UpdateTarefa(TarefaModel editadoTarefa);
        Task<ServiceModel<List<TarefaModel>>> DeleteTarefa(int id);
    }
}
