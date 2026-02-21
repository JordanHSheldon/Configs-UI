import {useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import './auth.css'

export default function Auth() {
    const navigate = useNavigate();
    const [cookies] = useCookies(['user']);

    useEffect(() => {
        if (cookies?.user) navigate("/");
    }, [cookies, navigate]);
  
    return (
        <div className="auth-container">
            <h1>Login</h1>
            <div>
                <a className="login-button discord" href={import.meta.env.VITE_API_URL+"api/user/DiscordLogin"}>
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/discord.svg" alt="Discord" />
                Login with Discord
                </a>
            </div>
            <div>
                <a className="login-button steam" href={import.meta.env.VITE_API_URL+"api/user/SteamLogin"}>
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/steam.svg" alt="Steam" />
                Login with Steam
                </a>
            </div>
        </div>
    );
}
