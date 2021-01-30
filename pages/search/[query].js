import styles from '../../styles/Home.module.css'

export default function Search({ data }) {

    return (
        <div className={styles.container}>
            {data ? data.map((item, index) => (
                <div>
                    <a href={`/watch${item.link}`}>{item.title}</a>
                </div>)) : (<h5>Loading...</h5>)}
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