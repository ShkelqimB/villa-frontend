import { Routes, Route, Navigate } from "react-router-dom";
import routes from "../routes/routes";

// Components
import LandingScreen from "../views/LandingScreen";
import NoMatch from "./NoMatch";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthProvider";

const Navigation = () => {
    const { isAuthenticated } = useAuth();
    return (
        <>
            {isAuthenticated ? (
                <>
                    <Navbar />
                    <Routes>
                        {routes.AdminRoutes.map((prop, key) => {
                            const Element = prop.component;
                            return <Route path={prop.path} key={key} element={<Element />} />;
                        })}
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        {/* <Navigate from="/" to={"/home"} /> */}
                        {/* <Route path={"/"} element={routes.AdminRoutes[routes.AdminRoutes.length - 1].component} /> */}
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<LandingScreen />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            )}
        </>
    );
};

export default Navigation;
