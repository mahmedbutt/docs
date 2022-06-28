// Global styles
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import '../styles/prism.css';

// Core layout component
import Layout from './_layout';

function App({ Component, pageProps }) {
	// Wrap the page in layout and render
	return <Layout><Component {...pageProps} /></Layout>
}

export default App
