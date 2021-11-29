
import Header from "../../components/Header"
import ProtoTable from "../../components/ProtoTable"

import { solicitacoes } from "../../components/data/tempTest"

import { useState } from "react"

import './consulta.css'

const Consulta = () => {

    const [protoList, setProtoList] = useState(solicitacoes)

    const edit = (data) => {
        console.log('edição')
    }
    
    const visualizar = (data) => {
        console.log('visualizar')
    }
    
    const excluir = (data) => {
        setProtoList(protoList.filter(e => e.id !== data))
    }

    return(
        <>
            <Header/>

            <main className='consultaMain'>
                <h2>Protocolos registrados</h2>

                <div>
                    <ul>
                        <li className='cabecalho'>
                            <p className='consultaId'>Protocolo</p>
                            <p className='consultaStatus'>Status</p>
                            <p className='consultaComentario'>Comentário</p>
                            <p className='consultaAcoes'>Ações</p>
                        </li>

                        { protoList.map( e => ( <ProtoTable e={e} key={e.id} edit={edit} visualizar={visualizar} excluir={excluir} /> )) }
                    </ul>
                </div>
            </main>

        </>
    )
}

export default Consulta