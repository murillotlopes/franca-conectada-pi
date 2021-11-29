import Header from '../../components/Header'
import './inicio.css'
import rua from '../../img/rua.jpg'
import Footer from '../../components/Footer'

const Home = () => {
    return (
        <>
            <Header />

            <div id="content">
                <main className="card-1">
                    <h1>Bem Vindo ao Franca Conectada</h1>

                    <p>Nos ajude a melhorar nossa cidade informando onde há necessecidade de remendo asfaltico. Basta preencher o formulario de cadastro na aba login e em seguinda no botão de cadastro, e em seguida fazer o login para realizar a solicitação de remendo asfaltico.</p>
                    <img src={rua} alt="rua" id="rua"/>
                    <p>Após realizar a solicitação você poderá acompanhar o andando de seu pedido atraves do número do protocolo, onde ele sera negado ou repassado para a empresa resposavel pelo remendo</p>
                </main>
                <aside className="card-2">
                    <article>
                        <h2>Notícias da vacinação</h2>
                        <p>  A Secretaria Municipal de Saúde inicia nesta sexta-feira, 19, a aplicação da terceira dose para as pessoas, com idade de 40 anos ou mais, que tomaram as duas doses da vacina contra a Covid-19, há pelo menos cinco meses, ou seja, quem completou o ciclo de vacinação até o mês de junho. A dose adicional será estendida para pessoas, que tenham 18 anos ou mais, a partir deste sábado, durante um novo mutirão, que está sendo organizado pela secretaria. "Separamos a faixa etária para evitar que um número alto de pessoas procure em um único dia, as UBS, mantendo a organização e o fluxo de atendimento", explicou Lucas Souza, secretário de Saúde.</p>
                    </article>
                </aside>
            </div>

            <Footer/>

        </>
    )
}

export default Home