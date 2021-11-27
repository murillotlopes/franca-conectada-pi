
import Header from "../../components/Header"
import ProtoTable from "../../components/ProtoTable"

import { solicitacoes } from "../../components/data/tempTest"

import { useState } from "react"

import './consulta.css'

const Consulta = () => {

    const [protoList, setProtoList] = useState(solicitacoes)


    console.log(protoList)

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
                            <p className='consultaComentario'>Comentários</p>
                            <p className='consultaAcoes'>Ações</p>
                        </li>

                        { protoList.map( e => ( <ProtoTable e={e} key={e.id} /> )) }
                    </ul>
                </div>
            </main>

        </>
    )
}

export default Consulta