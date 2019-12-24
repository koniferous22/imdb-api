import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Detail from './components/Detail'
import Header from './components/Header'
import Search from './components/Search'

function App() {
	return (
		<BrowserRouter>
			<div>
				<Header />
				<Switch>
					<Route path='/search' render={(routeProps) => <Search />} />
					<Route exact path='/:type' render={(routeProps) => <Dashboard type={routeProps.match.params.type} />} />
					<Route path='/:type/:movieId' render={(routeProps) => <Detail type={routeProps.match.params.type} id={routeProps.match.params.movieId}/>}/>
					<Redirect from='/' to='/movies' />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
