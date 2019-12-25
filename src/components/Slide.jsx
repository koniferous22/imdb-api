import React from 'react'
import { Link } from 'react-router-dom'

import appConfig from '../appConfig'

import '../styles/components/Slide.css'

const Slide = props => {

	return (
		<div className={props.position}>
			{
				props.images.map((image, index) => (
					<span key={index}>
						<Link to={'/' + image.type + '/' + image.id}>
							{
								image.poster_path
									? <img className='image' src={appConfig.TMDB_THUMBNAIL_IMAGE_PATH + image.poster_path} alt="Movie thumbnail"/>
									: <div>{image.name}</div>
							}
						</Link>
					</span>
				))
			}
		</div>
	)
}

export default Slide