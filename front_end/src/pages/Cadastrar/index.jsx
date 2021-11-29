import {useHistory} from 'react-router-dom'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

import Header from '../../components/Header'
import Button from '../../components/Button'
import Footer from '../../components/Footer'

import './cadastrar.css'

const Cadastrar = () => {

    const history = useHistory()

    const formSchema = yup.object().shape({
        name: yup.string().required('Campo obrigatório'),
        email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
        celular: yup.string().required('Campo obrigatório'),
        nascimento: yup.string().required('Campo obrigatório'),
        cep: yup.string().required('Campo obrigatório'),
        logradouro: yup.string(),
        complemento: yup.string(),
        numero: yup.number().required('Campo obrigatório'),
        //bairro: yup.string().required('Campo obrigatório'),
        //cidade: yup.string().required('Campo obrigatório'),
        //uf: yup.string().required('Campo obrigatório'),
        password: yup.string().required('Campo obrigatório'),
        passwordConfirme: yup.string().required('Campo obrigatório')
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    const cadastrarSubmit = (data) =>{
        console.log(data)
        history.push(`/login`)
    }


    return(
        <>
            <Header/>

            <main className='cadastrar-main'>
                <h1>Franca Conectada</h1>

                <div className='cadastrar-container'>
                    <p>Cadastre-se</p>

                    <form className='cadastrar-form' onSubmit={handleSubmit(cadastrarSubmit)}>

                        <input 
                            placeholder='nome completo' 
                            type='text' 
                            autoFocus
                            {...register('name')}
                        />
                        <span>{errors.name?.message}</span>

                        <input 
                            placeholder='e-mail' 
                            type='email'
                            {...register('email')}    
                        />
                        <span>{errors.email?.message}</span>

                        <input 
                            placeholder='data de nascimento' 
                            type='date'
                            {...register('nascimento')}    
                        />
                        <span>{errors.nascimento?.message}</span>
                        
                        <input 
                            placeholder='celular' 
                            type='text'
                            {...register('celular')}    
                        />
                        <span>{errors.celular?.message}</span>

                        <input 
                            placeholder='CEP' 
                            type='text'
                            {...register('cep')}    
                        />
                        <span>{errors.cep?.message}</span>
                        
                        <input 
                            placeholder='logradouro' 
                            type='text'
                            readonly='readonly'
                            {...register('logradouro')}    
                        />

                        <input 
                            placeholder='número' 
                            type='number'
                            {...register('numero')}    
                        />
                        <span>{errors.numero?.message}</span>

                        <input
                            placeholder='complemento'
                            {...register('complemento')}
                        />

                        <input 
                            placeholder='Bairro' 
                            type='text'
                            readonly='readonly'
                            {...register('bairro')}    
                        />

                        <input 
                            placeholder='Cidade' 
                            type='text'
                            readonly='readonly'
                            {...register('cidade')}    
                        />

                        <input 
                            placeholder='UF' 
                            type='text'
                            readonly='readonly'
                            {...register('uf')}    
                        />

                        <input 
                            placeholder='Senha' 
                            type='password'
                            {...register('password')}    
                        />
                        <span>{errors.password?.message}</span>

                        <input 
                            placeholder='Confirme a Senha' 
                            type='password'
                            {...register('passwordConfirme')}    
                        />
                        <span>{errors.passwordConfirme?.message}</span>

                        <Button type='submit'>Salvar</Button>
    
                    </form>

                    <hr/>

                    <Button onClick={() => history.push('/')}>Cancelar</Button>

                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Cadastrar
