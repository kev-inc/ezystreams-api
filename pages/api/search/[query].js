const rp = require('request-promise')
const $ = require('cheerio')
require('dotenv').config()

export default (req, res) => {
    const {
        query: { query },
    } = req
    const url = `${process.env.DOMAIN}/search-query/${query}`
    rp(url)
    .then(html => {
        let list = []
        $('li.movie-item', html).each((index, value)=>{
            const link = $('a', value).attr('href').replace(domain, '')
            const title = $('a', value).attr('title')
            const imgsrc = $('a > img', value).attr('src')
            list.push({title, link, imgsrc})
        })
        res.json(list)
    })
    .catch(err => res.send(err))
}
