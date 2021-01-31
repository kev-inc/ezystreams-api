import Head from 'next/head'
import { useState } from 'react'

export default function Home({ data }) {

    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        window.location.href = '/search/' + query
    }
    return (
        <div className='container'>
            <Head>
                <title>Home | Ezystreams</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='row'>
                <form onSubmit={handleSubmit} class="input-group my-3">
                    <input type="text" className='form-control' placeholder='Search' value={query} onChange={e => setQuery(e.target.value)} />
                    <div class="input-group-append">
                        <input class="btn btn-secondary" type="submit" value="Search" />
                    </div>
                </form>
            </div>
            <div className='row'>
                {data ? data.map((item, index) => (
                    <div key={index} className='col-md-3 col-sm-4 col-6 mb-2'>
                        <a href={`/watch${item.link}`}>
                            <img src={item.imgsrc} height='278' width='185'/>
                            <h5>{item.title}</h5>
                            <h6>{item.quality == "" ? item.eps : item.quality}</h6>
                        </a>

                    </div>)) : (<h5>Loading...</h5>)}
            </div>
        </div>
    )
}
Home.getInitialProps = async (ctx) => {
    const res = await fetch('https://ezystreams-api.vercel.app/api/home')
    const data = await res.json()
    return { data }
}