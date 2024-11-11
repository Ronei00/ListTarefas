import React, {useState} from "react";
import ModalEdit from "./ModalEdit.js";

function Valores({tarefa, custo, data, count, delete1, editando, edit, edittaskk, className}){
  const [aberto, setaberto] = useState(false);
  const openModal = () => setaberto(true);
  const closeModal = () => setaberto(false);
  const valorid = () =>{
    delete1(count);
  }
  const valoreditando = () => {
    editando(count)
    openModal();
  }
    return(
        <tr id="valores" className={className}>
          <td>
              <label>
                {count}
              </label>
            </td>
            <td>
              <label>
                {tarefa}
              </label>
            </td>
            <td>
              <label>
                R${custo}
              </label>
            </td>
            <td>
              <label>
                {data}
              </label>
            </td>
            <td>
              <button onClick={valoreditando}>Editar</button>
            </td>
            <td>
              <button onClick={valorid}>Excluir</button>
            </td>
            <ModalEdit isOpen={aberto} onClose={closeModal} editTaks={edittaskk} tarefa={edit ? edit.nometarefa : ''} custo={edit ? edit.custo : 0} datalimite={edit ? edit.datalimite : ''}/>
        </tr>
    );
}

export default Valores;