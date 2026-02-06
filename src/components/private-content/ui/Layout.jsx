import { Link, Outlet } from "react-router-dom";
import Logout from 'components/public-content/access/Logout';
import styles from 'styles/Layout.module.css';

export default function Layout() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/">Home</Link>
                <h1>Proyecto Neón</h1>
                <div className={styles.navLinks}>
                    <Logout />
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}