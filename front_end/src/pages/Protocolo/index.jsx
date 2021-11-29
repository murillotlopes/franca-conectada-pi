import {useParams} from 'react-router-dom'

import Header from "../../components/Header"
import Footer from "../../components/Footer"


const Protocolo = () =>{

    const params = useParams()

    return(
        <>
            <Header/>

            <main>
                {params.id}
            </main>

            <Footer/>
        </>
    )
}

export default Protocolo