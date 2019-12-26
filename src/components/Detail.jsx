import React from 'react'
import ShakaPlayer from 'shaka-player-react'

import 'shaka-player/dist/controls.css'

import appConfig from '../appConfig'

import { getMovieDetails, getTvShowDetails } from '../requests/requests'

import '../styles/components/Detail.css'

// Detail view
// I decided to include video view as well, since it relates to same topic, i.e. the browsed movie/tv show

class Detail extends React.Component {

	constructor() {
		super()
		this.state = {
			isLoading: true,
			video: false
		}
		// Event handler for video button
		this.onToggle = this.onToggle.bind(this)
	}

	componentDidMount() {
		// Sanity check if invalid content type was not passed from URL
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
			// Filter out unnecessary keys, so that we work with smaller object
			const filterRequiredKeys = ({genres, homepage, images, overview, popularity, poster_path, release_date, runtime, tagline, title }) => 
				({genres, homepage, images, overview, popularity, poster_path, release_date, runtime, tagline, title })
			this.setState({isLoading: true})
			// Async call
			getData(this.props.id)
				.then(body => {
					this.setState({
						...filterRequiredKeys(body),
						// disable both flags that fetched data is rendered
						// Could be implemented with Promise.all().then() construct
						isLoading: false,
						error: false
					})
				})
				.catch(error => {
					this.setState({
						error: true,
						message: 'Failed to load ' + (this.props.type || 'content') + ' detail-view',
						isLoading: false
					})
				})
		}
	}

	// Video Button event
	onToggle() {
		this.setState({video: !this.state.video})
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
					Loading...
				</section>
			)
		}
		if (this.state.video) {
			return (
				<section className="content">
					<div className="video-toolbar">
						<h3 className="title">
							{this.state.title}
						</h3>
						{/*Go Back button*/}
						<button className="appButton goBack" onClick={this.onToggle}>Back</button>
					</div>
					{/*Video could be rendered in a better fashion, but for now I decided not to spend hours with documentation, or browsing the video stylesheets*/}
					<ShakaPlayer autoPlay src={'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8'} width={1280} height={720} />
				</section>
			)
		}

		const releaseDate = new Date(this.state.release_date).toLocaleDateString('cs-CZ')
		const metadata = (
			<ul>
				{this.state.genres && <li>{'Genres: ' + this.state.genres.map(genre => genre.name).join(', ')}</li>}
				{/*Anchor tag is used instead of Link component, because Link treated the url as local + didnt want to type window.location here*/}
				{this.state.homepage && <li>{'Homepage: '}<a href={this.state.homepage}>{this.state.homepage}</a></li>}
				{this.state.popularity && <li>{'Popularity rating: ' + this.state.popularity}</li>}
				{this.state.release_date && <li>{'Release date: ' + releaseDate}</li>}
				{this.state.runtime && <li>{'Runtime: ' + this.state.runtime + ' minutes'}</li>}
			</ul>
		)
		// Use backdrop path, if no images are attached
		const image_path = this.state.images.backdrops.length > 0 ? this.state.images.backdrops[0].file_path : this.state.backdrop_path
		return (
			<section className="content detail-view">
				<div className="content-info-wrapper">
					<h3 className="title">
						{this.state.title}
					</h3>
					<section className="overview">
						{this.state.overview}
					</section>
					<section className="metadata">
						{metadata}
					</section>
					<section>
						<button className="appButton" onClick={this.onToggle}>Play Trailer</button>
					</section>
				</div>
				<div className="image-preview">
					{this.state.poster_path && <img src={appConfig.TMDB_DETAIL_IMAGE_PATH + image_path } alt="Movie poster" />}
				</div>
			</section>
		)
	}
}

export default Detail