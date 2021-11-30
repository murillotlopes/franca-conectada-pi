import {useHistory} from 'react-router-dom'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

import Header from '../../components/Header'
import Button from '../../components/Button'
import Footer from '../../components/Footer'
import api from '../../services/api'

import './solicitar.css'
import { toast } from 'react-toastify'


const Solicitar = () => {

    const history = useHistory()

    const {id} = JSON.parse(localStorage.getItem('@fraConect:usuario'))

    const dataAtual = () => {

        const data = new Date()
        const dia = String(data.getDate()).padStart(2, '0')
        const mes= String(data.getMonth() + 1).padStart(2,'0')
        const ano = data.getFullYear()

        return `${ano}-${mes}-${dia}`
    }

    const dataAgora = dataAtual()

    //console.log(typeof(dataAtual()))

    const formSchema = yup.object().shape({
        codusuario: yup.number(),
        dataregistro: yup.string(),
        estadosolicitacao: yup.string(),
        cep: yup.string().required('Campo obrigatório'),
        logradouro: yup.string().required('Campo obrigatório'),
        bairro: yup.string().required('Campo obrigatório'),
        referencia: yup.string().required('Campo obrigatório'),
        longitude: yup.number(),
        latitude: yup.number(),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    const solicitarSubmit = (data) =>{

        console.log(data)
        api.post(`/solicitacoes/${data}`).then(res => {
            //console.log(res)
            history.push('/dashboard')
            toast.success('Solicitação aberta com sucesso!')
        }).catch(err => {
            console.log(err)
            toast.error('Ops, algo deu errado. Tente novamente!')
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
                            //{...register('protocolo')}
                        />

                        <input type='hidden' value={dataAgora} {...register('dataregistro')} />
                        <input type='hidden' value='aberta' {...register('estadosolicitacao')} />
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

                    <hr/>

                    <Button onClick={() => history.push('/dashboard')}>Cancelar</Button>

                </div>
            </main>

            <Footer/>
        </>
    )
}

export default Solicitar
