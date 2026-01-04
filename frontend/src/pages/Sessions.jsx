import { Layout } from "../components/layout/layout.jsx";
import { Plus } from "lucide-react";
import { SessionList } from "../components/sessions/SessionList.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Sessions() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSessions = async () => {     
        setLoading(true);   
        console.log("Fetching sessions from API...");
        try {
            const response = await axios.get(`${API_BASE_URL}/v1/sessions`);
            console.log("Sessions fetched:", response.data);
            setSessions(response.data);
        } catch (error) {
            console.error("Error fetching sessions:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchSessions();
    }, []);

    return (
        <Layout>
            <div className="mx-auto max-w-7xl px-6 py-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Coding Sessions</h1>
                        <p className="mt-2 text-muted-foreground">Track and manage all your coding activities</p>
                    </div>
                    <button className="flex items-center justify-center rounded-xl border gap-2 px-5 py-3 bg-primary text-primary-foreground font-medium transition-all duration-200 hover:bg-primary/90 glow-primary">
                        <Plus className=""/>
                        <span className="inline" onClick={null}>New Session</span>
                    </button>
                </div>

                <div>
                    <SessionList sessions={sessions} loading={loading} />
                </div>
            </div>
        </Layout>
    );
}