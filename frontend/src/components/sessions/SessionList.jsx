import { Calendar, Clock, SquarePen, Trash2} from "lucide-react";

function formatDate(dateString) {
    if (!dateString) {
        return "—";
    }

    const date = new Date(dateString);
    const time = date.getTime();
    if (isNaN(time)) {
        return "—";
    }

    const formattedDate = date.toLocaleDateString();
    return formattedDate;
}

function formatDuration(minutes) {  
    if (typeof minutes !== "number" || minutes < 0) {
        return "—";
    }
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    let result = "";
    if (hrs > 0) {
        result += `${hrs}h`;
    }
    if (mins > 0) {
        result += ` ${mins}m`;
    }
    return result.trim() || "0m";
}

const typeStyles = {
    "Project": "bg-type-project/10 text-type-project border-type-project/30",
    "Tutorial": "bg-type-tutorial/10 text-type-tutorial border-type-tutorial/30",
    "Interview Prep": "bg-type-interview/10 text-type-interview border-type-interview/30",
    "DSA": "bg-type-dsa/10 text-type-dsa border-type-dsa/30",
    "Work": "bg-type-work/10 text-type-work border-type-work/30",
    "Research": "bg-type-research/10 text-type-research border-type-research/30",
    "System Design": "bg-type-systemDesign/10 text-type-systemDesign border-type-systemDesign/30",
};

export const SessionList = ({ sessions = [], loading = false }) => {
    return (
        <div className="mt-4">
            {loading ? (
                <div>Loading sessions...</div>
            ) : sessions.length > 0 ? (
                <div className="space-y-4">
                    {sessions.map((session) => {
                        const key = session._id;
                        return (
                            <div 
                                key={key} 
                                className="session-card group animate-fade-up"
                            >   
                                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                                    {/* Main Content */}
                                    <div className="flex-1 min-w-0">

                                        {/* Session type, date and duration */}
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className={`status-badge border ${typeStyles[session.type]}`}>
                                                {session.type}
                                            </span>
                                            <div className="flex items-center text-sm text-muted-foreground gap-3">
                                                <span className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4"/> {formatDate(session.date)}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4"/> {formatDuration(session.durationMinutes)}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="mt-3 font-mono text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-200">
                                            {session.title}
                                        </h3>

                                        <p className="mt-2 text-muted-foreground text-sm">
                                            {session.notes}
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {Array.isArray(session.techStack) && session.techStack.length > 0
                                                ? session.techStack.map((tech) => {
                                                    return (
                                                        <span 
                                                            key={tech} 
                                                            className="tech-chip text-primary/90 border-primary/30 bg-primary/5"
                                                        >
                                                            {tech}
                                                        </span>
                                                    );
                                                })
                                                : "—"
                                            }
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="text-muted-foreground flex items-center gap-4" >
                                        <button className="icon-button hover:text-primary hover:bg-primary/10 transition-colors duration-200">
                                            <SquarePen className="h-5 w-5" />
                                        </button>
                                        <button className="icon-button hover:text-destructive hover:bg-destructive/10 transition-colors duration-200">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>
                    No sessions found.
                </div>
            )}
        </div>
    );
}
