import {getLinks} from '../../api'
export default (req, res) => {
    const {
        query: { type, title },
    } = req
    getLinks(type, title)
        .then(data => res.status(200).json(data))
        .catch(err => res.send(err))

}
