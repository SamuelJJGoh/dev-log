import { Layout } from "../components/layout/layout.jsx";
import { Plus, Search, Funnel, ArrowUpNarrowWide, ArrowDownWideNarrow, ChevronDown } from "lucide-react";
import { SessionList } from "../components/sessions/SessionList.jsx";
import { SessionForm } from "../components/sessions/SessionForm.jsx";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function Sessions() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [editingSession, setEditingSession] = useState(null);

    const sessionTypes = [
        "All",
        "Project",
        "Tutorial",
        "Interview Prep",
        "DSA",
        "Work",
        "Research",
        "System Design"
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [sortOrder, setSortOrder] = useState("desc"); 
    
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

    const handleDeleteSession = async (deletedSession) => {
        try {
            if (!deletedSession || !deletedSession._id) {
                console.error("Invalid session data for deletion.");
                return;
            }
            await axios.delete(
                `${API_BASE_URL}/v1/sessions/${deletedSession._id}`
            );

            setSessions((prevSessions) => 
                prevSessions.filter((session) => session._id !== deletedSession._id)
            );
        } catch (error) {
            console.error("Error deleting session:", error);
        }
    }

    // open form for editing
    const handleEditSession = (session) => {
        setEditingSession(session);
        setShowForm(true);
    };

    // call the update API and update state
    const handleUpdateSession = async (updatedSession) => {
        try {
            if (!updatedSession || !updatedSession._id) {
                console.error("Invalid session data for update.");
                return;
            }
            const response = await axios.patch(
                `${API_BASE_URL}/v1/sessions/${updatedSession._id}`,
                updatedSession,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const savedSession = response.data.session;

            setSessions((prevSessions) => 
                prevSessions.map((session) => 
                    session._id === savedSession._id ? savedSession : session
                )
            );

            return savedSession;

        } catch (error) {
            let message = "Error updating session.";
            if (error.response && error.response.data && error.response.data.error) {
                message += ` ${error.response.data.error}`;
            }
            console.error(message);
            return null;
        }
    };

    const filteredSessions = sessions.filter((session) => {
        if (searchQuery && !session.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        if (selectedType !== "All" && session.type !== selectedType) {
            return false;
        }
        return true;
    });

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    filteredSessions.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

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
                        <Plus />
                        <span>New Session</span>
                    </button>
                </div>

                <div className="glass-card p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input 
                                type="text"
                                className="rounded-lg border border-border/70 bg-secondary/60 text-sm w-full pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Search sessions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Session types dropdown */}
                        <div className="flex items-center relative styled-select group">
                            <Funnel className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                            <select
                                className="rounded-lg border border-border/70 bg-secondary/60 text-sm px-10 py-3 focus:outline-none hover:outline-none hover:ring-2 hover:ring-primary/50 text-muted-foreground"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                {sessionTypes.map((type) => (
                                    <option 
                                        key={type} value={type}
                                    >
                                        Type: {type}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 group-hover:text-primary text-muted-foreground"/>
                        </div>

                        {/* Sort by date */}
                        <div className="flex items-center rounded-lg hover:ring-2 hover:ring-primary/50 hover:outline-none"> 
                            <button 
                                className="relative rounded-lg pl-10 px-5 py-3 border border-border/70 bg-secondary/60 text-muted-foreground text-sm"
                                onClick={toggleSortOrder}
                            >
                                {sortOrder === "asc" ? (
                                    <ArrowUpNarrowWide className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                                    ) : (   
                                    <ArrowDownWideNarrow className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                                )}
                                Sort by Date
                            </button>
                        </div>
                    </div>
                </div>
                
                <p className="text-muted-foreground text-sm">{`Showing ${filteredSessions.length} of ${sessions.length} sessions`}</p>

                <div>
                    <SessionList
                        sessions={sessions}
                        loading={loading}
                        onDelete={handleDeleteSession}
                        onEdit={handleEditSession}
                        filteredSessions={filteredSessions}
                    />
                </div>

                {filteredSessions.length === 0 && sessions.length !== 0 && (
                    <div className="glass-card p-12 text-center">
                        <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-mono text-lg font-semibold">No sessions found</h3>
                        <p className="mt-2 text-muted-foreground">
                        Try adjusting your filters or search query
                        </p>
                    </div>
                )}
            </div>

            {showForm && (
                <SessionForm
                    onClose={() => {
                        setShowForm(false);
                        setEditingSession(null);
                    }}
                    onCreate={handleCreateSession}
                    initialValues={editingSession}
                    onUpdate={handleUpdateSession}
                />
            )}
        </Layout>
    );
}
