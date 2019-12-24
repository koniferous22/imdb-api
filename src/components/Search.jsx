import React from 'react'

import Category from './Category'

import { search } from '../requests/requests'

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

		const getResultsByMediaType = results => type => results.filter(result => result.media_type === type)


		this.setState({
			loading: true,
			message: 'Loading...'
		});

		search(this.state.value || '')
			.then(body => {
				console.log(body)
				const filterResults = getResultsByMediaType(body.results)
				Object.keys(mediaTypes).forEach(mediaType => {
					this.setState({
						[mediaType]: filterResults(mediaType)
					})
				})
				this.setState({
					loading: false
				})

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
			content = Object.keys(mediaTypes).map((mediaType, index) => <Category key={index} title={mediaTypes[mediaType].label} entries={this.state[mediaType]} />)
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
