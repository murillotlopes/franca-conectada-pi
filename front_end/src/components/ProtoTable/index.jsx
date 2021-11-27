
import './prototable.css'

import { ImBin, ImPencil, ImEye } from 'react-icons/im'

const ProtoTable = ({e}) => {
    return(
        <li>
            <p className='consultaId'>{e.id}</p>
            <p className='consultaStatus'>{e.estadosolicitacao}</p>
            <p className='consultaComentario'>{e.referencia}</p>
            <p className='consultaAcoes'><ImPencil/><ImEye/><ImBin/></p>
        </li>
    )
}

export default ProtoTable