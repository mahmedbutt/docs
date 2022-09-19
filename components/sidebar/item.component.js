import React from "react";

export default class Item extends React.Component {

    // Constructor
    constructor(props) {
        super(props);

        // Component State
        this.state = {
            show: false
        }
    }

    // Function to Determine State
    onClick = () => {
        this.setState({
            show: this.state.show ? false : true
        })
    }

    //Render
    render() {

        //Default Drop Down Hidden
        var dropclass = "hidden"
        // Drop Down Icon When Closed
        var drop = "block"
        
        if (this.state.show) {
            
            //Show Drop Down When Clicked
            var dropclass = "block"
            
            // Drop Down Icon When Open
            var drop = "hidden"  
        } 

        return <div>  

            <div onClick={this.onClick} className=" flex items-center my-2 cursor-pointer text-white-2 hover:text-white-1 duration-500 " >
            
                {/* Drop Down Close  */}
                <svg 
                    className={`${drop} mr-3 `} 
                    width="10" 
                    height="10" 
                    viewBox="0 0 10 10" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">

                    <path 
                        fillRule="evenodd" 
                        clipRule="evenodd" 
                        d="M3.00004 1.80357L6.43634 4.75L3.00004 7.69643L3.41656 8.5L7.79004 4.75L3.41656 1L3.00004 1.80357Z" 
                        fill="#8C8C8C"/>
                </svg>

                {/* Drop Down Open */}
                <svg 
                    className={`${dropclass} mr-3`} 
                    width="10" height="10" 
                    viewBox="0 0 10 10" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">

                    <path 
                        fillRule="evenodd" 
                        clipRule="evenodd" 
                        d="M8.34194 2.35502L5.39551 5.79132L2.44908 2.35502L1.64551 2.77154L5.39551 7.14502L9.14551 2.77154L8.34194 2.35502Z" 
                        fill="#8C8C8C"/>
                </svg>
            
                {/* Directory div */}
                <div className="font-medium text-base">{this.props.title}</div>

            </div>

            <div className={`${dropclass} ml-5`} > {this.props.children}</div>

        </div>
    }
}