import React from 'react'
import { Link } from 'react-router-dom'

import appConfig from '../appConfig'

import { getMovieDetails, getTvShowDetails } from '../requests/requests'


class Detail extends React.Component {

	constructor() {
		super()
		this.state = {isLoading: true}
	}

	componentDidMount() {
		var getData = null
		const type = this.props.type
		switch (type) {
			case 'movie':
				getData = getMovieDetails
				break
			case 'tv':
				getData = getTvShowDetails
				break
			default:
				getData = null
		}
		if (getData) {
			const filterRequiredKeys = ({poster_path, genres, homepage, overview, popularity, release_date, runtime, tagline, title }) => 
				({poster_path, genres, homepage, overview, popularity, release_date, runtime, tagline, title })
			this.setState({isLoading: true})
			getData(this.props.id)
				.then(body => {
					this.setState({
						...filterRequiredKeys(body),
						isLoading: false
					})
				})
				.catch(error => {
					this.setState({
						error: true,
						message: 'Failed to load ' + (this.props.type || 'content') + ' detail',
						isLoading: false
					})
				})
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
		if (this.state.isLoading) {
			return (
				<section>
					Loading...
				</section>
			)
		}
		const releaseDate = new Date(this.state.release_date).toLocaleDateString()
		const metadata = (
			<ul>
				{this.state.genres && <li>{'Genres: ' + this.state.genres.map(genre => genre.name).join(', ')}</li>}
				{this.state.homepage && <li>{'Homepage: '}<Link to={this.state.homepage}>{this.state.homepage}</Link></li>}
				{this.state.popularity && <li>{'Popularity rating: ' + this.state.popularity}</li>}
				{this.state.release_date && <li>{'Release date: ' + releaseDate}</li>}
				{this.state.runtime && <li>{'Runtime: ' + this.state.runtime}</li>}
			</ul>
		)
		return (
			<section>
				<h4>
					{this.state.title}
				</h4>
				<section>
					{this.state.overview}
				</section>
				<section>
					{metadata}
				</section>
				<section>
					Play Button
				</section>
				{this.state.poster_path && <img src={appConfig.TMDB_IMAGE_PATH + this.state.poster_path} alt="Movie poster" />}
			</section>
		)
	}
}

export default Detail