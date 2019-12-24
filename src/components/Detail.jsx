import React from 'react'
import ShakaPlayer from 'shaka-player-react'

import 'shaka-player/dist/controls.css'

import appConfig from '../appConfig'

import { getMovieDetails, getTvShowDetails } from '../requests/requests'


class Detail extends React.Component {

	constructor() {
		super()
		this.state = {
			isLoading: true,
			video: false
		}
		this.onToggle = this.onToggle.bind(this)
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
			const filterRequiredKeys = ({genres, homepage, images, overview, popularity, poster_path, release_date, runtime, tagline, title }) => 
				({genres, homepage, images, overview, popularity, poster_path, release_date, runtime, tagline, title })
			this.setState({isLoading: true})
			getData(this.props.id)
				.then(body => {
					console.log(body)
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

	onToggle() {
		this.setState({video: !this.state.video})
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
		if (this.state.video) {
			return (
				<section>
					<h4>
						{this.state.title}
					</h4>
					<ShakaPlayer autoPlay src={'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8'} width={1280} height={720} />
					<button onClick={this.onToggle}>Back</button>
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
		const image_path = this.state.images.posters.length > 0 ? this.state.images.backdrops[0].file_path : this.state.backdrop_path
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
					<button onClick={this.onToggle}>Play Trailer</button>
				</section>
				{this.state.poster_path && <img src={appConfig.TMDB_DETAIL_IMAGE_PATH + image_path } alt="Movie poster" />}
			</section>
		)
	}
}

export default Detail