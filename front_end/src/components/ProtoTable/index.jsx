
import './prototable.css'

import { ImBin, ImPencil, ImEye } from 'react-icons/im'


const ProtoTable = ({e, edit, visualizar, excluir}) => {

    return(
        <li>
            <p className='consultaId'>{e.id}</p>
            <p className='consultaStatus'>{e.estadosolicitacao}</p>
            <p className='consultaComentario'>{e.referencia}</p>
            <p className='consultaAcoes'>
                <button onClick={() => edit(e.id)}><ImPencil /></button>
                <button onClick={() => visualizar(e.id)}><ImEye /></button>
                <button onClick={() => excluir(e.id)}><ImBin /></button>
            </p>
        </li>
    )
}

export default ProtoTable