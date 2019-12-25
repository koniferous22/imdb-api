import React from 'react'

import Thumbnails from './Thumbnails'

import { search } from '../requests/requests'

import { processThumbnailData } from '../helper/functions'

const mediaTypes = {
	movie: {
		label: 'Movies'
	},
	tv: {
		label: 'TV Shows'
	}
}

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
		Object.keys(mediaTypes).forEach(mediaType => {
			this.state[mediaType] = []
		})

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		const processResultsByMediaType = results => type => processThumbnailData(type)(results.filter(result => result.media_type === type))


		this.setState({
			loading: true,
			message: 'Loading...'
		});

		search(this.state.value || '')
			.then(body => {
				//console.log(body.results)
				const results = processResultsByMediaType(body.results)
				Object.keys(mediaTypes).forEach(mediaType => {
					this.setState({
						[mediaType]: results(mediaType)
					}, () => {console.log(this.state)})
				})
				this.setState({
					loading: false,
					error: false
				}, () => {console.log(this.state)})

			})
			.catch(error => {
				this.setState({
					error: true,
					message: 'Unable to search for results'
				})
				console.error(error)
			})
	}

	render() {
		var content = <section/>
		if (this.state.error) {
			content = (
				<section>
					{this.state.message}
				</section>
			)
		} else if (this.state.loading) {
			content = (
				<section>
					{this.state.message}
				</section>
			)	
		} else {
			content = Object.keys(mediaTypes).map((mediaType, index) => <Thumbnails key={index} title={mediaTypes[mediaType].label} entries={this.state[mediaType]} />)
			content = <section>{content}</section>
		}

		return (
			<section>
				<h2>Search</h2>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.value} onChange={this.handleChange} />
					<input type="submit" value="Search" />
				</form>
				{content}
			</section>
		)
	}
}

export default Search
