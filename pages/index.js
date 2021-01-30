import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'


export default function Home({ data }) {
      const router = useRouter()

    const [query, setQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        router.push('/search/' + query)
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <label for="query">Search:</label>
                <input type="text" id="query" name="query" value={query} onChange={e => setQuery(e.target.value)}/>
                <input type="submit" value="Search"/>
            </form>
            {data.map((item, index) => (
                <div key={index}>
                    <a href={`/watch${item.link}`}>{item.title}</a>
                </div>))}
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