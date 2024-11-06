using Microsoft.EntityFrameworkCore;
using WebApiTarefas.DataContext;
using WebApiTarefas.Models;

namespace WebApiTarefas.Service.TarefasService
{
    public class TarefasService : ITarefasInterface
    {
        private readonly AplicationDbContext _context;
        public TarefasService(AplicationDbContext context)
        {
            _context = context;
        }
        public async Task<ServiceModel<List<TarefaModel>>> CreateTarefa(TarefaModel novaTarefa)
        {
            ServiceModel<List<TarefaModel>> servicemodel = new ServiceModel<List<TarefaModel>>();

            try
            {
                if(novaTarefa == null)
                {
                    servicemodel.Dados = null;
                    servicemodel.Mensagem = "Informar Dados";
                    servicemodel.Sucesso = false;
                    return servicemodel;
                }
                _context.Add(novaTarefa);
                await _context.SaveChangesAsync();

                servicemodel.Dados = _context.Tarefas.ToList();
            }
            catch (Exception ex)
            {
                servicemodel.Mensagem = ex.Message;
                servicemodel.Sucesso = false;
            }
            return servicemodel;
        }

        public async Task<ServiceModel<List<TarefaModel>>> DeleteTarefa(int id)
        {
            ServiceModel<List<TarefaModel>> servicemodel = new ServiceModel<List<TarefaModel>>();

            try
            {
                TarefaModel tarefa = _context.Tarefas.FirstOrDefault(x => x.Id == id);
                if (tarefa == null)
                {
                    servicemodel.Dados = null;
                    servicemodel.Mensagem = "Usuario não encontrado";
                    servicemodel.Sucesso = false;
                    return servicemodel;
                }

                _context.Tarefas.Remove(tarefa);
                await _context.SaveChangesAsync();

                servicemodel.Dados = _context.Tarefas.ToList();
            }
            catch (Exception ex)
            {
                servicemodel.Mensagem = ex.Message;
                servicemodel.Sucesso = false;
            }
            return servicemodel;
        }

        public async Task<ServiceModel<List<TarefaModel>>> GetTarefas()
        {
            ServiceModel<List<TarefaModel>> servicemodel = new ServiceModel<List<TarefaModel>>();

            try
            {
                servicemodel.Dados = _context.Tarefas.ToList();
                if(servicemodel.Dados.Count == 0)
                {
                    servicemodel.Mensagem = "Nenhum dado encontrado";
                }

            }catch(Exception ex)
            {
                servicemodel.Mensagem = ex.Message;
                servicemodel.Sucesso = false;
            }

            return servicemodel;
        }

        public async Task<ServiceModel<List<TarefaModel>>> UpdateTarefa(TarefaModel editadoTarefa)
        {
            ServiceModel<List<TarefaModel>> servicemodel = new ServiceModel<List<TarefaModel>>();
            try
            {
                TarefaModel tarefa = _context.Tarefas.AsNoTracking().FirstOrDefault(x => x.Id == editadoTarefa.Id);
                if (tarefa == null)
                {
                    servicemodel.Dados = null;
                    servicemodel.Mensagem = "Usuario não localizado";
                    servicemodel.Sucesso = false;
                    return servicemodel;
                }
                _context.Tarefas.Update(editadoTarefa);
                await _context.SaveChangesAsync();

                servicemodel.Dados = _context.Tarefas.ToList();
            }
            catch (Exception ex)
            {
                servicemodel.Mensagem = ex.Message;
                servicemodel.Sucesso = false;
            }
            return servicemodel;
        }
    }
}
