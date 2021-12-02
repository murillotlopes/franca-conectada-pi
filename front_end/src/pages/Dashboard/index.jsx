
import {useHistory} from 'react-router-dom'

import Header from '../../components/Header'
import Button from '../../components/Button'
import Footer from '../../components/Footer'

import './dashboard.css'

const Dashboard = () => {

    const history = useHistory()

    const {id} = JSON.parse(localStorage.getItem('@fraConect:usuario')) || {}

    if(!!id === false){
        history.push('/login')
    }

    return(
        <>
            <Header/>

            <main className='dashboard'>

                <p id='titulo' >Bem vindo ao Franca Conectada</p>
                <p>Selecione um dos serviços disponíveis abaixo e colabore com sua cidade</p>
                <br/>

                <Button onClick={() => history.push('/dashboard/solicitar')}>Informar um problema</Button>
                <Button onClick={() => history.push('/dashboard/consulta')}>Verificar minhas solicitações</Button>

            </main>

            <Footer/> 
        </>
    )
}

export default Dashboard