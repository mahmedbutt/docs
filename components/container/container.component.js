// The Container Component
// This component will provide the basic structure
// in which the content of the page will be place

// Libraries
import React, { Component } from 'react';

// Component
class Container extends Component {

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
            <div className={`md:pr-12 md:px-0 px-6 py-12 animate-fade-in w-full`}>

                {this.props.children}

            </div>
        );
    }
}

// Export the Component
export default Container;