const singularContentType = {
	movies: 'movie',
	tv: 'tv'
}

export const processThumbnailData = type => results => results.map(entry => ({
	id: entry.id,
	name: entry.name,
	title: entry.title,
	poster_path: entry.poster_path,
	type,
}))

export const processThumbnailDataTranslateType = type => results => processThumbnailData(type)(results).map(entry => Object.assign(entry, {type: singularContentType[type]}))