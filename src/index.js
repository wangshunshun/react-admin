import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';


import Layout from './component/layout/index.js';
// 页面
import Home from './page/home/index.js';
import Login from './page/login/index.js';
import ProductRouter from './page/product/router.js';

class App extends React.Component{
	render(){
		let LayoutRouter=(
			<Layout>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/product" component={ProductRouter}/>
				</Switch>
			</Layout>
		)
		return(
			<Router>
				<Switch>
					<Route path="/login" component={Login}/>
					<Route path="/" render={ props => LayoutRouter}/>
				</Switch>
			</Router>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
