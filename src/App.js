import React, { useEffect, useState } from 'react';
import './App.css';
import Valores from './Valores.js';
import Modal from './Modal.js';
import axios from 'axios';

function App() {
  const [aberto, setaberto] = useState(false);
  const [aberto2, setaberto2] = useState(false);
  const [valoresget , valoresset] = useState([]);
  const [newTask, setNewTask] = useState(null);
  const [ValorId, SetvalorId] = useState(0);
  const [ValorId2, SetvalorId2] = useState(0);
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const openModal = () => setaberto(true);
  const closeModal = () => setaberto(false);
  const openModal2 = () => setaberto2(true);
  const closeModal2 = () => setaberto2(false);
  const [objectedit, setObjectedit] = useState({
    id: 0,
    nometarefa: '',
    custo: 0,
    datalimite: '',
  });
  const carregarTarefas = () => {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    valoresset(tarefasSalvas);
    console.log(tarefasSalvas);
  };
  const salvarTarefasNoLocalStorage = (tarefas) => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  };
  useEffect(() => {
    carregarTarefas();
  }, []);
  useEffect(() => {
  if (valoresget.length > 0) {
    salvarTarefasNoLocalStorage(valoresget);
  }
  }, [valoresget]); 

  const handleClick = (value, value2, value3, run = false) => {
    if(run){
       const newId = valoresget.length > 0 ? Math.max(...valoresget.map(tarefa => tarefa.id)) + 1 : 1;
      const va = {
        id: newId,
        nometarefa: value,
        custo: value2,
        datalimite: value3,
      }
      const newdata = {
        id: 0,
        nometarefa: value,
        custo: value2,
        datalimite: value3,
      };
      setNewTask(newdata);
      const updatedList = [...valoresget, va];
      valoresset(updatedList);
    }
  };

  useEffect(() => {
    if(newTask){      
      axios.post("https://webapitarefas.azurewebsites.net/api/tarefa", newTask)
    .then(Response => console.log(Response.data))
    .catch(error => console.log(error))
    }
    
  }, [newTask]);

  useEffect(() => {
    if(ValorId !== 0){
      axios.delete(`https://webapitarefas.azurewebsites.net/api/tarefa/${ValorId}`)
      .then(Response => console.log(Response.data))
      .catch(error => console.log(error))
    }
  }, [ValorId]);

  useEffect(() => {
    if(aberto2){
      axios.put(`https://webapitarefas.azurewebsites.net/api/tarefa`, objectedit)
      .then(Response => {
        console.log(Response.data)
        closeModal2();
      })
      .catch(error => console.log(error))
    }
  }, [aberto2, objectedit]);

  useEffect(() => {
    axios.get("https://webapitarefas.azurewebsites.net/api/tarefa")
    .then(Response => console.log(Response.data))
    .catch(error => console.log(error))
  }, []);

  const updateget = (id) =>{
    const confirmResposta = window.confirm("Você quer realmente deletar esse usuario?");
    if(confirmResposta){
      SetvalorId(id);
      const deletee = valoresget.filter(valor => valor.id !== id);
      valoresset(deletee);
      if (deletee.length === 0) {
        localStorage.removeItem('tarefas');
      } 
    }
  }

  const modaledit = (id) => {
    const tarefaSelecionada = valoresget.find(tarefa => tarefa.id === id);
    setTarefaEditando(tarefaSelecionada);
    SetvalorId2(id);
  }

  const editTask = (nome, custo, data, run= false) => {
    if(run){
      const updatedTasks = valoresget.map((task) => {
        if (task.id === ValorId2) {
          return { ...task, nometarefa: nome, custo: custo, datalimite: data };
        }
        return task;
      });
      valoresset(updatedTasks);
      setObjectedit({id: ValorId2, nometarefa: nome, custo: custo,datalimite: data,});
      openModal2();
    }
  };

  const moverParaCima = (index) => {
    if (index > 0) {
      const newTarefas = [...valoresget];
      [newTarefas[index], newTarefas[index - 1]] = [newTarefas[index - 1], newTarefas[index]];
      valoresset(newTarefas);
    }
  };
  const moverParaBaixo = (index) => {
    if (index < valoresget.length - 1) {
      const newTarefas = [...valoresget];
      [newTarefas[index], newTarefas[index + 1]] = [newTarefas[index + 1], newTarefas[index]];
      valoresset(newTarefas);
    }
  };

  console.log(valoresget);


  return (
    <div className="App">
      <header>
        <h1>Lista de Tarefas</h1>
      </header>
        <table>
          <tr id="titulos">
            <td>ID</td>
            <td>Nome Tarefa</td>
            <td>Custo</td>
            <td>Data Limite</td>
          </tr>
          {valoresget.map((valor, index) => (
            <Valores id={valor.id} count={valor.id} tarefa={valor.nometarefa} custo={valor.custo} data={valor.datalimite} delete1={updateget} editando={modaledit} edit={tarefaEditando} edittaskk={editTask} className={valor.custo >= 1000 ? "tarefa-amarela" : ""} movercima={moverParaCima} moverbaixo={moverParaBaixo} indexx={index} nomeverif={valoresget}/>
          ))}
        </table>
        <button onClick={openModal} id="openmodal">Incluir Tarefa</button>
        <Modal isOpen={aberto} onClose={closeModal} handleClicker={handleClick} nomeverifica={valoresget}/>
    </div>
  );
}

export default App;
