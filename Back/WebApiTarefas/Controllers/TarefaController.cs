using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiTarefas.Models;
using WebApiTarefas.Service.TarefasService;

namespace WebApiTarefas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefaController : ControllerBase
    {
        private readonly ITarefasInterface _tarefasInterface;
        public TarefaController(ITarefasInterface tarefasInterface)
        {
            _tarefasInterface = tarefasInterface;
        }
        [HttpGet]
        public async Task<ActionResult<ServiceModel<List<TarefaModel>>>> GetTarefas()
        {
            return Ok(await _tarefasInterface.GetTarefas());
        }
        [HttpPost]
        public async Task<ActionResult<ServiceModel<List<TarefaModel>>>> CreateTarefa(TarefaModel novatarefa)
        {
            return Ok(await _tarefasInterface.CreateTarefa(novatarefa));
        }
        [HttpPut]
        public async Task<ActionResult<ServiceModel<List<TarefaModel>>>> UpdateTarefa(TarefaModel editadoTarefa)
        {
            ServiceModel<List<TarefaModel>> servicemodel = await _tarefasInterface.UpdateTarefa(editadoTarefa);
            return Ok(servicemodel);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceModel<List<TarefaModel>>>> DeleteTarefa(int id)
        {
            ServiceModel<List<TarefaModel>> servicemodel = await _tarefasInterface.DeleteTarefa(id);
            return Ok(servicemodel);
        }
    }
}
