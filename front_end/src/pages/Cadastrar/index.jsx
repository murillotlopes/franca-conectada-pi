import {Link, useHistory} from 'react-router-dom'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'

import Header from '../../components/Header'
import Button from '../../components/Button'

import './cadastrar.css'

const Cadastrar = () => {

    const history = useHistory()

    const formSchema = yup.object().shape({
        name: yup.string().required('Campo obrigatório'),
        email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
        celular: yup.string().required('Campo obrigatório'),
        nascimento: yup.date().required('Campo obrigatório'),
        cep: yup.string().required('Campo obrigatório'),
        numero: yup.number().required('Campo obrigatório'),
        password: yup.string().required('Campo obrigatório'),
        passwordConfirme: yup.string().required('Campo obrigatório')
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })



    function limparCamposEndereco() {
        document.getElementById('logradouro').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('uf').value = '';
    }

    function preencherEndereco(endereco){
        document.getElementById('logradouro').value = endereco.logradouro;
        document.getElementById('bairro').value = endereco.bairro;
        document.getElementById('cidade').value = endereco.localidade;
        document.getElementById('uf').value = endereco.uf;
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
                preencherEndereco(data);
        }
        })
    };

    const cadastrarSubmit = (data) =>{
        history.push(`/dashboard/${data}`)
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
                            placeholder='email' 
                            type='email'
                            {...register('email')}    
                        />
                        <span>{errors.email?.message}</span>
                        
                        <input 
                            placeholder='celular' 
                            type='text'
                            {...register('celular')}    
                        />
                        <span>{errors.celular?.message}</span>

                        <input 
                            placeholder='Data de nascimento' 
                            type='date'
                            {...register('nascimento')}    
                        />
                        <span>{errors.nascimento?.message}</span>

                        <input 
                            placeholder='CEP' 
                            type='text'
                            id='cep'
                            {...register('cep')}    
                            onBlur={onBlurCep}  
                        />
                        <span>{errors.cep?.message}</span>

                        <input 
                            placeholder='Cidade' 
                            type='text'
                            id='cidade'
                            readonly='readonly'
                            {...register('cidade')}    
                        />
                      
                        <input 
                            placeholder='Logradouro' 
                            type='text'
                            id='logradouro'
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
                            id='bairro'
                            readonly='readonly'
                            {...register('bairro')}    
                        />

                        <input 
                            placeholder='UF' 
                            type='text'
                            id='uf'
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

                        <Button>Salvar</Button>
    
                    </form>

                    <hr/>

                    <Link to='/login'><Button>Cancelar</Button></Link>

                </div>
            </main>
        </>
    )
}

export default Cadastrar
