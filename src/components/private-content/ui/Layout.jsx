import { Link } from "react-router-dom";
import { Seeker } from 'components/private-content/ui/Seeker';
import { Logout } from 'components/public-content/access/Logout';

export default function Layout() {

    return (
        <>
            <header>
                <Link to="/">Home</Link>
                <Seeker />
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
