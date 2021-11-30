import {useHistory} from 'react-router-dom'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import { toast } from 'react-toastify'

import Header from '../../components/Header'
import Button from '../../components/Button'
import Footer from '../../components/Footer'

import './cadastrar.css'
import api from '../../services/api'

const Cadastrar = () => {

    const history = useHistory()
    const zero = 0

    const formSchema = yup.object().shape({
        nome: yup.string().required('Campo obrigatório').matches(/[a-zA-Z]+/g, 'Apenas letras'),
        tipousuario: yup.string(),
        email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
        cpf: yup.string().required('Campo obrigatório'),
        //celular: yup.string().required('Campo obrigatório'),
        //nascimento: yup.string().required('Campo obrigatório'),
        cep: yup.string().required('Campo obrigatório'),
        logradouro: yup.string().required('Campo obrigatório'),
        complemento: yup.string(),
        numero: yup.string().required('Campo obrigatório'),
        bairro: yup.string().required('Campo obrigatório'),
        cidade: yup.string().required('Campo obrigatório'),
        uf: yup.string().required('Campo obrigatório'),
        senha: yup.string().required('Campo obrigatório'),
        confirmaSenha: yup.string().required('Campo obrigatório').oneOf([yup.ref('senha'), 'as senhas não conferem']),
        permissao_alterar: yup.number(),
        permissao_excluir: yup.number(),
        permissao_baixa: yup.number()
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    })

    const cadastrarSubmit = (data) =>{

        delete data.confirmaSenha
        delete data.celular

        api.post('/usuarios', data).then(res => {
            toast.success('Cadastro realizado com sucesso')
            toast.success('Faça login para entrar!')
            history.push('/login')
        }).catch(err => {
            toast.error('Ops, algo deu errado. Tente novamente!')
            console.log(err)
        })
    }

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
                            {...register('nome')}
                        />
                        <br/><span>{errors.nome?.message}</span>

                        <input type='hidden' value='M' {...register('tipousuario')}/>
                        <input type='hidden' value={zero} {...register('permissao_alterar')}/>
                        <input type='hidden' value={zero} {...register('permissao_excluir')}/>
                        <input type='hidden' value={zero} {...register('permissao_baixa')}/>

                        <input 
                            placeholder='e-mail' 
                            type='email'
                            {...register('email')}    
                        />
                        <br/><span>{errors.email?.message}</span>

                        <input 
                            placeholder='cpf'
                            {...register('cpf')}
                        />
                        <br/><span>{errors.cpf?.message}</span>

{/*                         <input 
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
                        <span>{errors.celular?.message}</span> */}

                        <input 
                            placeholder='CEP' 
                            type='text'
                            {...register('cep')} 
                            onBlur={onBlurCep}   
                        />
                        <br/><span>{errors.cep?.message}</span>
                        
                        <input 
                            placeholder='logradouro' 
                            type='text'
                            id='logradouro'
                            readonly='readonly'
                            {...register('logradouro')}    
                        />
                        <br/><span>{errors.logradouro?.message}</span>

                        <input 
                            placeholder='número' 
                            {...register('numero')}    
                        />
                        <br/><span>{errors.numero?.message}</span>

                        <input
                            placeholder='complemento'
                            {...register('complemento')}
                        />
                        <br/><span>{errors.complemento?.message}</span>

                        <input 
                            placeholder='bairro' 
                            type='text'
                            id='bairro'
                            readonly='readonly'
                            {...register('bairro')}    
                        />
                        <br/><span>{errors.bairro?.message}</span>

                        <input 
                            placeholder='cidade' 
                            type='text'
                            id='cidade'
                            readonly='readonly'
                            {...register('cidade')}    
                        />
                        <br/><span>{errors.cidade?.message}</span>

                        <input 
                            placeholder='uf' 
                            type='text'
                            id='uf'
                            readonly='readonly'
                            {...register('uf')}    
                        />
                        <br/><span>{errors.uf?.message}</span>

                        <input 
                            placeholder='senha' 
                            type='password'
                            {...register('senha')}    
                        />
                        <br/><span>{errors.senha?.message}</span>

                        <input 
                            placeholder='sonfirme a senha' 
                            type='password'
                            {...register('confirmaSenha')}    
                        />
                        <br/><span>{errors.confirmaSenha?.message}</span>

                        <br/><Button type='submit'>Salvar</Button>
    
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
