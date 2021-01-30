import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({data}) {
    
  return (
    <div className={styles.container}>
        {data.map((item, index) => (<div>{item.url}</div>))}
      <iframe height='720' width='1280' allowFullScreen={true} sandbox="allow-scripts" src="https://vidoo.streamango.to/e/rxdhss7wvjtt"/>
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`/api/watch/movie/pokemon-the-movie-volcanion-and-the-mechanical-marvel-2016`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {data}, // will be passed to the page component as props
  }
}