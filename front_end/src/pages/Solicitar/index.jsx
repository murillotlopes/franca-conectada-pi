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
    
    function limparCamposEndereco() {
        document.getElementById('logradouro').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';
    }

    function preencherEndereco(endereco){
        document.getElementById('logradouro').value = endereco.logradouro;
        document.getElementById('bairro').value = endereco.bairro;
        document.getElementById('cidade').value = endereco.localidade;
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
            if(data.localidade != 'Franca'){
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
                    <p>Cadastrar Solicitação</p>

                    <form className='solicitar-form' onSubmit={handleSubmit(solicitarSubmit)}>
                        {/*Protocolo não deveria aparecer para o usuário apenas após enviar solicitação?*/}
                        <input 
                            placeholder='Protocolo' 
                            type='text'
                            readonly='readonly' 
                            {...register('protocolo')}
                        />
                        


                        {/*Data do registro não deveria aparecer depois de enviada a solicitação? */}
                        {/*Sim , este campo deverá ter preenchimento automatico*/}
                        <input
                            placeholder='Data do Registro'
                            type='date'
                            readonly='readonly'
                            {...register('date')}
                        />
                        
                        <input 
                            placeholder='CEP' 
                            type='text'
                            autofocus
                            id='cep'
                            {...register('cep')}  
                            onBlur={onBlurCep}  
                        />
                         <span>{errors.cep?.message}</span>
                        
                        <input 
                            placeholder='Logradouro' 
                            type='text'
                            readonly='readonly'
                            id='logradouro'
                            {...register('logradouro')}    
                        />
                        
                        {/*número de residencia é melhor ser texto , já que pode ter letras em alguns locais*/}
                        <input 
                            placeholder='Número' 
                            type='text'
                            {...register('numero')}    
                        />
                        <span>{errors.numero?.message}</span>
                        
                        {/* ?  havia dois campos de cidade repetidos aqui . mudei a ordem dos campos também*/}
                        <input 
                            placeholder='Cidade' 
                            type='text'
                            readonly='readonly'
                            id='cidade'
                            {...register('cidade')}    
                        />

                        <input 
                            placeholder='Bairro' 
                            type='text'
                            id='bairro'
                            readonly='readonly'
                            {...register('bairro')}    
                        />

                        <input  
                            placeholder='Ponto de Referência'
                            type='text'
                            {...register('referencia')}
                            />
                        {/*ponto de referência é mais uma localização específica indicada pelo usuario - próximo ao ponto galo branco , por exemplo*/}
                        
                        {/*API Google Maps */}
                        
                        {/*Achei melhor os campos de georeferenciamento junto com o mapa , pois ninguém vai preencher manualmente*/}
                        <input
                            placeholder='Latitude'
                            type='text'
                            id='latitude'
                            {...register('latitude')}
                        />
                        <input
                            placeholder='Longitude'
                            type='text'
                            id='longitude'
                            {...register('longitude')}
                        />


                        <input
                            placeholder='Mapa'
                            type='image'
                            {...register('mapa')}
                            />

                        <Button>Adicionar Imagens</Button>
                        
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
