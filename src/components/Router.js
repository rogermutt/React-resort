import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import { SkiDayList } from './SkiDayList'
import { AddDayForm } from './AddDayForm'
import { Menu } from './Menu'

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

// const Menu = () => {
//     return (
//     <nav>
//         <Link to="/public">Public Page |</Link>
//         <Link to="/protected"> Login |</Link>
//         <Link to="/logout"> Logout |</Link>
//         <Link to="/dayList"> Day List </Link>
//     </nav>
//     )
// }

export const AppRouter = ({auth, authState, daylist, signout, onNewDay, deleteDay}) => {
    return (
      <Router>
        <div>
            <Menu/>
            <Route path="/public" component={Public} />
            <Route path="/login" component={Login} />
            <PrivateRoute 
                authState={authState}
                signout={signout}
                daylist={daylist} 
                auth={auth} 
                path="/logout" 
                component={Logout} 
            />  

            <PrivateRoute 
                authState={authState} 
                path="/protected" 
                component={() => <AddDayForm onNewDay={onNewDay}/>}
            />

            <PrivateRoute 
                authState={authState}
                auth={auth} 
                path="/dayList"
                component={() => <SkiDayList days={daylist} deleteDay={deleteDay} />}
            />

        </div>
      </Router>
    );
  }

