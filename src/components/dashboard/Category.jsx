import React from 'react'

import { Link } from 'react-router-dom'

import appConfig from '../../appConfig'

const Category = props => {
	const imageEntries = props.entries.map((entry, index) => (
			<li key={index}>
				<Link to={'/' + entry.type + '/' + entry.id}>
					<img src={appConfig.TMDB_IMAGE_PATH + entry.poster_path} alt="Movie thumbnail"/>
				</Link>
			</li>
		))
	return (
		<section>
			<h3>
				{props.title}
			</h3>
			<ul>
				{imageEntries}
			</ul>
		</section>
	)
}

export default Category
