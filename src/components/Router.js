import React from "react"
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch
} from "react-router-dom";

import { SkiDayList } from './SkiDayList'
import { SkiDayCount } from './SkiDayCount'
import { LoginForm } from './LoginForm'
import { AddDayForm } from './AddDayForm'
import { Menu } from './Menu'
import { Whoops404 } from './Whoops404'

const LoginWrapper = withRouter(
    ({ history, ...props }) => {
      return <LoginForm auth={props.auth} history={history} />
    }
);

const Logout = withRouter(
    ({ history, ...props }) =>
          <button
            onClick={() => props.signout(() => history.push("/")) }
          >
            Log out
          </button>
);

function PrivateRoute({component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            rest.authState ? (
            <Component {...rest} {...props} />
          ) : (
            <LoginWrapper auth={rest.auth} />
          )
        }
      />
    );
}

const SkiDayListWrapper=({days, deleteDay})=> {  
    return <SkiDayList days={days} deleteDay={deleteDay} />
}

export const AppRouter = (
  {auth, authState, daylist, signout, onNewDay, deleteDay, skiDayCount}
  ) => {
    return (
      <Router>
        <div>
            <Menu authState={authState} />

            <Switch>    

                  <Route
                      authState={authState} 
                      path="/" exact 
                      component={() => <h1>Welcome</h1>}
                      />

                  <PrivateRoute 
                      authState={authState} 
                      path="/overview" exact 
                      component={() => <SkiDayCount skiDayCount={skiDayCount}/>}
                      />
                      
                  <PrivateRoute                  
                      authState={authState} 
                      path="/addDay" exact 
                      component={() => <AddDayForm onNewDay={onNewDay}/>}
                      />

                  <PrivateRoute 
                      signout={signout}
                      authState={authState} 
                      path="/logout" exact 
                      component={Logout} 
                      />  

                  <PrivateRoute 
                      auth={auth} 
                      authState={authState} 
                      path="/login" exact 
                      component={() => <LoginWrapper />}
                      />

                  <PrivateRoute
                      authState={authState}
                      path="/dayList" 
                      component={() => <SkiDayListWrapper days={daylist} deleteDay={deleteDay} />}
                      />   

                  <Route component={Whoops404} />
                   
            </Switch>   
        </div>
      </Router>
    );
  }