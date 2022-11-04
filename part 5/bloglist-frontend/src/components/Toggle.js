import { useState, useImperativeHandle, forwardRef } from "react";

const Toggle = forwardRef((props, refs) => {
    const [visibility, setVisibility] = useState(true)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })


    return (
        <div>
            <button className={visibility ? '' : 'hidden'} onClick={toggleVisibility}>{props.buttonName}</button>
            <div className={visibility ? 'hidden' : ''}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})

export default Toggle