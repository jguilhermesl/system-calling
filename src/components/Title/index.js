import './style.css'

function Title({name, children}) {
    return (
        <div className="title">
            {children}
            <span>{name}</span>
        </div>
    )
}

export default Title;