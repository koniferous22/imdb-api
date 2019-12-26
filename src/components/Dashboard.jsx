import React from 'react'

import { 
	getPopularMovies, 
	getFamilyMovies,
	getDocumentaryMovies,
	getPopularTvShows,
	getFamilyTvShows,
	getDocumentaryTvShows
} from '../requests/requests'

import { processThumbnailDataTranslateType } from '../helper/functions'

import Carousel from './Carousel'

// Since API has different resources for family and tv genres. I decided not to combine those (TV and movies)
// Instead I created 2 separate Dashboards, accessible by header
// dashboardConfig contains, configuration for both dashboards
const dashboardConfig = {
	movies: {
		// Carousel/Content category configuration
		// Contains: carousel Title + method to fetch & .json() resources
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
		Object.keys(dashboardConfig[props.type] || {}).forEach(category => {
			// Initialize all carousel data as empty array (better to work with than undefined or null)
			this.state[category] = []
		})
	}

	fetchData(type) {
		const processEntryData = processThumbnailDataTranslateType(type)
		// In case of fetching data for non-existing dashboards, if someone types sth else in URL
		if (!dashboardConfig[type]) {
			
			this.setState({
				error: true,
				message: "Invalid content type"
			})
			return;
		}
		
		this.setState({
			isLoading: true,
			message: 'Loading...'
		})

		Object.keys(dashboardConfig[type] || {}).forEach(category => {
			
			// This could be done with Promise.all as well
			dashboardConfig[type][category].fetch()
				.then(body => {
					this.setState({
						[category]: processEntryData(body.results),
						// disable both flags, so that results are rendered
						isLoading: false,
						error: false
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

	// Fetch data on Mount and Update

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
				<section className="content">
					{this.state.message}
				</section>
			)
		}
		if (this.state.isLoading) {
			return (
				<section className="content">
					{this.state.message}
				</section>
			)
		}
		const type = this.props.type
		// map fetched data do carousel
		const categories = Object.keys(dashboardConfig[type] || {}).map((category, index) => {
			return (
				<Carousel title={dashboardConfig[type][category].title} entries={this.state[category] || []} key={index} entriesPerSlide={this.props.entriesPerSlide}/>
			)
		})
		return (
			<section className="content">
				{categories}
			</section>
		)
	}
}

export default Dashboard;
	