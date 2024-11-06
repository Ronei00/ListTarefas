import React, {useState} from 'react';
import './Modal.css';

function Modal({isOpen, onClose, handleClicker}){
    const [valor ,setvalor] = useState('');
    const [valor2 ,setvalor2] = useState('');
    const [valor3 ,setvalor3] = useState('');
    const [count, setcount] = useState(1);
    
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

    const handletask = () => {
        onClose();
        iD();
        handleClicker(valor, valor2, valor3, count, true);
        
    }


    if (!isOpen) return null;
    return(
        <div id="modal-overlay">
            <div id="modal">
                <label id="ntarefa">Nome da Tarefa</label><br></br>
                <input type='text' placeholder='Pagar Conta' onChange={valorinserido}/><br></br>

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