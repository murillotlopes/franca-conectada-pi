import {useParams} from 'react-router-dom'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Button from '../../components/Button'
import { useState } from 'react'
import api from '../../services/api'

import './protocolo.css'


const Protocolo = () =>{

    const params = useParams()

    const {id} = JSON.parse(localStorage.getItem('@fraConect:usuario'))

    const [solicitacao, setSolicitacao] = useState(()=> {
        api.get(`/solicitacoes/${params.id}`).then( res => {
            console.log(res)
            return res
        })
    })

    console.log(solicitacao)

    const schema = yup.object().shape({

    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const atualizarSolicitacao = (data) => {
        
    }

    function limparCamposEndereco() {
        document.getElementById('logradouro').value = '';
        document.getElementById('bairro').value = '';
        //document.getElementById('cidade').value = '';
        //document.getElementById('uf').value = '';
    }

    function preencherEndereco(endereco){
        document.getElementById('logradouro').value = endereco.logradouro;
        document.getElementById('bairro').value = endereco.bairro;
        //document.getElementById('cidade').value = endereco.localidade;
        //document.getElementById('uf').value = endereco.uf;
    }


    function onBlurCep(ev){
        const {value} = ev.target;
        const cep= value?.replace(/[^0-9]/g,'');

        if(cep?.length !== 8){
            limparCamposEndereco();
            document.getElementById('logradouro').value = 'CEP Inválido';
            return;
        }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((data) => {
        if (data.hasOwnProperty('erro')){
            limparCamposEndereco();
            document.getElementById('logradouro').value = 'Cep não encontrado!';
        }
        else{
            if(data.localidade !== 'Franca'){
                limparCamposEndereco();
                document.getElementById('logradouro').value = 'Local fora do Municípo de Franca!';
            }
            else{
                preencherEndereco(data);
            }
        }
        })
    };


    return(
        <>
            <Header/>
            {params.id}
            <main className='protocolo-main'>
                <h2>Visualize ou edite sua solicitação</h2>

                <div className='protocolo-container'>

                    <form className='protocolo-form' onSubmit={handleSubmit(atualizarSolicitacao)}>
                            {/*Protocolo não deveria aparecer para o usuário apenas após enviar solicitação?*/}
                            <input 
                                placeholder='Protocolo' 
                                type='text'
                                readonly='readonly' 
                                {...register('protocolo')}
                            />

                            <input readonly='readonly' {...register('estadosolicitacao')} />
                            <input type='hidden' value={id} {...register('codusuario')}/>

                            
                            <input 
                                placeholder='CEP' 
                                type='text'
                                autofocus
                                id='cep'
                                {...register('cep')}    
                                onBlur={onBlurCep}
                            />
                            <br/><span>{errors.cep?.message}</span>

                            <input 
                                placeholder='Logradouro' 
                                type='text'
                                readonly='readonly'
                                id='logradouro'
                                {...register('logradouro')}    
                            />
                            <br/><span>{errors.logradouro?.message}</span>

                            <input 
                                placeholder='Bairro' 
                                type='text'
                                id='bairro'
                                readonly='readonly'
                                {...register('bairro')}    
                            />
                            <br/><span>{errors.bairro?.message}</span>
        
                            <input  
                                placeholder='Ponto de Referência'
                                type='text'
                                {...register('referencia')}
                            />
                            <br/><span>{errors.referencia?.message}</span>

                            {/*API Google Maps */}

                            <input
                                placeholder='Longitude'
                                type='text'
                                value={0}
                                {...register('longitude')}
                            />
                            <br/><span>{errors.longitude?.message}</span>

                            <input
                                placeholder='Latitude'
                                type='text'
                                value={0}
                                {...register('latitude')}
                            />
                            <br/><span>{errors.latitude?.message}</span>

                            <input
                                type='file'
                                accept='image/*'
                            />

                            <Button type='submit'>Enviar Solicitação</Button>
        
                    </form>

                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Protocolo