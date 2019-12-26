import React from 'react'

import { Link } from 'react-router-dom'

import '../styles/components/Header.css'

// NavBar configuration
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

// Header is pure component with no extra logic/lifecycle
const Header = props => {
	return (
		<header>
			{}
			<h2>24i task assignment</h2>
			<nav>
				{navigation.map((navEntry, index) => (
					<Link key={index} to={navEntry.path}>{navEntry.label}</Link>
				))}
			</nav>
		</header>
	)
}

export default Header;
