import { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import { AuthProvider } from "./context/AuthProvider";

function App() {
    return (
        <Suspense fallback="loading">
            <AuthProvider>
                <Router>
                    <Navigation />
                </Router>
            </AuthProvider>
        </Suspense>
    );
}

export default App;
