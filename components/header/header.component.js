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
            <div className={`flex bg-gray-2 px-10 py-6 w-full h-12 -mt-12 flex-row justify-between grow`}>

                {/* Logo */}
                <Link href="/">

                    <div className="flex h-full w-fit cursor-pointer items-center">
                    
                        {/* Add logo */}
                        <img src="/images/logo-trimmed.svg" className="block h-7 " alt="Grandeur Logo"/>

                        {/* And then add title */}
                        <div className="h-fit font-sans font-bold text-white-1 text-xl ml-4">Docs</div>

                    </div>
                    
                </Link>

                    {/* Social Links */}
                    <div className="flex h-full w-fit cursor-pointer items-center" >

                        {/* Github Logo */}
                        <Link href="https://github.com/grandeurdev" >
                            <img src="/images/github.svg" className="block mr-6 opacity-60 hover:opacity-100 transition-opacity duration-500" alt="github Logo"/>
                        </Link>

                        {/* Discord logo */}
                        <Link href="https://discord.gg/3chd7Cj3aA" >
                            <img src="/images/discord.svg" className="block mr-6 opacity-60 hover:opacity-100 transition-opacity duration-500" alt="discord Logo"/>
                        </Link>

                        {/*  Twitter Logo */}
                        <Link href="https://twitter.com/grandeurdev" >
                            <img src="/images/twitter.svg" className="block mr-6 opacity-60 hover:opacity-100 transition-opacity duration-500" alt="twitter Logo"/>
                        </Link>

                        {/* Button */}
                        <Link href="https://www.grandeur.dev/" >

                            {/* Add Text */}
                            <div className="h-7 flex justify-around gap-x-2 min-w-max box-border px-3 py-1.5 rounded-sm text-base text-white-1 font-Whyte cursor-pointer transition-opacity duration-200 ease-in-out opacity-100 hover:opacity-90 bg-accent items-center"> 
                                Login

                                {/* Add Icon */}
                                <img src="/images/arow.svg" className=" h-3" alt="arrow"/>
                            </div>
                        </Link>
                        
                    </div>
            </div>
        );
    }
}

// Export the Component
export default Header;