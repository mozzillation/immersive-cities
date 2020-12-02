export async function getAllCities() {
    const context = require.context('../../_cities', false, /\.yml$/)
    const posts = []
    for (const key of context.keys()) {
        const post = key.slice(2)
        const content = await import(`../../_cities/${post}`)
        posts.push({
            slug: post.replace('.yml', ''),
            title: content.title,
            color: content.color,
            'it-IT': content['it-IT'],
            'en-GB': content['en-GB']
        })
    }
    return posts
}

export async function getCityBySlug(slug) {
    const city = await import(`../../_cities/${slug}.yml`)
    return {
        slug: slug,
        color: city.color,
        title: city.title,
        authors: city.authors,
        audio: city.audio,
        'it-IT': city['it-IT'],
        'en-GB': city['en-GB']
    }
}

export async function getAllArtists() {
    const context = require.context('../../_artists', false, /\.yml$/)
    const posts = []
    for (const key of context.keys()) {
        const post = key.slice(2)
        const content = await import(`../../_artists/${post}`)
        posts.push({
            slug: post.replace('.yml', ''),
            firstName: content.firstName,
            lastName: content.lastName,
            portrait: content.portrait
        })
    }
    return posts
}

export async function getArtistBySlug(slug) {
    const artist = await import(`../../_artists/${slug}.yml`)
    return {
        slug: slug,
        firstName: artist.firstName,
        lastName: artist.lastName,
        portrait: artist.portrait,
        website: artist.website,
        'it-IT': artist['it-IT'],
        'en-GB': artist['en-GB']
    }
}

export async function getMore(slug) {
    const more = await import(`../../_more/${slug}.yml`)
    return {
        title: more.title,
        'it-IT': more['it-IT'],
        'en-GB': more['en-GB']
    }
}
