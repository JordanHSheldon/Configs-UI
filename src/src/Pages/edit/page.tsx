import {useEffect, useState } from "react";
import { Peripheral, ProfileType } from "../../lib/definitions";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner/spinner";
import './edit.css'

export default function Edit() {
    const navigate = useNavigate();
    const [cookies] = useCookies(['user']);
    const [peripherals, setPeripherals] = useState<Peripheral[] | null>(null);
    const [profile, setProfile] = useState<ProfileType | null>(null);
    const [mouse, setMouse] = useState(profile?.mouse ?? "");
    const [mousePad, setMousePad] = useState(profile?.mousePad ?? "");
    const [keyboard, setKeyboard] = useState(profile?.keyBoard ?? "");
    const [headset, setHeadset] = useState(profile?.headSet ?? "");
    const [monitor, setMonitor] = useState(profile?.monitor ?? "");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (!cookies?.user) {
            navigate("/");
        }
        
        GetPeripherals();
        GetProfileData(cookies?.user);
    }, [cookies, navigate]);

    if (isLoading) return <div><Spinner /></div>;
    if (!profile) return <p>No data, check back later</p>
  
    async function GetProfileData(token: string): Promise<void> {
        setLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL+'api/Data/GetUserProfile', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const profileData: ProfileType = await response.json();
            setProfile(profileData);
        } catch (error) {
        console.error('Fetch error:', error);
        } finally {
        setLoading(false);
        }
    }

    async function GetPeripherals(): Promise<void> {
        setLoading(true);
        try {
            const response = await fetch('https://localhost:7191/api/Data/GetPeripherals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (!response.ok) {
            throw new Error('Network response was not ok');
            }

            const peripheralList: Peripheral[] = await response.json();
            setPeripherals(peripheralList);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    }

    async function UpdateProfileData(): Promise<void> {
        setLoading(true);
        const data: number[] = [];
        data.push(peripherals?.find(p => p.name === mouse)?.id ?? 0);
        data.push(peripherals?.find(p => p.name === mousePad)?.id ?? 0);
        data.push(peripherals?.find(p => p.name === keyboard)?.id ?? 0);
        data.push(peripherals?.find(p => p.name === headset)?.id ?? 0);
        data.push(peripherals?.find(p => p.name === monitor)?.id ?? 0);
        try {
            const response = await fetch('https://localhost:7191/api/Data/UpdateUserPeripherals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies?.user
            },
            body: JSON.stringify({peripheralIds: data})
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="edit-profile">
            <div className="edit-field">
                <label>Mouse:</label>
                <select value={mouse} onChange={(e) => setMouse(e.target.value)}>
                    {peripherals?.filter(p=>p.type === "Mouse").map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                </select> 
            </div>
            <div className="edit-field">
                <label>Mousepad:</label>
                <select value={mousePad} onChange={(e) => setMousePad(e.target.value)}>
                    {peripherals?.filter(p=>p.type === "Mousepad").map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                </select> 
            </div>
            <div className="edit-field">
                <label>Keyboard:</label>
                <select value={keyboard} onChange={(e) => setKeyboard(e.target.value)}>
                    {peripherals?.filter(p=>p.type === "Keyboard").map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                </select> 
            </div>
            <div className="edit-field">
                <label>Headset:</label>
                <select value={headset} onChange={(e) => setHeadset(e.target.value)}>
                    {peripherals?.filter(p=>p.type === "Headset").map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                </select> 
            </div>
            <div className="edit-field">
                <label>Monitor:</label>
                <select value={keyboard} onChange={(e) => setMonitor(e.target.value)}>
                    {peripherals?.filter(p=>p.type === "Monitor").map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                </select> 
            </div>
            <button className="save-btn" onClick={UpdateProfileData}>Save</button>
        </div>
    );
}
