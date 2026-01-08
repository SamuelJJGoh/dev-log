import { Layout } from "../components/layout/layout.jsx";
import { Plus } from "lucide-react";
import { SessionList } from "../components/sessions/SessionList.jsx";
import { SessionForm } from "../components/sessions/SessionForm.jsx";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function Sessions() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);
    
    const fetchSessions = useCallback(async () => {     
        setLoading(true);   
        try {
            const response = await axios.get(`${API_BASE_URL}/v1/sessions`);
            setSessions(response.data);
        } catch (error) {
            console.error("Error fetching sessions:", error);
        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL]);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const handleCreateSession = async (newSession) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/v1/sessions`, 
                newSession,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const createdSession = response.data.session; 

            if (createdSession && typeof createdSession === 'object') {
               setSessions((prevSessions) => [createdSession, ...prevSessions]);
            } else {
                await fetchSessions();
            }

            return createdSession;

        } catch (error) {
            let message = "Error creating session.";
            if (error.response && error.response.data && error.response.data.error) {
                message += ` ${error.response.data.error}`;
            }
            console.error(message);
            return null;
        }
    }

    return (
        <Layout>
            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Coding Sessions</h1>
                        <p className="mt-2 text-muted-foreground">Track and manage all your coding activities</p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center justify-center rounded-xl border gap-2 px-5 py-3 bg-primary text-primary-foreground font-medium transition-all duration-200 hover:bg-primary/90 glow-primary"
                    >
                        <Plus className=""/>
                        <span>New Session</span>
                    </button>
                </div>
                
                <p className="text-muted-foreground text-sm">{`Showing ${sessions.length} of ${sessions.length} sessions`}</p>

                <div>
                    <SessionList sessions={sessions} loading={loading} />
                </div>
            </div>

            {showForm && (
                <SessionForm onClose={() => setShowForm(false)} onCreate={handleCreateSession} />
            )}
        </Layout>
    );
}
