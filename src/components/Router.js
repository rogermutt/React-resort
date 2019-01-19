import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";

import { SkiDayList } from './SkiDayList'
import { SkiDayCount } from './SkiDayCount'
import { AddDayForm } from './AddDayForm'
import { Menu } from './Menu'
import { Whoops404 } from './Whoops404'

function Public() {
    return <h3>Public</h3>;
}

const Login = withRouter(
    ({ history, ...props }) =>
          <button
            onClick={() => props.auth(() => history.push("/dayList")) }
          >
            Log in
          </button>
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
            <Login auth={rest.auth} />
          )
        }
      />
    );
}

function Roger({days, deleteDay}) {  

  
  return (
    <SkiDayList days={days} deleteDay={deleteDay} />
  );
}



export const AppRouter = ({auth, authState, daylist, signout, onNewDay, deleteDay, skiDayCount}) => {
    return (
      <Router>
        <div>
            <Menu authState={authState} />

            <Switch>    

                  <PrivateRoute 
                      authState={authState} 
                      path="/" exact 
                      component={() => <SkiDayCount skiDayCount={skiDayCount}/>}
                      />

                  <PrivateRoute 
                      auth={auth}                   
                      authState={authState} 
                      path="/addDay" exact 
                      component={() => <AddDayForm onNewDay={onNewDay}/>}
                      />

                  
                  
                  <PrivateRoute 
                      authState={authState}
                      signout={signout}
                      daylist={daylist} 
                      auth={auth} 
                      path="/logout" exact 
                      component={Logout} 
                      />  

                  <PrivateRoute 
                      auth={auth} 
                      authState={authState} 
                      path="/login" exact 
                      component={Login} />

                  <PrivateRoute
                      authState={authState}
                      auth={auth} 
                      path="/dayList" 
                      component={() => <Roger days={daylist} deleteDay={deleteDay} />}
                      />   

                  <Route component={Whoops404} />
                   
            </Switch>   
        </div>
      </Router>
    );
  }

