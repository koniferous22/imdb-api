import appConfig from '../appConfig'


// Generalized api request, includes constructing url, so that requests down below are more readable, and self explanatory
function apiRequest(resource, options) {
	const urlOptsString = Object.keys(options).map(key => '&' + key + '=' + options[key]).join('')
	// Assuming get request only
	return fetch(appConfig.TMDB_API + resource + '?api_key=' + appConfig.TMDB_API_KEY + urlOptsString)
		.then(response => response.json())
}

// Movie Dashboard requests

export function getPopularMovies(page=1) {
	return apiRequest('/discover/movie', {
		language: "en-US",
		sort_by: "popularity.desc",
		page
	})
}

export function getFamilyMovies(page=1) {
	return apiRequest('/discover/movie', {
		language: "en-US",
		with_genres: appConfig.TMDB_FAMILY_GENRE_ID,
		sort_by: "popularity.desc",
		page
	})
}

export function getDocumentaryMovies(page=1) {
	return apiRequest('/discover/movie', {
		language: "en-US",
		with_genres: appConfig.TMDB_DOCUMENTARY_GENRE_ID,
		sort_by: "popularity.desc",
		page
	})
}

// TV Dashboard Requests

export function getPopularTvShows(page=1) {
	return apiRequest('/discover/tv', {
		language: "en-US",
		sort_by: "popularity.desc",
		page
	})
}

export function getFamilyTvShows(page=1) {
	return apiRequest('/discover/tv', {
		language: "en-US",
		with_genres: appConfig.TMDB_FAMILY_GENRE_ID,
		sort_by: "popularity.desc",
		page
	})
}

export function getDocumentaryTvShows(page=1) {
	return apiRequest('/discover/tv', {
		language: "en-US",
		with_genres: appConfig.TMDB_DOCUMENTARY_GENRE_ID,
		sort_by: "popularity.desc",
		page
	})
}

// Detail View Requests

export function getMovieDetails(movieId) {
	return apiRequest('/movie/' + movieId, {
		append_to_response: 'images,videos'
	})
}

export function getTvShowDetails(tvId) {
	return apiRequest('/tv/' + tvId, {
		append_to_response: 'images,videos'
	})
}

// Search request

export function search(query, page=1) {
	return apiRequest('/search/multi', {
		query,
		page
	})
}
