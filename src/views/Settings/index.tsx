import React from "react";
import { useAuth } from "../../context/AuthProvider";

const Settings = () => {
    const { isAuthenticated } = useAuth();
    console.log("🚀 ~ file: index.tsx:6 ~ Settings ~ isAuthenticated:", isAuthenticated);
    return <div>Settings</div>;
};

export default Settings;
