import { Switch } from 'react-router-dom';
import Route from './Route'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import Customers from '../pages/Customers'
import New from '../pages/New';
import AllCustomers from '../pages/AllCustomers'

export default function MainRoutes() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/dashboard" component={Dashboard} isPrivate />
                <Route exact path="/profile" component={Profile} isPrivate />
                <Route exact path="/customers" component={Customers} isPrivate />
                <Route exact path="/new" component={New} isPrivate />
                <Route exact path="/allcustomers" component={AllCustomers} isPrivate />
            </Switch>
        </>
    )
}