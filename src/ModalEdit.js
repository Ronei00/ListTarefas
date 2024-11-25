import React, {useEffect, useState } from 'react';
import './ModalEdit.css';

function ModalEdit({isOpen, onClose, tarefa, custo, datalimite, editTaks, Nomeverefi}){
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

    const VerificaNome = () => {
        const existe = Nomeverefi.some(val => val.nometarefa === NomeEditado);
        return existe ? false : true;        
    }

    const VerificaData = () => {
        const DataAtual = new Date();
        const DataInput = new Date(DataLimiteEditado);
        if(DataInput < DataAtual){
           return false;
        }else{
            return true;
        }
    }

    const handletask = () => {
        if(NomeEditado !== "" && CustoEditado !== "" && DataLimiteEditado !== ""){
            if(CustoEditado > 0){
                if(VerificaNome()){
                    if(VerificaData()){
                        onClose();
                        editTaks(NomeEditado, CustoEditado, DataLimiteEditado, true);
                    }else{
                        alert("Data inválida");
                    }
                }else{
                    alert("Não pode nome repitido");
                }
            }else{
                alert("O custo não pode ser 0 e nem negativo");
            }
        }else{
            alert("Todos campos tem que ser obrigatório");
        }
    }
    if (!isOpen) return null;
    return(
        <div id="modal-overlay">
            <div id="modal">
                <label id="ntarefa">Nome da Tarefa</label><br></br>
                <input type='text' placeholder='Pagar Conta' value={NomeEditado} onChange={onChange1} autoFocus/><br></br>

                <label id="custo">Custo</label><br></br>
                <input type='text' placeholder='20' value={CustoEditado} onChange={onChange2}/><br></br>

                <label id="datalimite">Data Limite</label><br></br>
                <input type='text' placeholder='2024-12-04' id="data" value={DataLimiteEditado} onChange={onChange3}/><br></br>

                <button onClick={handletask}>Editar</button>
            </div>
        </div>
    );
}

export default ModalEdit;