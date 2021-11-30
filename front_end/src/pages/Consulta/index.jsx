
import Header from "../../components/Header"
import ProtoTable from "../../components/ProtoTable"
import Footer from "../../components/Footer"

import api from "../../services/api"

import { useState, useEffect } from "react"
import {useHistory} from 'react-router-dom'

import './consulta.css'
import { toast } from "react-toastify"
import Button from "../../components/Button"

const Consulta = () => {

    const [protoList, setProtoList] = useState([])
    const history = useHistory()

    const {id} = JSON.parse(localStorage.getItem('@fraConect:usuario'))

    const edit = (data) => {
        history.push(`/dashboard/consulta/edit/${data}`)
    }

    useEffect(()=> {
        api.get('/solicitacoes').then(resp => {
            const protocolosUsuario = resp.data.filter( e => e.codusuario === id)
            setProtoList(protocolosUsuario)
        }).catch(err => {
            console.log('falhou', err)
        })
    },[protoList])

    console.log(protoList)
        
        
    const excluir = (data) => {
        console.log(data)

        api.delete(`/solicitacoes/${data}`).then(res => {
            toast.success('Solicitação excluída')
        }).catch(err => {
            toast.error('Ops. Não foi possível excluir. Tente novamente!')
        })
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
                            <p className='consultaRua'>Logradouro</p>
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

                    <Button onClick={() => history.push('/dashboard')}>Voltar</Button>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default Consulta