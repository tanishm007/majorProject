import './navbar.css'

function NavBar() {
    return (
        <div className='navbar-container'> 
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary fll" style={{ width: "280px" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <svg className="bi pe-none me-2" width="40" height="32"><use href="#bootstrap"></use></svg>
                <span className="fs-4">Sidebar</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        <svg className="bi pe-none me-2" width="16" height="16"><use href="#home"></use></svg>
                        College Id
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-body-emphasis">
                        <svg className="bi pe-none me-2" width="16" height="16"><use href="#speedometer2"></use></svg>
                        Library Card
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-body-emphasis">
                        <svg className="bi pe-none me-2" width="16" height="16"><use href="#table"></use></svg>
                        Bus Card
                    </a>
                </li>
            
            </ul>
            <hr />
         
        </div>
        </div>
    )
}

export default NavBar;
