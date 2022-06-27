// The Sidebar Component
// Custom component to render sitemap and logo

// Libraries
import React, { Component } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import cuid from "cuid";

// Functional component for route
function Route({ title, path, depth }) {

    // Get router
    const router = useRouter();

    // Determine active state
    var active = router.asPath === path ? "text-white-1" : "text-white-2"

    // Return the markdown
    return <div key={cuid()} className={`${active} text-base py-2 cursor-pointer`} style={{ marginLeft: `${ depth * 10 }px` }}>{title}</div>

}

// Component
class Sidebar extends Component {

    // Constructor
    constructor(props) {
        super(props)

        // Component State
        this.state = {
            toc: []
        };
    }

    // Get Props
    static getDerivedStateFromProps(props,state) {

        return {
            toc: Array.isArray(props.toc) ? props.toc : []
        }   
    }

    // Render TOC
    toc(routes, depth) {

        // Array to store jsx of routes
        var processed = [];

        // Loop over route
        for (var route of routes) {

            // If it is a file i.e. root node
            // Then simply convert it into right format
            if (route.meta) processed.push(<Route key={cuid()} title={route.meta.title} depth={depth} path={route.path} />)
            else {
                // If it is a directory, then we gotta do another
                // pass to also tranform all the children
                processed.push(<div key={cuid()} className="mt-5 text-white-2 text-base">{route.key}</div>)
                processed.push(...this.toc(route.children, depth + 1));
            }

        }

        // Return routes markdown
        return processed;
    }

    // Render
    render() {
        // Render the childs in the divs
        // and give the page a structure

        return (
            <div className={`bg-gray-2 px-6 py-12 w-full h-full box-border flex flex-col items-start`}>

                {/* Logo */}
                <Link href="/"><img src="/images/logo.svg" className="block w-auto h-6 cursor-pointer" alt="Grandeur Logo"/></Link>

                {/* Render TOC */}
                <div className='mt-10 overflow-x-hidden overflow-y-auto'>{this.toc(this.state.toc, 0)}</div>
                

            </div>
        );
    }
}

// Export the Component
export default Sidebar;