import appConfig from '../appConfig'

function apiRequest(resource, options) {
	const urlOptsString = Object.keys(options).map(key => '&' + key + '=' + options[key]).join('')
	// Assuming get request only
	return fetch(appConfig.TMDB_API + resource + '?api_key=' + appConfig.TMDB_API_KEY + urlOptsString)
			.then(response => response.json())
}


export function getPopularMovies(page=1) {
	return apiRequest('/discover/movie', {
		language: "en-US",
		sort_by: "popularity.desc",
		page
	})
}
