import {getHome} from './api'
export default (req, res) => {
    getHome()
        .then(data => res.json(data))
        .catch(err => res.send(err))

}
