import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {UserTable} from './pages/UserTable'
import {StickyPage} from './pages/StickyPage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/users" exact>
                    <UserTable />
                </Route>
                <Route path="/notes" exact>
                    <StickyPage />
                </Route>
                <Redirect to="/users" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}