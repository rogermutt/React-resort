import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";


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

function AddDayForm() {
    return <h3>AddDayForm</h3>;
} 

function DayList() {
    return <h3>DayList</h3>;
} 

const Login = withRouter(
    ({ history, ...props }) =>
          <button
            onClick={() => props.auth(() => history.push("/")) }
          >
            Log in
          </button>
);

function PrivateRoute({component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            rest.authState ? (
            <Component {...props} />
          ) : (
            <Login auth={rest.auth} />
          )
        }
      />
    );
}

const Menu = () => {
    return (
    <nav>
        <Link to="/public">Public Page |</Link>
        <Link to="/protected"> Login |</Link>
        <Link to="/dayList"> Day List </Link>
    </nav>
    )
}

export const AppRouter = ({auth, authState}) => {
    return (
      <Router>
        <div>
            <Menu/>
            <Route path="/public" component={Public} />
            <Route path="/login" component={Login} />
            <PrivateRoute authState={authState} auth={auth} path="/protected" component={AddDayForm} />
            <PrivateRoute authState={authState} auth={auth} path="/dayList" component={DayList} />
        </div>
      </Router>
    );
  }