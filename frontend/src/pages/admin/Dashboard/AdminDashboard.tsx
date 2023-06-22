import {Link} from "react-router-dom";

const AdminDashboard = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <p>You must have been assigned an Admin role.</p>
            <div className="flex-grow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default AdminDashboard