import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Detail from './components/Detail'

function App() {
	return (
		<BrowserRouter>
			<div>
				<Switch>
					<Route exact path='/' render={() => <Dashboard/>}/>
					<Route path='/:type/:movieId' render={(routeProps) => <Detail type={routeProps.match.params.type} id={routeProps.match.params.movieId}/>}/>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
