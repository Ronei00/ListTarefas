import React, {useEffect, useState } from 'react';
import './ModalEdit.css';

function ModalEdit({isOpen, onClose, tarefa, custo, datalimite, editTaks}){
    const [NomeEditado, setNomeEditado] = useState(tarefa);
    const [CustoEditado, setCustoEditado] = useState(custo);
    const [DataLimiteEditado, setDataLimiteEditado] = useState(datalimite);
    useEffect(() =>{
        setNomeEditado(tarefa);
        setCustoEditado(custo);
        setDataLimiteEditado(datalimite);
    },[isOpen, tarefa, custo, datalimite]);
    const onChange1 = (e) => {
        setNomeEditado(e.target.value);
    }
    const onChange2 = (e) => {
        setCustoEditado(e.target.value);
    }
    const onChange3 = (e) => {
        setDataLimiteEditado(e.target.value);
    }
    const handletask = () => {
        onClose();
        editTaks(NomeEditado, CustoEditado, DataLimiteEditado, true);
    }
    if (!isOpen) return null;
    return(
        <div id="modal-overlay">
            <div id="modal">
                <label id="ntarefa">Nome da Tarefa</label><br></br>
                <input type='text' placeholder='Pagar Conta' value={NomeEditado} onChange={onChange1}/><br></br>

                <label id="custo">Custo</label><br></br>
                <input type='text' placeholder='20,00' value={CustoEditado} onChange={onChange2}/><br></br>

                <label id="datalimite">Data Limite</label><br></br>
                <input type='text' placeholder='2024-12-04' id="data" value={DataLimiteEditado} onChange={onChange3}/><br></br>

                <button onClick={handletask}>Editar</button>
            </div>
        </div>
    );
}

export default ModalEdit;