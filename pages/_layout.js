// Import components
import Grid from '../components/grid/grid.component';
import Container from '../components/container/container.component';
import Sidebar from '../components/sidebar/sidebar.component';
import Header from '../components/header/header.component';

// Get sitemap
import routes from './_data/layout.json';

// Export component
export default function Layout({children}) {

    // We will use the grid component to create page
    return <div className='absolute inset-0 bg-gray-1 w-full h-full pt-12 overflow-hidden'>

        {/* Our header */}
        <Header />

        {/* Grid to help us create layout for sidebar and content */}
        <Grid columns={[{ xs: 0, sm: 4, md: 3, lg: 3 }, { xs: 12, sm: 8, md: 9, lg: 9 }]} pass={["overflow-y-auto", "overflow-y-auto"]} height="full">

            {/* The first column is about the menu */}
            <Sidebar toc={routes} column={0} />

            {/* Second column is about the content that we want to render */}
            <Container column={1} >

                {/* Render children */}
                <article className="prose prose-sm prose-invert prose-headings:font-sans prose-headings:tracking-normal prose-li:list-['–'] prose-li:marker:text-white-1 text-white-2 px-12 py-10 rounded-md max-w-3xl antialiased">

                    {/* Use tailwind typography */}
                    {children}

                </article>

            </Container>

        </Grid>

    </div>
}    