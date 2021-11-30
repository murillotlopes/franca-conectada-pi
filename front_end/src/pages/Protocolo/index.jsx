import {useParams, useHistory} from 'react-router-dom'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Button from '../../components/Button'
import { useEffect, useState } from 'react'
import api from '../../services/api'

import './protocolo.css'
import { toast } from 'react-toastify'


const Protocolo = () =>{

    const params = useParams()
    const history = useHistory()

    const {id} = JSON.parse(localStorage.getItem('@fraConect:usuario'))

    const [cep, setCep] =useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [referencia, setReferencia] = useState('')
    const [longitude, setLongitude] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const [prot, setProt] = useState(0)

    useEffect(()=> {

        api.get(`/solicitacoes/${params.id}`).then( res => {
            setCep(res.data.solicitacao[0].cep)
            setLogradouro(res.data.solicitacao[0].logradouro)
            setBairro(res.data.solicitacao[0].bairro)
            setReferencia(res.data.solicitacao[0].referencia)
            setLongitude(res.data.solicitacao[0].longitude)
            setLatitude(res.data.solicitacao[0].latitude)
            setProt(res.data.solicitacao[0].id)
        })
        
    }, [])

    const schema = yup.object().shape({

    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const atualizarSolicitacao = (data) => {
        console.log(data)

        api.put(`/solicitacoes/${params.id}`).then( res => {
            history.push('/dashboard')
            toast.success('Protocolo atualizado com sucesso')
        }).catch( err => {
            console.log(err)
            toast.error('Ops, algo de erro. Tente novamente!')
        })
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

            <main className='protocolo-main'>

                <h2>Visualize ou edite sua solicitação</h2>

                <div className='protocolo-container'>

                    <form className='protocolo-form' onSubmit={handleSubmit(atualizarSolicitacao)}>
                            {/*Protocolo não deveria aparecer para o usuário apenas após enviar solicitação?*/}
                            <input 
                                placeholder='Protocolo' 
                                type='text'
                                value={prot}
                                readonly='readonly' 
                                {...register('protocolo')}
                                onChange={ e => setProt(e.target.value)}
                                
                            />

                            <input type='hidden' value='aberto' {...register('estadosolicitacao')} />
                            <input type='hidden' value={id} {...register('codusuario')}/>

                            
                            <input 
                                placeholder='CEP' 
                                type='text'
                                autofocus
                                value={cep}
                                id='cep'
                                {...register('cep')}    
                                onBlur={onBlurCep}
                                onChange={e => setCep(e.target.value)}
                            />
                            <br/><span>{errors.cep?.message}</span>

                            <input 
                                placeholder='Logradouro' 
                                type='text'
                                readonly='readonly'
                                value={logradouro}
                                id='logradouro'
                                {...register('logradouro')}  
                                onChange={e => setLogradouro(e.target.value)}  
                            />
                            <br/><span>{errors.logradouro?.message}</span>

                            <input 
                                placeholder='Bairro' 
                                type='text'
                                id='bairro'
                                readonly='readonly'
                                {...register('bairro')} 
                                value={bairro}
                                onChange={e => setBairro(e.target.value)}   
                            />
                            <br/><span>{errors.bairro?.message}</span>
        
                            <input  
                                placeholder='Ponto de Referência'
                                type='text'
                                {...register('referencia')}
                                value={referencia}
                                onChange={ e => setReferencia(e.target.value)}
                            />
                            <br/><span>{errors.referencia?.message}</span>

                            {/*API Google Maps */}

                            <input
                                placeholder='Longitude'
                                type='text'
                                value={0}
                                {...register('longitude')}
                                value={longitude}
                                onChange={ e => setLongitude(e.target.value)}
                            />
                            <br/><span>{errors.longitude?.message}</span>

                            <input
                                placeholder='Latitude'
                                type='text'
                                value={0}
                                {...register('latitude')}
                                value={latitude}
                                onChange={ e => setLatitude(e.target.value)}
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