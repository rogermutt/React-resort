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

// 	<Router history={hashHistory} >
//     <Route path="/" component={App} />
//     <Route path="list-days" component={App}>
//         <Route path=":filter" component={App} />
//     </Route>
//     <Route path="add-day" component={App} />
//     <Route path="members" component={App} />
//     <Route path="*" component={Whoops404} />
// </Router>


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

export const AppRouter = ({auth, authState, daylist, signout, onNewDay, deleteDay, skiDayCount}) => {
    return (
      <Router>
        <div>
            <Menu/>

            <Switch>
                          
                  <Route path="/login" exact component={Login} />
                  <PrivateRoute 
                      authState={authState}
                      signout={signout}
                      daylist={daylist} 
                      auth={auth} 
                      path="/logout" exact 
                      component={Logout} 
                      />  

                  <PrivateRoute 
                      authState={authState} 
                      path="/" exact 
                      component={() => <SkiDayCount skiDayCount={skiDayCount}/>}
                      />

                  <PrivateRoute 
                      authState={authState} 
                       path="/protected" exact 
                      component={() => <AddDayForm onNewDay={onNewDay}/>}
                      />

                  <PrivateRoute 
                      authState={authState}
                      auth={auth} 
                       path="/dayList" exact
                      component={() => <SkiDayList days={daylist} deleteDay={deleteDay} />}
                      />

                  <Route component={Whoops404} />
                     
            </Switch>   
        </div>
      </Router>
    );
  }

