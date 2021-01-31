export default function Watch({ data }) {

    return(
        <div className='container'>
            {data ? (data.length == 0 ? (<h5>Sorry, but there are no available streams for this title.</h5>) : data.map((item, index) => (
                <div key={index}>
                    <h5>{item.title}</h5>
                    <iframe height='480' width='100%' allowFullScreen={true} frameBorder="0" sandbox="allow-scripts allow-presentation" src={item.url} />
                </div>))) : (<h5>Loading...</h5>)}
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