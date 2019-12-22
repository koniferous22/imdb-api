import React from 'react'

import appConfig from '../../appConfig'

const Category = props => {
	const imageEntries = props.entries.map((entry, index) => (
			<li key={index}>
				<img src={appConfig.TMDB_IMAGE_PATH + entry.poster_path} alt="Movie thumbnail"/>
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
