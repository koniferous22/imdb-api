import React from 'react'

import Carousel from './Carousel'

import { search } from '../requests/requests'

import { processThumbnailData } from '../helper/functions'

import '../styles/components/Search.css'

const mediaTypes = {
	/*
	Output media types, config only for carousel titles, when obtaining results
	other media types could include people, as they appear in search results from API as wells
	*/
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
		this.state = {
			// form input
			value: '',
			// attribute serves when displaying "No Results found", at first load, we don't want to display that (cuz it's annoying)
			// therefore it's set to true
			found: true
		};
		Object.keys(mediaTypes).forEach(mediaType => {
			this.state[mediaType] = []
		})

		// Event handlers for search input element
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

		// Async call
		search(this.state.value || '')
			.then(body => {
				const getResults = processResultsByMediaType(body.results)
				this.setState({
					found: false
				})
				Object.keys(mediaTypes).forEach(mediaType => {
					const extractedResults = getResults(mediaType)
					this.setState({
						// found state attribute, in case no results found, so that correct response is displayed
						found: this.state.found || extractedResults.length > 0,
						[mediaType]: extractedResults
					})
				})
				this.setState({
					loading: false,
					error: false
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
		// structure of this code is, in order to always render search bar (title, with for), then results
		// Possible to probably organize better with different component decomposition, but for now works
		var content = <section className="content"/>
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
		} else if (!this.state.found) {
			content = (
				<section>
					<h3 className="title">
						No results found
					</h3>
				</section>
			)
		} else {
			// map search results to carousels
			content = Object.keys(mediaTypes).map((mediaType, index) => 
				<Carousel
					key={index}
					title={mediaTypes[mediaType].label}
					entries={this.state[mediaType]}
					entriesPerSlide={this.props.entriesPerSlide}
				/>)
			content = <section>{content}</section>
		}

		return (
			<section className="content">
				<h3 className="title">Search</h3>
				<div className="searchBar">
					<form onSubmit={this.handleSubmit}>
						<input type="text" value={this.state.value} onChange={this.handleChange} />
						<input type="submit" value="Search" className="appButton searchButton"/>
					</form>
				</div>
				{content}
			</section>
		)
	}
}

export default Search
