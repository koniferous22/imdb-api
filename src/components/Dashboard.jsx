import React from 'react'

import { getPopularMovies, getPopularTvShows, getFamilyMovies, getDocumentaryMovies } from '../requests/requests'

import Category from './dashboard/Category'

const dashboardConfig = {
	popularMovies: {
		title: 'Popular Movies',
		fetch: getPopularMovies,
		type: 'movie'
	},
	popularSeries: {
		title: 'Popular TV Series',
		fetch: getPopularTvShows,
		type: 'tv'
	},
	familyMovies: {
		title: 'Family',
		fetch: getFamilyMovies,
		type: 'movie'
	},
	documentaryMovies: {
		title: 'Documentary',
		fetch: getDocumentaryMovies,
		type: 'movie'
	}
}

class Dashboard extends React.Component {
	constructor() {
		super()
		this.state = {}
		Object.keys(dashboardConfig).forEach(category => {
			this.state[category] = []
		})
	}
	componentDidMount() {
		const processEntryData = (body, category) => body.results.map(entry => ({
			id: entry.id,
			title: entry.title,
			poster_path: entry.poster_path,
			type: dashboardConfig[category].type
		}))
		Object.keys(dashboardConfig).forEach(category => {
			dashboardConfig[category].fetch()
				.then(body => {
					this.setState({[category]: processEntryData(body, category)})
				})
				.catch(error => {
					this.setState({
						error: true,
						message: "Failed to load resources from the API"
					})
				})
		})
	}
	render() {
		if (this.state.error) {
			return (
				<section>
					{this.state.message}
				</section>
			)
		}
		const categories = Object.keys(dashboardConfig).map((category, index) => (
			<Category title={dashboardConfig[category].title} entries={this.state[category]} key={index}/>
		))
		return (
			<section>
				{categories}
			</section>
		)
	}
}

export default Dashboard;
