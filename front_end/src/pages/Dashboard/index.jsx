
import {useParams} from 'react-router-dom'

import Header from "../../components/Header"

import './dashboard.css'

const Dashboard = () => {

    const params = useParams()

    const logado = !!params.id

    return(
        <>
            <Header/>

            {
                logado ? (
                    <main className='dashboard'>
                        <p>Estou logado</p>
                        <p>Sou {params.id}</p>
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