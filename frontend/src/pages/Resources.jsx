import { Layout } from "../components/layout/layout.jsx";
import { Plus, Search, Funnel, ChevronDown } from "lucide-react";
import { ResourceList } from "../components/resources/ResourceList.jsx";
import { ResourceForm } from "../components/resources/ResourceForm.jsx";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const resourceStatus = [
    "All", "To watch", "In progress", "Completed"
]

const resourceCategory = [
    "All",
    "Video",
    "Article",
    "Documentation",
    "Repo / Code Sample",
    "Course",
    "Cheat Sheet"
]


export default function Resources() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const [checked, setChecked] = useState(false);

    const fetchResources = useCallback(async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${API_BASE_URL}/v1/resources`);
            setResources(response.data);
        } catch (error) {
            console.error("Error fetching resources", error)
        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL])

    useEffect(() => {
        fetchResources();
    }, [fetchResources])

    const filteredResources = resources.filter((resource) => {
        const query = searchQuery.toLowerCase();

        if (checked) {
            if (query && !resource.title.toLowerCase().includes(query)) {
                const topicMatch = Array.isArray(resource.topics)
                    ? resource.topics.some((topic) => topic.toLowerCase().includes(query)) //.some() returns true if at least one topic matches the query
                    : false
                    if (!topicMatch) {
                        return false
                    }
            } 
        } else {
            if (query && !resource.title.toLowerCase().includes(query)) {
                return false
            } 
        }
        
        if (selectedStatus !== "All" && resource.status !== selectedStatus) {
            return false;
        }
        if (selectedCategory !== "All" && resource.category !== selectedCategory) {
            return false;
        }
        return true;
    });

    return (
        <Layout>
            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h3 className="text-3xl font-bold">Learning Resources</h3>
                        <p className="text-muted-foreground mt-2">Manage your learning materials and track progress</p>
                    </div>
                    <button 
                        className="flex items-center justify-center gap-2 bg-accent text-accent-foreground font-medium rounded-xl px-5 py-3 transition-all duration-200 hover:bg-accent/90 glow-accent"
                        onClick={() => setShowForm(true)}
                    >
                        <Plus />
                        Add Resource
                    </button>
                </div>

                <div className="glass-card p-4 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">

                        {/* Search Bar */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input 
                                    type="text"
                                    className="rounded-lg border border-border/70 bg-secondary/60 text-sm w-full pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50"
                                    placeholder="Search resources..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                           

                            <label className="flex gap-2 items-center text-muted-foreground text-sm">
                                    <input 
                                        type="checkbox"
                                        onChange={(e) => setChecked(e.target.checked)}
                                    />  
                                    Search by topics
                            </label>


                        {/* Resource statuses dropdown */}
                        <div className="flex items-center relative styled-select group">
                            <Funnel className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                            <select
                                className="rounded-lg border border-border/70 bg-secondary/60 text-sm px-10 py-3 focus:outline-none hover:outline-none hover:ring-2 hover:ring-accent/50 text-muted-foreground"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                {resourceStatus.map((status) => (
                                    <option 
                                        key={status} value={status}
                                    >
                                        Status: {status}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 group-hover:text-accent text-muted-foreground"/>
                        </div>

                        {/* Resource categories dropdown */}
                        <div className="flex items-center relative styled-select group">
                            <Funnel className="absolute left-3 h-4 w-4 text-muted-foreground"/>
                            <select
                                className="rounded-lg border border-border/70 bg-secondary/60 text-sm px-10 py-3 focus:outline-none hover:outline-none hover:ring-2 hover:ring-accent/50 text-muted-foreground"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {resourceCategory.map((category) => (
                                    <option 
                                        key={category} value={category}
                                    >
                                        Category: {category}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 group-hover:text-accent text-muted-foreground"/>
                        </div>
                    </div>
                </div>
                
                <p className="text-muted-foreground text-sm">{`Showing ${filteredResources.length} of ${resources.length} resources`}</p>

                <div>
                    <ResourceList 
                        resources={resources} 
                        loading={loading}
                        filteredResources={filteredResources}/>
                </div>

                {filteredResources.length === 0 && resources.length !== 0 && (
                    <div className="glass-card p-12 text-center">
                        <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-accent" />
                        </div>
                        <h3 className="font-mono text-lg font-semibold">No resources found</h3>
                        <p className="mt-2 text-muted-foreground">
                        Try adjusting your filters or search query
                        </p>
                    </div>
                )}
            </div>

            {showForm && (
                <ResourceForm 
                    onClose={() => setShowForm(false)} />
            )}
        </Layout>
    );
}