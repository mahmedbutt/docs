// The basic Grid Component
// This component will be
// used to sort all the content

// Libraries
import React, { Component } from 'react';

// Component
class Grid extends Component {
    
    // Constructor
    constructor(props) {
        super(props);

        // Setup state of the component
        this.state = { 
            columns: null,
            placement: "fixed",
            height: "auto",
            px: 0,
            py: 0
        }
    }

    // Get Props
    static getDerivedStateFromProps(props,state) {
        // Handle props
        var padding = props.padding ? props.padding : {};

        return {
            columns: props.columns,
            pass: props.pass,
            placement: props.placement,
            height: props.height,
            px: padding.x ? padding.x : 0,
            py: padding.y ? padding.y : 0,
            className: props.className || ""
        }   
    }

    // Render
    render() { 
        // Using the columns property
        // we will setup the grid 

        if (this.state.placement === "auto") {
            // Render the childern directly into the grid
            // and let grid handle the placement and flow

            // Take the columns key from state
            var config = this.state.columns;

            // Now if an object was provided 
            if (typeof config !== "object") {
                // Then just define the xs column size
                config = {
                    xs: config,
                    sm: config,
                    md: config,
                    lg: config
                }
            }
            else {
                // Define for different screens
                config = {
                    xs: config.xs,
                    sm: config.sm,
                    md: config.md,
                    lg: config.lg
                }
            }

            return <div className={`grid grid-flow-row gap-3 grid-cols-${config.xs} sm:grid-cols-${config.sm} md:grid-cols-${config.md} lg:grid-cols-${config.lg} ${this.state.height === "full" ? "h-full" : ""} px-${this.state.px} py-${this.state.py} ${this.state.className}`}>
                
                {this.props.children}

            </div>
        }
        else {
            // Init the grid
            var grid = this.state.columns? this.state.columns.map(col => []) : null;

            // If grid is defined then
            if (grid) {
                // Loop over all the childern and assign them to respective columns
                this.props.children.forEach(child => child.props.column >= 0? grid[child.props.column].push(child) : null);
            }

            return <div className={`grid grid-flow-row gap-3 grid-cols-12 ${this.state.height === "full" ? "h-full" : ""} px-${this.state.px} py-${this.state.py} ${this.state.className}`}>
                {/* Render columns */}
                {
                    grid ? grid.map( (column, index) => {
                        // Get configurations
                        var config = this.state.columns[index];

                        // Setup config
                        if (typeof config !== "object") {
                            // Redefine config
                            config = {
                                xs: `col-span-${config}`,
                                sm: `sm:col-span-${config}`,
                                md: `md:col-span-${config}`,
                                lg: `lg:col-span-${config}`
                            }
                        }
                        else {
                            // Use config object for responsiveness
                            config = {
                                xs: config.xs ? `col-span-${config.xs}` : `hidden`,
                                sm: config.sm ? `${config.xs ? "" : "sm:block"} sm:col-span-${config.sm}` : "sm:hidden",
                                md: config.md ? `${config.sm ? "" : "md:block"} md:col-span-${config.md}` : "md:hidden",
                                lg: config.lg ? `${config.md ? "" : "lg:block"} lg:col-span-${config.lg}` : "lg:hidden",
                            }
                        }

                        // If pass prop is provided and an array
                        var className = Array.isArray(this.state.pass) ? this.state.pass[index] : "";

                        // Select a column in grid and align with Grid System
                        return <div className={`${config.xs} ${config.sm} ${config.md} ${config.lg} ${className}`} key={index}>
                            {/* Render content inside Grid div*/}
                            {column}
                        </div>
                    }) : []
                }
            </div>
        }
    }
}
// Render the component
export default Grid;