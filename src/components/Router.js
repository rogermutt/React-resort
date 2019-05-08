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
import { SignUpForm } from './SignUp'
import { MemberList } from './MemberList'
import { AddDayForm } from './AddDayForm'
import { Menu } from './Menu'
import { Whoops404 } from './Whoops404'

const LoginWrapper = withRouter(
    ({ history, ...props }) => {
      return <LoginForm auth={props.auth} history={history} />
    }
);

const SignUpWrapper = withRouter(
  ({ history, ...props }) => {    
    return <SignUpForm auth={props.auth} history={history} />
  }
);

const AddDayWrapper = withRouter(
  ({ history, ...props }) => {    
    return <AddDayForm onNewDay={props.onNewDay} history={history}/>
  }
)

const PreviewWrapper = withRouter(
  ({ history, ...props }) => {    
    return <PreviewForm onNewDay={props.onNewDay} history={history}/>
  }
)


const Logout = withRouter(
    ({ history, ...props }) =>
          <button
            onClick={() => props.signout(() => history.push("/")) }
          >
            Log out
          </button>
);


function PreviewRoute({component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>    
         <PreviewWrapper auth={rest.auth} onNewDay={rest.onNewDay} />
      }
    />
  );
}

function AddDayRoute({component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>    
         <AddDayWrapper auth={rest.auth} onNewDay={rest.onNewDay} />
      }
    />
  );
}

function SignUpRoute({component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>      
          <SignUpWrapper auth={rest.auth} />
      }
    />
  );
}

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

                  <SignUpRoute
                      auth={auth}                   
                      authState={authState} 
                      path="/signup" exact 
                      component={() => <SignUpWrapper/> }
                      />

                  <PrivateRoute 
                      authState={authState} 
                      path="/overview" exact 
                      component={() => <SkiDayCount skiDayCount={skiDayCount}/>}
                      />
                      
                  <AddDayRoute                  
                      authState={authState} 
                      onNewDay={onNewDay}
                      path="/addDay" exact 
                      component={() => <AddDayWrapper />}
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

                  <PrivateRoute
                      authState={authState}
                      path="/members" 
                      component={() => <MemberList />}
                      />  

                  <Route component={Whoops404} />
                   
            </Switch>   
        </div>
      </Router>
    );
  }