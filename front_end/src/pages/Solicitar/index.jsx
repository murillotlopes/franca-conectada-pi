import {Link, useHistory} from 'react-router-dom'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

import Header from '../../components/Header'
import Button from '../../components/Button'
import Footer from '../../components/Footer'

import './solicitar.css'

const Solicitar = () => {

    const history = useHistory()

    const formSchema = yup.object().shape({
        
        cep: yup.string().required('Campo obrigatório'),
        logradouro: yup.string().required('Campo obrigatório'),
        numero: yup.string().required('Campo obrigatório'),
        complemento: yup.string(),
        bairro: yup.string().required('Campo obrigatório'),
        cidade: yup.string().required('Campo obrigatório'),
        uf: yup.string().required('Campo obrigatório'),
        referencia: yup.string().required('Campo obrigatório'),
        longitude: yup.string().required('Campo obrigatório'),
        latitude: yup.string().required('Campo obrigatório'),

    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    const solicitarSubmit = (data) =>{
        console.log(data)
        history.push(`/dashboard`)
    }


    return(
        <>
            <Header/>

            <main className='solicitar-main'>
                <h1>Franca Conectada</h1>

                <div className='solicitar-container'>
                    <p>Informe abaixo onde ocorre o problema respeitando os campos obrigatórios *</p>
                    

                    <form className='solicitar-form' onSubmit={handleSubmit(solicitarSubmit)}>
                        {/*Protocolo não deveria aparecer para o usuário apenas após enviar solicitação?*/}
                        <input 
                            placeholder='Protocolo' 
                            type='text'
                            readonly='readonly' 
                            {...register('protocolo')}
                        />
                        
                        <input 
                            placeholder='CEP' 
                            type='text'
                            autofocus
                            {...register('cep')}    
                        />
                        <span>{errors.cep?.message}</span>

                        <input 
                            placeholder='Logradouro' 
                            type='text'
                            readonly='readonly'
                            {...register('logradouro')}    
                        />

                        <input 
                            placeholder='Número'
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
                            placeholder='estado' 
                            type='text'
                            readonly='readonly'
                            {...register('uf')}    
                        />
                               
                        <input  
                            placeholder='Ponto de Referência'
                            type='text'
                            {...register('referencia')}
                        />

                        {/*API Google Maps */}

                        <input
                            placeholder='Longitude'
                            type='text'
                            {...register('longitude')}
                        />

                        <input
                            placeholder='Latitude'
                            type='text'
                            {...register('latitude')}
                        />

                        <input
                            type='file'
                            accept='image/*'
                        />

                        <Button type='submit'>Enviar Solicitação</Button>
    
                    </form>

                    <hr/>

                    <Button onClick={() => history.push('/dashboard')}>Cancelar</Button>

                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Solicitar
