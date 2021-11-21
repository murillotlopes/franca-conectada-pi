import {Link, useHistory} from 'react-router-dom'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

import Header from '../../components/Header'
import Button from '../../components/Button'

import './solicitar.css'

const Solicitar = () => {

    const history = useHistory()

    const formSchema = yup.object().shape({
        
        cep: yup.string().required('Campo obrigatório'),
        numero: yup.number().required('Campo obrigatório'),
        referencia: yup.string().required('Campo obrigatório')
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    const solicitarSubmit = (data) =>{
        history.push(`/dashboard/${data}`)
    }


    return(
        <>
            <Header/>

            <main className='solicitar-main'>
                <h1>Franca Conectada</h1>

                <div className='solicitar-container'>
                    <p>Cadastrar Solicitação</p>

                    <form className='solicitar-form' onSubmit={handleSubmit(solicitarSubmit)}>
                        {/*Protocolo não deveria aparecer para o usuário apenas após enviar solicitação?*/}
                        <input 
                            placeholder='Protocolo' 
                            type='text'
                            readonly='readonly' 
                            {...register('protocolo')}
                        />
                        
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
                            placeholder='CEP' 
                            type='text'
                            autofocus
                            {...register('cep')}    
                        />
                        <span>{errors.cep?.message}</span>

                        <input 
                            placeholder='Cidade' 
                            type='text'
                            readonly='readonly'
                            {...register('cidade')}    
                        />
                        {/*Data do registro não deveria aparecer depois de enviada a solicitação? */}
                        <input
                            placeholder='Data do Registro'
                            type='date'
                            readonly='readonly'
                            {...register('date')}
                        />

                        <input 
                            placeholder='Cidade' 
                            type='text'
                            readonly='readonly'
                            {...register('cidade')}    
                        />
                        <input 
                            placeholder='Logradouro' 
                            type='text'
                            readonly='readonly'
                            {...register('logradouro')}    
                        />

                        <input 
                            placeholder='Número' 
                            type='number'
                            {...register('numero')}    
                        />
                        <span>{errors.numero?.message}</span>

                        <input 
                            placeholder='Bairro' 
                            type='text'
                            readonly='readonly'
                            {...register('bairro')}    
                        />

                        <Button>Adicionar Imagens</Button>
                               
                        <input  
                            placeholder='Ponto de Referência'
                            type='text'
                            {...register('referencia')}
                        />
                        {/*API Google Maps */}
                        <input
                            placeholder='Mapa'
                            type='image'
                            {...register('mapa')}
                        />

                        <Button>Enviar Solicitação</Button>
    
                    </form>

                    <hr/>

                    <Link to='/'><Button>Cancelar</Button></Link>

                </div>
            </main>
        </>
    )
}

export default Solicitar
