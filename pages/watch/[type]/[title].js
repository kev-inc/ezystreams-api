import styles from '../../../styles/Home.module.css'

export default function Watch({ data }) {

    return (
        <div className={styles.container}>
            {data ? data.map((item, index) => (
                <div>
                    <iframe height='720' width='1280' allowFullScreen={true} sandbox="allow-scripts" src={item.url} />
                    <h5>{item.title}</h5>
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
    const { type, title } = context.params
    const res = await fetch(`https://ezystreams-api.vercel.app/api/watch/${type}/${title}`)
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