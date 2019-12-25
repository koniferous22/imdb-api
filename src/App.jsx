import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import appConfig from './appConfig'

import Dashboard from './components/Dashboard'
import Detail from './components/Detail'
import Header from './components/Header'
import Search from './components/Search'

import './styles/App.css'

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			width: 0
		}
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth });
	}


	render() {
		const imageWidthWithMargin = appConfig.CAROUSEL_IMAGE_WIDTH + appConfig.CAROUSEL_IMAGE_MARGIN
		const entriesPerSlide = Math.max(Math.floor(this.state.width / imageWidthWithMargin), 1)
		return (
			<BrowserRouter>
				<div className='appGrid'>
					<Header />
					<Switch>
						<Route path='/search' render={(routeProps) => <Search entriesPerSlide={entriesPerSlide}/>} />
						<Route exact path='/:type' render={(routeProps) => <Dashboard type={routeProps.match.params.type} entriesPerSlide={entriesPerSlide}/>} />
						<Route path='/:type/:movieId' render={(routeProps) => <Detail type={routeProps.match.params.type} id={routeProps.match.params.movieId}/>}/>
						<Redirect from='/' to='/movies' />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
