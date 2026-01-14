import { Layout } from "../components/layout/layout.jsx";
import { Plus } from "lucide-react";
import { ResourceForm } from "../components/resources/ResourceForm.jsx";
import { useState } from "react";

export default function Resources() {
    const [showForm, setShowForm] = useState(false);

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

                <div>

                </div>
                
                <p className="text-muted-foreground text-sm">{`Showing 5 of 5 sessions`}</p>

                <div>

                </div>
            </div>

            {showForm && (
                <ResourceForm 
                    onClose={() => setShowForm(false)} />
            )}
        </Layout>
    );
}