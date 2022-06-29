import { useState, useEffect } from "react"

// Functional component for callout
export default function Callout({ emoji, type, children }) {

    // Set colours
    const [ style, setStyle ] = useState("bg-orange-200/10 text-orange-300");

    // Determine style 
    useEffect(() => {
        // Update state
        type === "warning" ? setStyle("bg-yellow-700/30 text-yellow-200") : 
        type === "error" ? setStyle("bg-red-600/30 text-red-200") :
        setStyle("bg-orange-200/10 text-orange-300")

    }, [ type ])

    // Return markdown
    return <div className={`${style} flex rounded-lg my-6 not-prose`}>

        {/* Render emoji */}
        <div className="pl-3 pr-2 py-2 select-none font-emoji">{emoji}</div>

        {/* Render content */}
        <div className="pr-4 py-2">{children}</div>

    </div>
}