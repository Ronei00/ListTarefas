import React, {useState, useEffect} from 'react';
import './Modal.css';

function Modal({isOpen, onClose, handleClicker, nomeverifica}){
    const [valor ,setvalor] = useState('');
    const [valor2 ,setvalor2] = useState('');
    const [valor3 ,setvalor3] = useState('');
    const [count, setcount] = useState(1);
    useEffect(() =>{
        setvalor("");
        setvalor2("");
        setvalor3("");
    },[isOpen]);
    
    const valorinserido = (event) =>{
        setvalor(event.target.value)
    }
    const valorinserido2 = (event) =>{
        setvalor2(event.target.value)
    }
    const valorinserido3 = (event) =>{
        setvalor3(event.target.value)
    }
    const iD = () =>{
        setcount(count + 1);
    }
    const VerificaNome = () => {
        const existe = nomeverifica.some(val => val.nometarefa === valor);
        return existe ? false : true;        
    }

    const handletask = () => {
        if(valor !== "" && valor2 !== "" && valor3 !== ""){
            if(valor2 > 0){
                if(VerificaNome()){
                    onClose();
                    iD();
                    handleClicker(valor, valor2, valor3, count, true);
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
                <input type='text' placeholder='Pagar Conta' onChange={valorinserido} autoFocus/><br></br>

                <label id="custo">Custo</label><br></br>
                <input type='text' placeholder='20' onChange={valorinserido2}/><br></br>

                <label id="datalimite">Data Limite</label><br></br>
                <input type='text' placeholder='2024-12-04' id="data" onChange={valorinserido3}/><br></br>

                <button onClick={handletask}>Incluir Tarefa</button>
            </div>
        </div>
    );
}

export default Modal;