// The Sidebar Component
// Custom component to render sitemap and logo

// Libraries
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import cuid from "cuid";
import Item from './item.component';

// Functional component for route
function Route({title, path, emoji}){

    // Get router
    const router = useRouter();

    // Set active state
    const [ active, setActive ] = useState("text-white-2");
    
    // Determine active state
    useEffect(() => {

        // Update state
        router.asPath === path ? setActive("text-white-1") : setActive("text-white-2");
    }, [ router.asPath, path ])

    // Return the markdown
    return <Link key={cuid()} href={path}> 
            <div className= "flex cursor-pointer items-center my-2 text-white-2 text-base">

                {/* Add Emoji */}
                <div className="mr-1">{emoji}</div>

                {/* Add Title With Selected Class */}
                <div className={`${active}`}>{title}</div>
            </div>
    </Link>
}

// Component
class Sidebar extends React.Component {

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
    loop = (routes) => {

        // Array to store jsx of routes
        var processed = [];
        var pinned = [];

        // Loop over route
        for (var route of routes) {

            // If it is a file i.e. root node
            // Then simply convert it into right format
            if (route.meta) {

                // If File is Pinned or Not
                route.meta.pinned ? pinned.push(<Route key={cuid()} title={route.meta.title} path={route.path} emoji={route.meta.emoji}></Route>) : processed.push(<Route key={cuid()} title={route.meta.title} path={route.path}></Route>)
            }

            // If it is a directory, then we gotta do another
            else {
                // Render child paths
                var childs = this.loop(route.children);

                 // Concat pinned elements with main pinned array
                pinned = pinned.concat(childs.pinned);

                // pass to also tranform all the children
                processed.push(<Item title={route.key}>{childs.processed}</Item>)
            }
        }
        
        // Return routes markdown
        return {
            pinned,
            processed,
        }
    }

    // Render
    render() {
        // Render the childs in the divs
        // and give the page a structure
       var childs= this.loop(this.state.toc)
        return (
            <div className={`pl-10 my-8 w-full font-sans box-border flex flex-col items-start`}> 

                {/* Render TOC */}
                {childs.pinned}

                <div className="mb-4"></div>
                
                {/* Render TOC */}
                {childs.processed}
                
            </div>
        );
    }
}

// Export the Component
export default Sidebar;
