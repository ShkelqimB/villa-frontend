import { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
    return (
        <Suspense fallback="loading">
            <Router>
                <Navigation />
            </Router>
        </Suspense>
    );
}

export default App;
