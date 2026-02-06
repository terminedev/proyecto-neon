import { Link, Outlet } from "react-router-dom";
import { Logout } from 'components/public-content/access/Logout';

export default function Layout() {

    return (
        <>
            <header>
                <Link to="/">Home</Link>
                {/* <Seeker onSearch={handleSearch} /> */}
                <Logout />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
            </footer>
        </>
    );
};