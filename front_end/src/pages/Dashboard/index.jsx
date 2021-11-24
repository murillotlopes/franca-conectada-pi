
import {useParams, useHistory} from 'react-router-dom'

import Header from '../../components/Header'
import Button from '../../components/Button'

import './dashboard.css'

const Dashboard = () => {

    const params = useParams()
    const history = useHistory()

    const logado = !!params.id




    return(
        <>
            <Header/>

                <main className='dashboard'>

                    <p>Bem vindo {params.id} ao Franca Conectada</p>
                    <p>Selecione um dos serviços disponíveis abaixo e colabore com sua cidade</p>

                    <Button onClick={() => history.push('/dashboard/solicitar')}>Informar um problema</Button>
                    <Button onClick={() => history.push('/dashboard/protocolo')}>Verificar minhas solicitações</Button>

                </main>


        </>
    )
}

export default Dashboard