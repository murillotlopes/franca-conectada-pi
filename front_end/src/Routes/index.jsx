
import {Switch, Route} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Redefinir from '../pages/Redefinir'

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
        </Switch>
    )
}

export default Routes