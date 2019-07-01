import React ,{Component}from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, hashHistory ,Switch,Redirect} from 'react-router-dom';
import UserAddPage from './pages/UserAdd';
import HomePage from './pages/Home';

class App extends Component {
    render() {
        return (
            <Router >
            {/* // <Router history={ hashHistory}> */}
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/user" component={HomePage}/>
                    <Route path="/user/add" component={UserAddPage}/>
                    {/* <Route render={() => <Redirect to="/user" />}></Route> */}
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
