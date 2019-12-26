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
		// Event handler for window resizing (for responsive Carousels)
		// Made global, so that works for both views, where carousels are used (Dashboard, Search)
		// Inspiration was taken from stack overflow (cannot find the post)
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
		// Calculate how many entries per carousel slide in Search and Dashboard view
		const imageWidthWithMargin = appConfig.CAROUSEL_IMAGE_WIDTH + appConfig.CAROUSEL_IMAGE_MARGIN
		const entriesPerSlide = Math.max(Math.floor((this.state.width - 2 * appConfig.CAROUSEL_ARROW_WIDTH) / imageWidthWithMargin), 1)
		return (
			<BrowserRouter>
			{/*Router wrapper*/}
				<div className='appGrid'>
				{/*App is with CSS3 Grid Layoud, for more details browse the styles*/}
					<Header />
					{/* Header/NavBar component*/}
					<Switch>
						<Route path='/search' render={(routeProps) => <Search entriesPerSlide={entriesPerSlide}/>} />
						<Route exact path='/:type' render={(routeProps) => <Dashboard type={routeProps.match.params.type} entriesPerSlide={entriesPerSlide}/>} />
						<Route path='/:type/:movieId' render={(routeProps) => <Detail type={routeProps.match.params.type} id={routeProps.match.params.movieId}/>}/>
						<Redirect from='/' to='/movies' />
						{/* redirect, so that by loading Movie dashboard is displayed, by default*/}
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
