import React from 'react'
import '../components_css/sidebarbutton.css'
import { Link,useLocation } from "react-router-dom"
import { IconContext } from 'react-icons'


export default function Sidebarbutton(props) {
    let location = useLocation();
    let isActive= location.pathname === props.to;
    let btnClass= isActive ? "btn-body active" : "btn-body";
    return (
        <Link to={props.to}>
            {/* normally in the bootstrap only text is written here we are doing custom link(it is like a) */}
            <div className={btnClass}>
                {/* IconContext is imported to style the react icon */}
                <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
                    {/* btn-icon is dummy as the iconContext need to take a classname */}
                    {props.icon}
                    <p className='btn-title'>{props.title}</p>
                </IconContext.Provider>

            </div>
        </Link>
    )
}
