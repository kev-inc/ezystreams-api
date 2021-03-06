import Head from 'next/head'
import { useState } from 'react'

export default function Watch({ data, current }) {

    const [now, setNow] = useState(current)

    let nowPlaying
    if (current) {
        nowPlaying = (<div className='video-wrapper'>
            <iframe className='responsive-iframe' allowFullScreen={true} frameBorder="0" sandbox="allow-scripts allow-presentation" src={now.url} />
        </div>

        )
    }
    let selections
    if (data['list']) {
        if (data['list'].length > 0) {
            selections = <div>
                <h5>{now.title}</h5>
                {data['list'].map((item, index) => (
                    <button key={index} className={`btn btn-sm btn-${now.url == item.url ? 'warning' : 'light'} mr-2 mb-2 text-left `} onClick={() => setNow(item)}>{item.title}</button>
                ))}
            </div>

        } else {
            selections = <h5>Sorry, but there are no available streams for this title.</h5>
        }
    } else {
        selections = <h5>Loading...</h5>
    }

    return (
        <div className='container'>
            <Head>
                <title>Watching '{data.name} {now ? now.title : ""}' | Ezystreams</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {nowPlaying}
            <div className='d-flex my-2'>
                <div>
                    <img src={data.img} className='responsive' />
                </div>
                <div className='flex-grow-1 ml-3'>
                    <h4>{data.name}</h4>
                    {selections}
                </div>
            </div>

        </div>
    )
}
Watch.getInitialProps = async (ctx) => {
    const { type, title } = ctx.query
    const res = await fetch(`https://ezstreams.vercel.app/api/watch/${type}/${title}`)
    const data = await res.json()
    const current = data['list'].length > 0 ? data['list'][0] : null
    return { data, current }
}