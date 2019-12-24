import React from 'react'

import { 
	getPopularMovies, 
	getFamilyMovies,
	getDocumentaryMovies,
	getPopularTvShows,
	getFamilyTvShows,
	getDocumentaryTvShows
} from '../requests/requests'

import Category from './Category'

const dashboardConfig = {
	movies: {
		popularMovies: {
			title: 'Popular Movies',
			fetch: getPopularMovies
		},
		familyMovies: {
			title: 'Family',
			fetch: getFamilyMovies
		},
		documentaryMovies: {
			title: 'Documentary',
			fetch: getDocumentaryMovies
		}
	},
	tv: {
		popularTvSeries: {
			title: 'Popular TV Series',
			fetch: getPopularTvShows
		},	
		familyTvShows: {
			title: 'Family',
			fetch: getFamilyTvShows		
		},
		documentaryTvShows: {
			title: 'Documentary',
			fetch: getDocumentaryTvShows
		}
	}
	
	
}

class Dashboard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
		Object.keys(dashboardConfig[props.type]).forEach(category => {
			this.state[category] = []
		})
	}

	fetchData(type) {
		const processEntryData = (body, category) => body.results.map(entry => ({
			id: entry.id,
			title: entry.title,
			poster_path: entry.poster_path,
			type
		}))
		if (!dashboardConfig[type]) {
			this.setState({
				error: true,
				message: "Invalid content type"
			})
			return;
		}
		this.setState({
			loading: true,
			message: 'Loading...'
		})
		Object.keys(dashboardConfig[type]).forEach(category => {
			dashboardConfig[type][category].fetch()
				.then(body => {
					this.setState({
						[category]: processEntryData(body, category),
						loading: false
					})
				})
				.catch(error => {
					console.error(error)
					this.setState({
						error: true,
						message: "Failed to load resources from the API"
					})
				})
		})
	}

	componentDidMount() {
		this.fetchData(this.props.type)
	}

	componentDidUpdate(prevProps) {
		if (this.props.type !== prevProps.type) {
			this.fetchData(this.props.type)
		}
	}

	render() {
		
		if (this.state.error) {
			return (
				<section>
					{this.state.message}
				</section>
			)
		}
		if (this.state.loading) {
			return (
				<section>
					{this.state.message}
				</section>
			)
		}
		const type = this.props.type
		const categories = Object.keys(dashboardConfig[type]).map((category, index) => (
			<Category title={dashboardConfig[type][category].title} entries={this.state[category]} key={index}/>
		))
		return (
			<section>
				{categories}
			</section>
		)
	}
}

export default Dashboard;
	