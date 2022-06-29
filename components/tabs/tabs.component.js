import { useState, useEffect } from "react";
import cuid from "cuid";

// To render item markdwon
function Item({ group, label, value, selected, set }) {

    // Define active state
    var [ active, setActive ] = useState("bg-gray-3")

    // Process childs to get items
    useEffect(() => {
 
        // Compare the value of selected item with the value of the current item
        value === selected ? setActive("bg-gray-3") : setActive("");
 
    }, [value, selected])

    // Function to change selected tab
    const update = () => {

        // Update state
        set(value);

        // Return if group is not provided
        if (!group) return;

        // Set state in local storage
        localStorage.setItem(group, value);

        // And triger storage event
        window.dispatchEvent(new StorageEvent("storage", { key: group, newValue: value }));

    }

    // Return markdown
    return <div onClick={update} className={`text-white-1 py-2 px-4 font-sans font-bold text-lg rounded-md cursor-pointer ${active} hover:bg-gray-3 transition-colors ease-in mr-2`}>{label}</div>
}

// Top level component to handle which tab to show
export default function Tabs({ children, group }) {

    // Define state to set items
    var [ items, setItems ] = useState([]);
    var [ selected, setSelected ] = useState("");

    // Process childs to get items
    useEffect(() => {

        // Make children iterable
        var childs = children ? Array.isArray(children) ? children : [children] : [];

        // Variable to store filtered children
        var items = [];

        // Loop over children
        for (var child of childs) {

            // We will filter the children of type item
            if (child.type.name === "Item") items.push({ value: child.props.value, label: child.props.label, jsx: child });
        }

        // Set items to update state
        setItems(items);

        // Read selected
        var selected = localStorage.getItem(group);

        // Set the first item as selected
        if (items.length > 0) setSelected(selected || items[0].value);

    }, [group, children]);

    // Listen to changes on storage
    useEffect(() => {

        // We are doing so to sync tabs across pages and even on same page
        window.addEventListener("storage", ({ key, newValue }) => key === group && newValue !== selected ? setSelected(newValue) : null);

    }, [selected, group]);

    // Return markdown
    return <div className={`flex flex-col rounded-lg my-6`}>

        {/* Items container */}
        <div className="w-full flex flex-wrap">

            {/* Render items */}
            { items.map( item => <Item key={cuid()} group={group} label={item.label} value={item.value} selected={selected} set={setSelected} />) }

        </div>

        {/* Now based on selected item, render the content */}
        <div className="w-full">

            {/* Inside a container */}
            { children ? Array.isArray(children) ? children.find( child => child.props.value === selected) : children.type.name === "Item" ? children : null : null }

        </div>

    </div>
}