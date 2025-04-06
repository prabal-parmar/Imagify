import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, { 
                    withCredentials: true 
                });
                
                if (response.data.loggedIn) {
                    setUser(response.data.user);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                } 
                else {
                //     logoutUser();
                 }
            } catch (error) {
                console.error("Error fetching user:", error);
                logoutUser();
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Logout Function
    const logoutUser = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setUser(null);
            localStorage.removeItem("user");
        }
    };
    
    return (
        <UserContext.Provider value={{ user, setUser, loading, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
