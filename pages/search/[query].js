import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Search({ data, query }) {
    const [search, setSearch] = useState(query)

    const handleSubmit = (e) => {
        e.preventDefault()
        window.location.href = '/search/' + search
    }

    return (
        <div className='container'>
            <Head>
                <title>Search '{search}' | Ezystreams</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='row'>
                <form onSubmit={handleSubmit} class="input-group my-3">
                    <input type="text" className='form-control' placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
                    <div class="input-group-append">
                        <input class="btn btn-secondary" type="submit" value="Search" />
                    </div>
                </form>
            </div>
            <div className='row'>
                {data ? (data.length == 0 ? (<h5>No results found</h5>) : data.map((item, index) => (
                    <div key={index} className='col-md-3 col-sm-4 col-6 mb-2'>
                        <a href={`/watch${item.link}`}>
                            <img src={item.imgsrc} />
                            <h5>{item.title}</h5>
                            <h6>{item.quality == "" ? item.eps : item.quality}</h6>
                        </a>

                    </div>))) : (<h5>Loading...</h5>)}
            </div>
        </div>
    )
}
Search.getInitialProps = async (ctx) => {
    const { query } = ctx.query
    const res = await fetch(`https://ezystreams-api.vercel.app/api/search/${query}`)
    const data = await res.json()
    return { data, query }
}