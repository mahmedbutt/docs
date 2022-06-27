// Import components
import Grid from '../components/grid/grid.component';
import Container from '../components/container/container.component';
import Sidebar from '../components/sidebar/sidebar.component';

// Get sitemap
import routes from './_data/layout.json';

// Export component
export default function Layout({children}) {

    // We will use the grid component to create page
    return <div className='absolute inset-0 bg-gray-1 w-full overflow-hidden'>

        <Grid columns={[{ xs: 0, sm: 3, md: 2, lg: 2 }, { xs: 12, sm: 9, md: 10, lg: 10 }]} pass={["", "overflow-x-hidden overflow-y-auto"]} height="full">

            {/* The first column is about the menu */}
            <Sidebar column={0} toc={routes} />

            {/* Second column is about the content that we want to render */}
            <Container column={1} >

                {/* Render children */}
                <article className="prose prose-sm prose-invert prose-headings:font-sans text-white-2">

                    {/* Use tailwind typography */}
                    {children}

                </article>

            </Container>

        </Grid>

    </div>
}    