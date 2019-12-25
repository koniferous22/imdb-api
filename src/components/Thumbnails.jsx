import React from 'react'

import { Link } from 'react-router-dom'

import appConfig from '../appConfig'

const Thumbnails = props => {
	if (!props.entries || props.entries.length === 0) {
		return <section />
	}
	const imageEntries = props.entries.map((entry, index) => (
			<li key={index}>
				<Link to={'/' + entry.type + '/' + entry.id}>
					{
						entry.poster_path
							? <img src={appConfig.TMDB_THUMBNAIL_IMAGE_PATH + entry.poster_path} alt="Movie thumbnail"/>
							: <div>{entry.name}</div>
					}
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

export default Thumbnails
