import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Button from "../../components/Button"


import './redefinir.css'

// redefinição de senha

const Redefinir = () => {

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
                    <Button onClick={() => {alert("Instruções para redefinição de senha foram encaminhadas ao seu e-mail cadastrado no sistema.")}}>Enviar</Button>
                </form>

            </div>


        </main>

        <Footer/>
            
        </>
    )
}

export default Redefinir