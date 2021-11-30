import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Button from "../../components/Button"


import './redefinir.css'
import { toast } from "react-toastify"
import { useHistory } from "react-router"

// redefinição de senha




const Redefinir = () => {

    const history = useHistory()

    const redef = () => {
        toast.success("Instruções para redefinição de senha foram encaminhadas ao seu e-mail cadastrado no sistema.")
        history.push('/')
    
    }

    return(
        <>
        <Header/>
        <main className="redefinir-main">
            <h1>Franca Conectada</h1>
            <div className="form-container">
                <p>Esqueceu sua senha?</p>
                <p>Redefina-a aqui: </p>
                <form className='redefinir-form'>
                    <input type="text" name="cpf" placeholder="Informe seu CPF" />
                    <Button onClick={redef}>Enviar</Button>
                </form>

            </div>


        </main>

        <Footer/>
            
        </>
    )
}

export default Redefinir