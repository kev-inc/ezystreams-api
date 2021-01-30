import {getSearch} from '../api'
export default (req, res) => {
    const {
        query: { query },
    } = req
    getSearch(query)
        .then(data => res.json(data))
        .catch(err => res.send(err))
}
