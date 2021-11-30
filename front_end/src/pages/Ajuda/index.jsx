import Header from '../../components/Header'
import Button from '../../components/Button'
import Footer from '../../components/Footer'
import './ajuda.css'

const Ajuda = () => {
    return (
        <>
            <Header />
            <main className="ajuda-main">
                <h1>Franca Conectada</h1>
                <div className="form-container">
                    <form className="ajuda-form">
                        <h3>Está com algum problema no site ?
                            Informe a nossa equipe por aqui!</h3>
                        <div>
                            <input type="text" name="ajuda" placeholder="Informe seu problema" />
                            <Button>Enviar</Button>
                        </div>
                    </form>
                </div >
            </main>

            <Footer/>
        </>
    )
}

export default Ajuda 