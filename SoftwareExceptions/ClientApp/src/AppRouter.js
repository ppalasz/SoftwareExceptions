import React, { Component } from "react";
import { Layout } from "./components/Layout";
import { Test } from "./components/Test.js";
import { SoftExGrid } from "./components/SoftwareExceptions/SoftExGrid";
import { BrowserRouter as Router, Route,  Redirect  } from "react-router-dom"
//import { Provider } from 'react-redux'
//import store from './store'


export default class AppRouter extends Component {
  
  render () {
	return (
		
		<Router> 
			<Layout>
				<Route exact path="/" render={() => (<Redirect to="/software-exceptions" />)} />				
				<Route path="/software-exceptions/:page?" component={SoftExGrid} />		
				<Route path="/test/" component={Test} />				
			</Layout>
		</Router>
		
	);
  }
}
