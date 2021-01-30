const rp = require('request-promise')
const $ = require('cheerio')
require('dotenv').config()

export default (req, res) => {
    const url = process.env.DOMAIN + '/hdo/'
    rp(url)
    .then(html => {
        var list = []
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
