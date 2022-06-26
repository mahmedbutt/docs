import '../styles/globals.css'
import Layout from '../components/layout';
import routes from './layout.json';

routes = routes.reverse();

function MyApp({ Component, pageProps }) {
  return <Layout routes={routes} ><Component {...pageProps} /></Layout>
}

export default MyApp
