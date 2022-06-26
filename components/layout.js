import Link from "next/link"

export default function Layout({children, routes}) {
    
    // Render links
    const renderLinks = (subRoutes, deep) => {
        var processedRoutes = [];

        for (var route of subRoutes) {
            if (route.meta) processedRoutes.push(<div key={Date.now()} style={{ marginLeft: `${ deep * 10 }px` }}><Link href={route.path} >{route.meta.title}</Link></div>)
            else {
                processedRoutes.push(<div key={Date.now()} style={{ marginTop: "10px" }}>{route.key}</div>)
                processedRoutes.push(...renderLinks(route.children, deep + 1));
            }
        }

        return processedRoutes;

    }
    // Sidebar
    var sidebar = renderLinks(routes, 0);

    return <div style={{ width: "100%", height: "100%", display: "flex" }}>

        <div style={{ width: "20%", display: "flex", flexDirection: "column", margin: "20px" }}>

            {sidebar}

        </div>

        <div style={{ width: "80%", marginRight: "30px" }}> 

            {children}

        </div>

    </div>;
}    