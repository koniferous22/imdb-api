import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

import '../styles/components/Arrow.css'

const Arrow = (props) => {
	const isRight = !!props.right
	const spanClassName = 'arrow ' + (isRight ? 'next' : 'prev')
	const icon = isRight ? faArrowAltCircleRight : faArrowAltCircleLeft
	return (
		<span className={spanClassName} onClick={props.onClick}>
			<FontAwesomeIcon icon={icon} size='3x'/>
		</span>
	);
}

export default Arrow