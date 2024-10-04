import React, { useState, useEffect } from "react"
import './TodoList.css';
import Icone from "./assets/icone3.png"
function TodoList(){
    const listaStorage = localStorage.getItem('Lista');


    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);

    const [novoItem, setNovoItem] = useState("");

    useEffect(()=>{localStorage.setItem('Lista',JSON.stringify(lista))},[lista])
    
    function adicionaItem(form){
        form.preventDefault();
        if(!novoItem){return}
        setLista([ {text: novoItem, isCompleted:false}, ...lista])
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function deleteTudo(form){
        form.preventDefault();
        setLista([])
    }

    function deletarItem(indx){
        const listaAux = [...lista];
        listaAux.splice(indx,1)
        setLista(listaAux)
    }

    function alterarConclusao(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux)
    }






    return(
        <div>
            <h1>Lista de tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input id="input-entrada" type="text" placeholder="Escreva uma tarefa" value={novoItem} onChange={(elemento)=>{setNovoItem(elemento.target.value)}} />
                <button type="submit" className="adicionar">Adicionar</button>
            </form>
            <div className="listaDeTarefas">
                <div style={{textAlign:"center"}}>
                    {
                        lista.length < 1 
                        ? 
                        <img className="icone-principal" src = {Icone}/>
                        :
                        lista.map((item, index) => (
                            <div key = {index} className={item.isCompleted ? "item concluido" : "item"}>
                                <span onClick={() => alterarConclusao(index)}>{item.text}</span>
                                <button className="del" onClick={() => deletarItem(index)}>Deletar</button>
                            </div>
                        ) )
                    }
                </div>
                {
                    lista.length > 0 && <button className="deleteAll" onClick={deleteTudo} >Deletar todas as tarefas</button>
                }
            </div>
        </div>

    )
}

export default TodoList