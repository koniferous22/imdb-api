import React from 'react'

import { Link } from 'react-router-dom'

const navigation = [
	{
		path: '/movies',
		label: 'Movies'
	},
	{
		path: '/tv',
		label: 'TV Shows'
	},
	{
		path: '/search',
		label: 'Search'
	},
]

class Header extends React.Component {
	render() {
		return (
			<nav>
				{navigation.map((navEntry, index) => (
					<Link key={index} to={navEntry.path}>{navEntry.label}</Link>
				))}
			</nav>
		)
	}
}

export default Header;
