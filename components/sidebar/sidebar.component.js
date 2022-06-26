// The Sidebar Component
// Custom component to render sitemap and logo

// Libraries
import React, { Component } from 'react';
import Link from "next/link";

// Component
class Sidebar extends Component {

    // Constructor
    constructor(props) {
        super(props)

        // Component State
        this.state = {};
    }

    // Render
    render() {
        // Render the childs in the divs
        // and give the page a structure

        return (
            <div className={`bg-gray-2 px-6 py-12 w-full h-full box-border flex flex-col items-start`}>

                {/* Logo */}
                <Link href="/"><img src="/images/logo.svg" className="block w-auto h-6 cursor-pointer" alt="Grandeur"/></Link>

            </div>
        );
    }
}

// Export the Component
export default Sidebar;