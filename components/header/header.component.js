// The Header Component
// Creating this component to get the header and search bar

// Libraries
import React, { Component } from 'react';
import Link from 'next/link';

// Component
class Header extends Component {

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
            <div className={`bg-gray-2 px-6 py-6 w-full h-18 -mt-18`}>

                {/* Logo */}
                <Link href="/">

                    <div className="flex h-full items-center">
                    
                        {/* Add logo */}
                        <img src="/images/logo-trimmed.svg" className="block w-auto h-full cursor-pointer" alt="Grandeur Logo"/>

                        {/* And then add title */}
                        <div className="h-fit font-sans font-bold text-white-1 text-xl ml-4">Docs</div>

                    </div>
                    
                </Link>

            </div>
        );
    }
}

// Export the Component
export default Header;