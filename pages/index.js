import Head from 'next/head'
import { useState } from 'react'
import Image from 'next/image'

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
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <Image
                                src="/search.png"
                                alt="Search"
                                width={24}
                                height={24}
                            />
                        </span>
                    </div>
                    <input type="text" className='form-control custom-input' placeholder='Search' value={query} onChange={e => setQuery(e.target.value)} />
                </form>
            </div>
            <div className='row'>
                {data ? data.map((item, index) => (
                    <div key={index} className='col-md-3 col-sm-4 col-6 mb-2'>
                        <a href={`/watch${item.link}`}>
                            <img src={item.imgsrc} className='responsive' />
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