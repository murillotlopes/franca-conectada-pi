
import {ImFacebook2, ImWhatsapp} from 'react-icons/im'
import {GrInstagram} from 'react-icons/gr'

import './footer.css'

const Footer = () => {
    return(
        <footer>
            <adress id="rodape"> 
                Rua Frederico Moura, 1517 <br/> Cidade Nova, Franca - SP<br/>
                <a id="rodape" href="tel:+551637119000">(16) 3711-9000</a><br/>
                <a id="rodape" href="mailto:ouvidoria@franca.sp.gov.br">ouvidoria@franca.sp.gov.br</a>
            </adress>
            <ul>
                <li><a id="rodape" href="#">Quem somos</a></li>
                <li><a id="rodape" href="#">Nossa missão</a></li>
                <li><a id="rodape" href="#">Comercial</a></li>
            </ul>
            <a id="imgfooter" href="#"><ImFacebook2/></a>
            <a id="imgfooter" href="#"><GrInstagram/></a>
            <a id="imgfooter" href="#"><ImWhatsapp/></a>
        </footer>
    )
}

export default Footer