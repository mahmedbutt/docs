
// Functional component for embedding video in webm format
export default function Video({ src }) {

    // Return markdown
    return <video className={`rounded-sm my-6 not-prose w-full`} autoPlay loop muted playsInline>
        <source src={src} type="video/webm"/>
    </video>
}