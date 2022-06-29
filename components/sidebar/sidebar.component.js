// The Sidebar Component
// Custom component to render sitemap and logo

// Libraries
import React, { Component, useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import cuid from "cuid";

// Functional component for route
function Route({ title, path, depth }) {

    // Get router
    const router = useRouter();

    const [ active, setActive ] = useState("text-white-2");

    // Determine active state
    useEffect(() => {
        // Update state
        router.asPath === path ? setActive("text-white-1") : setActive("text-white-2");
    }, [ router.asPath, path ])

    // Return the markdown
    return <Link key={cuid()} href={path}><div className={`${active} text-base py-2 cursor-pointer`} style={{ marginLeft: `${ depth * 10 }px` }}>{title}</div></Link>

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
            <div className={`px-6 my-8 w-full box-border flex flex-col items-start`}>

                {/* Render TOC */}
                {this.toc(this.state.toc, 0)}

            </div>
        );
    }
}

// Export the Component
export default Sidebar;