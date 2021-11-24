
import {useParams} from 'react-router-dom'
import { useState } from 'react'

import Header from '../../components/Header'
import Button from '../../components/Button'

import './dashboard.css'

const Dashboard = () => {

    const [protocol, setProtocol] = useState(false)
    const [solicit, setSolicit] = useState(false)

    const params = useParams()

    const logado = !!params.id

    const Proto = () =>{
        setProtocol(true)
        setSolicit(false)
    }

    const Sol = () => {
        setProtocol(false)
        setSolicit(true)
    }

    return(
        <>
            <Header/>

            {
                logado ? (
                    <main className='dashboard'>

                        <p>Bem vindo {params.id} ao Franca Conectada</p>
                        <p>Selecione um dos serviços disponíveis abaixo e colabore com sua cidade</p>

                        <Button onClick={Sol}>Informar um problema</Button>
                        <Button onClick={Proto}>Verificar minhas solicitações</Button>

                        {
                            
                        }


                    </main>
                )

                : (
                    <main className='dashboard'>
                        <p>Estes são os nossos serviços</p>
                        <p>Por favor, faça login e aproveite</p>
                    </main>
                )
            }

        </>
    )
}

export default Dashboard