
import {Link, useHistory} from 'react-router-dom'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

import Header from '../../components/Header'
import Button from '../../components/Button'
import Footer from '../../components/Footer'

import './login.css'

const Login = () => {

    const history = useHistory()

    const formSchema = yup.object().shape({
        email: yup.string().required('* Campo obrigatório').email('E-mail inválido'),
        password: yup.string().required('* Campo obrigatório')
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    const loginSubmit = (data) =>{
        // logica de validação do usuário
        history.push(`/dashboard`)
    }


    return(
        <>
            <Header/>

            <main className='login-main'>
                <h1>Franca Conectada</h1>

                <div className='login-container'>
                    <p>Faça seu login</p>
                    <form className='login-form' onSubmit={handleSubmit(loginSubmit)}>
                        <input 
                            placeholder='seu e-mail' 
                            type='email' 
                            autoFocus
                            {...register('email')}
                        />
                        <span>{errors.email?.message}</span>
                        <input 
                            placeholder='senha' 
                            type='password'
                            {...register('password')}    
                        />
                        <span>{errors.password?.message}</span>

                        <Button>Entrar</Button>
                        <Link to='/redefinir'><p className='redefinir'>Esqueci a senha</p></Link>
                    </form>
                    <hr/>
                    <p>Não tem cadastro?</p>
                    <Link to='/cadastrar'><Button>Cadastrar-se</Button></Link>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Login