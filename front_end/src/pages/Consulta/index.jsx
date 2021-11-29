
import Header from "../../components/Header"
import ProtoTable from "../../components/ProtoTable"
import Footer from "../../components/Footer"

import { solicitacoes } from "../../data/tempTest"

import { useState } from "react"
import {useHistory} from 'react-router-dom'

import './consulta.css'

const Consulta = () => {

    const [protoList, setProtoList] = useState(solicitacoes)
    const history = useHistory()

    const edit = (data) => {
        history.push(`/dashboard/consulta/edit/${data}`)
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

                        { protoList.map( e => ( 
                        
                            <ProtoTable 
                                e={e} 
                                key={e.id} 
                                edit={edit}  
                                excluir={excluir} 
                            />

                        )) }
                    </ul>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default Consulta