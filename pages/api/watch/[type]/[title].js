const rp = require('request-promise')
const $ = require('cheerio')
require('dotenv').config()

const vidoo = "https://vidoo.streamango.to/e/"

export default (req, res) => {
    const {
        query: { type, title },
    } = req
    const url = `${process.env.DOMAIN}/${type}/${title}`

    rp(url).then(html => {
        let list = []
        if (type == 'movie') {
            const id = $('div#server_list', html).attr('data-onlystream')
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

        res.status(200).json(list)
    })
        .catch(err => res.send(err))

}
