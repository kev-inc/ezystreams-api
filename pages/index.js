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
            <div className='row'>
                <form onSubmit={handleSubmit}>
                    <label>Search:</label>
                    <input type="text" id="query" name="query" value={query} onChange={e => setQuery(e.target.value)} />
                    <input type="submit" value="Search" />
                </form>
            </div>
            <div className='row'>
                {data ? data.map((item, index) => (
                    <div key={index} className='col-3 mb-2'>
                        <a href={`/watch${item.link}`}>
                            <img src={item.imgsrc} />
                            <h5>{item.title}</h5>
                            <h6>{item.quality == "" ? item.eps : item.quality}</h6>
                            </a>
                        
                    </div>)) : (<h5>Loading...</h5>)}
            </div>
        </div>
    )
}

export async function getStaticProps(context) {
    const res = await fetch('https://ezystreams-api.vercel.app/api/home')
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { data }, // will be passed to the page component as props
    }
}