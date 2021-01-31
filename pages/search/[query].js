import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Search({ data }) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        window.location.href = '/search/' + query
    }

    return (
        <div className='container'>
            <div className='row'>
                <form onSubmit={handleSubmit} class="input-group my-3">
                    <input type="text" className='form-control' placeholder='Search' value={query} onChange={e => setQuery(e.target.value)} />
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
export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}
export async function getStaticProps(context) {
    const { query } = context.params
    const res = await fetch(`https://ezystreams-api.vercel.app/api/search/${query}`)
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