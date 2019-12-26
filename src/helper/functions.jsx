// Used only for url translations
// when accessed Detail View, so that not 'movies/:movieid' is used, instead 'movie/:movieid'
const singularContentType = {
	movies: 'movie',
	tv: 'tv'
}
// extract from API results, should be common for /discover/movie /discover/tv /search/multi
// the type is not used from response, instead from the app, however should stay the same, since it is used as parameter in API requests
export const processThumbnailData = type => results => results.map(entry => ({
	id: entry.id,
	name: entry.name,
	title: entry.title,
	poster_path: entry.poster_path,
	type,
}))

// combine API results with translating content type, so that correct link is constructed
export const processThumbnailDataTranslateType = type => results => processThumbnailData(type)(results).map(entry => Object.assign(entry, {type: singularContentType[type]}))