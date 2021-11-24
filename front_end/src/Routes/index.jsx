
import {Switch, Route} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Redefinir from '../pages/Redefinir'
import Cadastrar from '../pages/Cadastrar'
import Solicitar from '../pages/Solicitar'

const Routes = () => {
    return(
        <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>

            <Route exact path='/login'>
                <Login/>
            </Route>

            <Route exact path='/redefinir'>
                <Redefinir/>
            </Route>

            <Route exact path='/dashboard'>
                <Dashboard/>
            </Route>

            <Route exact path='/dashboard/:id'>
                <Dashboard/>
            </Route>

            <Route exact path='/cadastrar'>
                <Cadastrar/>
            </Route>

            <Route exact path='/solicitar'>
                <Solicitar/>
            </Route>
            
        </Switch>
    )
}

export default Routes