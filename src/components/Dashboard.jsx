import React from 'react'

import { getPopularMovies, getPopularTvShows, getFamilyMovies, getDocumentaryMovies } from '../requests/requests'

import Category from './dashboard/Category'

const dashboardConfig = {
	popularMovies: {
		title: 'Popular Movies',
		fetch: getPopularMovies
	},
	popularSeries: {
		title: 'Popular TV Series',
		fetch: getPopularTvShows
	},
	familyMovies: {
		title: 'Family',
		fetch: getFamilyMovies
	},
	documentaryMovies: {
		title: 'Documentary',
		fetch: getDocumentaryMovies
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
		const filterRequiredEntryData = body => body.results.map(entry => ({
			id: entry.id,
			title: entry.title,
			poster_path: entry.poster_path
		}))
		Object.keys(dashboardConfig).forEach(category => {
			dashboardConfig[category].fetch().then(body => {
				this.setState({[category]: filterRequiredEntryData(body)})
			})
		})
	}
	render() {
		console.log(this.state)
		const categories = Object.keys(dashboardConfig).map((category, index) => (
			<Category title={dashboardConfig[category].title} entries={this.state[category]} key={index}/>
		))
		return (
			<div>
				{categories}
			</div>
		)
	}
}

export default Dashboard;
