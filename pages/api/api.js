const rp = require('request-promise')
const $ = require('cheerio')
require('dotenv').config()
const domain = process.env.DOMAIN

const vidoo = "https://vidoo.streamango.to/e/"

export const getHome = () => {
    const url = domain + '/hdo/'
    return rp(url)
        .then(html => {
            var list = []
            $('li.movie-item', html).each((index, value) => {
                const link = $('a', value).attr('href').replace(domain, '')
                const title = $('a', value).attr('title')
                const imgsrc = $('a > img', value).attr('src')
                const quality = $('a > div.gr-quality', value).text()
                const eps = $('a > div.gr-eps', value).text()
                list.push({ title, link, imgsrc, quality, eps })
            })
            return list
        })
}

export const getSearch = (query) => {
    const parsed = query.replace(' ', '+')
    const url = `${domain}/search-query/${parsed}`
    console.log(url)
    return rp(url)
        .then(html => {
            let list = []
            $('li.movie-item', html).each((index, value) => {
                const link = $('a', value).attr('href').replace(domain, '')
                const title = $('a', value).attr('title')
                const imgsrc = $('a > img', value).attr('src')
                const quality = $('a > div.gr-quality', value).text()
                const eps = $('a > div.gr-eps', value).text()
                list.push({ title, link, imgsrc, quality, eps })
            })
            return list
        })
}

export const getLinks = (type, title) => {
    const url = `${domain}/${type}/${title}`

    return rp(url).then(html => {
        let list = []
        if (type == 'movie') {
            const id = $('div#server_list', html).attr('data-onlystream')
            if(id == "") {
                return []
            }
            const url = vidoo + id
            const title = $('ul#episodes-sv-7 > li.ep-item > div.sli-name', html).text()
            list.push({title, url})
        } else {
            $('ul#episodes-sv-7 > li.ep-item', html).each((index, value) => {
                const url = vidoo + $(value).attr('data-onlystream')
                const title = $('div.sli-name > a', value).attr('title')
                list.push({ title, url })
            })
        }
        return list
    })
}