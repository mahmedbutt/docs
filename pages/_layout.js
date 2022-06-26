// Import components
import Grid from '../components/grid/grid.component';
import Container from '../components/container/container.component';

// Export component
export default function Layout({children}) {

    // We will use the grid component to create page
    return <div className='absolute inset-0 bg-gray-1 w-full overflow-hidden'>

        <Grid columns={[1, 11]} pass={["", "overflow-x-hidden overflow-y-auto"]} height="full">

            {/* The first column is about the menu */}
            <div column={0}></div>

            {/* Second column is about the content that we want to render */}
            <Container column={1} >

                {/* Render children */}
                <article className="prose lg:prose-xl prose-invert">

                    {/* Use tailwind typography */}
                    {children}

                </article>

            </Container>

        </Grid>

    </div>
}    