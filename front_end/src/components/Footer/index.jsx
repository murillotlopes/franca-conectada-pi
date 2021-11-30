
import {ImFacebook2, ImWhatsapp} from 'react-icons/im'
import {GrInstagram} from 'react-icons/gr'

import './footer.css'

const Footer = () => {
    return(
        <footer>
            <adress id="rodape"> 
                <a id="rodape">Rua Frederico Moura, 1517</a><br/>
                <a id="rodape">Cidade Nova, Franca - SP</a><br/>
                <a id="rodape" href="tel:+551637119000">(16) 3711-9000</a><br/>
                <a id="email" href="mailto:ouvidoria@franca.sp.gov.br">ouvidoria@franca.sp.gov.br</a>
            </adress>
            <ul id="rodape1">
                <li><a id="rodape1" href="#">Quem somos</a></li>
                <li><a id="rodape1" href="#">Nossa missão</a></li>
                <li><a id="rodape2" href="#">Comercial</a></li>
            </ul>
            <ul id="imgfooter">
            <a id="imgfooter" href="#"><ImFacebook2/></a>
            <a id="imgfooter" href="#"><GrInstagram/></a>
            <a id="imgfooter" href="#"><ImWhatsapp/></a>
            </ul>
        </footer>
    )
}

export default Footer