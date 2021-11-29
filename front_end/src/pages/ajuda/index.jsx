import Header from '../../components/Header'
import Button from '../../components/Button'
import './ajuda.css'

const ajuda = () => {
    return (
        <>
            <Header />

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
        </>
    )
}

export default ajuda 