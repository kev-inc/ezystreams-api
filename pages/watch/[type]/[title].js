import Head from 'next/head'
import { useState } from 'react'

export default function Watch({ data, current }) {

    const [now, setNow] = useState(current)

    let nowPlaying
    if (current) {
        nowPlaying = (
            <div>
                <h5>{now.name}</h5>
                <h5>{now.title}</h5>
                <iframe height='480' width='100%' allowFullScreen={true} frameBorder="0" sandbox="allow-scripts allow-presentation" src={now.url} />
            </div>
        )
    }
    let selections
    if (data) {
        if (data.length > 0) {
            selections = data.map((item, index) => (
                <button key={index} className='btn btn-light mr-2 mb-2 text-left' onClick={() => setNow(item)}>{item.title}</button>
            ))
        } else {
            selections = <h5>Sorry, but there are no available streams for this title.</h5>
        }
    } else {
        selections = <h5>Loading...</h5>
    }

    return (
        <div className='container'>
            <Head>
                <title>Watching '{now.name} {now.title}' | Ezystreams</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {nowPlaying}
            {selections}
        </div>
    )
}
Watch.getInitialProps = async (ctx) => {
    const { type, title } = ctx.query
    const res = await fetch(`https://ezystreams-api.vercel.app/api/watch/${type}/${title}`)
    const data = await res.json()
    const current = data.length > 0 ? data[0] : null
    return { data, current }
}