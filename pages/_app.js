// Global styles
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import '../styles/prism.css';

// Import provider to pass custom components to mdx
import { MDXProvider } from '@mdx-js/react';

// Components to be passed to provider
import Callout from '../components/callout/callout.component';

// Core layout component
import Layout from './_layout';

function App({ Component, pageProps }) {
	// Wrap the page in layout and render
	return <MDXProvider components={ { Callout } }><Layout><Component {...pageProps} /></Layout></MDXProvider>
}

export default App
