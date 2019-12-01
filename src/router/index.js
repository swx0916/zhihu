import React from 'react'
import { Route,Switch,Redirect } from 'react-router-dom'
import Index from '../components/Index'
import Detail from '../components/Detail'
import Comments from '../components/Comments'
import Collect from '../components/Collect'

const routes = [
    {
        path:'/index',
        component:Index
    },
    {
        path:'/detail',
        component:Detail
    },
    {
        path:'/comments',
        component:Comments
    },
    {
        path:'/collect',
        component:Collect
    }


]
const Router = ()=>{
    return(
        <div>
            <Switch>
                {
                    routes.map((val,i)=>{
                        if(val.path==="*"){
                            return <Redirect to={val.redirect} ket={i}/>
                        }else{
                            return <Route path={val.path} component={val.component} key={i}/>
                        }
                    })
                }
            </Switch>
        </div>
    )
}
 export  default Router
