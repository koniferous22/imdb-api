import React from 'react'
import { Link } from 'react-router-dom'

import appConfig from '../appConfig'

import '../styles/components/Slide.css'

/*
Pure component for images in carousel (single slide)
*/
const Slide = props => {

	return (
		<div className={props.display ? 'focus' : ''}>
		{/*display attribute determines if slide is rendered or nah*/}
			{
				props.images.map((image, index) => (
					<span key={index}>
						<Link to={'/' + image.type + '/' + image.id}>
							{
								image.poster_path
									? <img src={appConfig.TMDB_THUMBNAIL_IMAGE_PATH + image.poster_path} alt="Movie thumbnail"/>
									: <div className="noimage">{image.name}</div>
									/*div in case image is not present, not tested properly though*/
							}
						</Link>
					</span>
				))
			}
		</div>
	)
}

export default Slide