export default function Watch({ data }) {
    if(data) {
        if(data.length == 0) {
            return (<h5>Sorry, but there are no available streams for this title.</h5>)
        } else {
            return data.map((item, index) => (
                <div key={index}>
                    <iframe height='720' width='1280' allowFullScreen={true} frameBorder="0" sandbox="allow-scripts allow-presentation" src={item.url} />
                    <h5>{item.title}</h5>
                </div>))
        }
    } else {
        return (<h5>Loading...</h5>)
    }
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