import { useState, useEffect } from "react"

// To render Item based on selected tab
export default function Item({ children }) {

    // Return markdown
    return <div className={`flex rounded-lg my-6`}>

        {children}

    </div>
}