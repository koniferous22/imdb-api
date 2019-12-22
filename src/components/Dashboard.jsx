import React from 'react'

import appConfig from '../appConfig'

import { getPopularMovies } from '../requests/requests'

class Dashboard extends React.Component {
	constructor() {
		super()
		this.state = {
			popularMovies: []
		}
	}
	componentDidMount() {
		getPopularMovies()
			.then(body => {
				const popularMovies = body.results.map(entry => ({
					id: entry.id,
					title: entry.title,
					poster_path: entry.poster_path
				}))
				this.setState({popularMovies})
			})
	}
	render() {
		const popularMovies = this.state.popularMovies.map((entry, index) => (
			<li key={index}>
				<img src={appConfig.TMDB_IMAGE_PATH + entry.poster_path} alt="Movie thumbnail"/>
			</li>
		))
		return (
			<div>
				<ul>
					{popularMovies}
				</ul>
			</div>
		)
	}
}

export default Dashboard;
