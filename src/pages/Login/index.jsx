
import Header from '../../components/Header'
import Button from '../../components/Button'

const Login = () => {
    return(
        <>
            <Header/>

            <h1>Franca Conectada</h1>

            <div>
                <form>
                    <input placeholder='seu e-mail'/>
                    <input placeholder='senha' type='password'/>

                    <Button>Entrar</Button>
                </form>
            </div>
        </>
    )
}

export default Login