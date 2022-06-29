import { useState, useEffect } from "react"

// Functional component for callout
export default function Callout({ emoji, type, children }) {

    // Set colours
    const [ style, setStyle ] = useState("bg-orange-200/10 text-orange-300");

    // Determine style 
    useEffect(() => {

        // Update state
        type === "warning" ? setStyle("border-warning") : type === "error" ? setStyle("border-danger") : setStyle("border-info")

    }, [ type ])

    // Return markdown
    return <div className={`${style} border flex rounded-sm my-6 not-prose pt-3 pb-2 w-full`}>

        {/* Render emoji */}
        <div className="pl-3 pr-2 select-none font-emoji">{emoji}</div>

        {/* Render content */}
        <div className="pr-4 text-white-1">{children}</div>

    </div>
}