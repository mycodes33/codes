import React, {useState, useEffect} from 'react'
import {AuthContextProvider} from './services/AuthContext'
import {auth} from './services/Firebase'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Admin from './pages/Admin/Admin'
import PostList from './pages/PostList/PostList'
import CreatePost from './pages/CreatePost/CreatePost'
import EditPost from './pages/EditPost/EditPost'
import Category from './pages/Category/Category'
import CommentList from './pages/CommentList/CommentList'
import MessageDetail from './pages/MessageDetail/MessageDetail'
import MessageList from './pages/MessageList/MessageList'
import PostDetail from './pages/PostDetail/PostDetail'

const Private = ({component: Component, ...rest}) => {
    const [state, setState] = useState()
    console.log('Change route Admin')

    useEffect(() => {
        auth.onAuthStateChanged(user => setState(user))
    }, [])

    return state !== undefined && (
        <Route {...rest} render={({location}) =>
                state ? <Component /> : <Redirect to={{pathname: '/login', state: {from: location}}} />
        } />
    )
}

const App = () => {
    return (
        <AuthContextProvider>
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} />
            <Route path='/login' component={Login} />
            <Private path='/admin' component={Admin} />
            <Private path='/posts' component={PostList} />
            <Private path='/create' component={CreatePost} />
            <Private path='/edit/:id' component={EditPost} />
            <Private path='/category' component={Category} />
            <Private path='/comment' component={CommentList} />
            <Private path='/message/:id' component={MessageDetail} />
            <Private path='/message' component={MessageList} />
            <Route path='/:url' component={PostDetail} />
        </Switch>
        </BrowserRouter>
        </AuthContextProvider>
    )
}

export default App