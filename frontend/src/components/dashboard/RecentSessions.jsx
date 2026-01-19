import { Calendar, Clock } from "lucide-react";

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

export const RecentSessions = ({ type, title, date, durationMinutes, techStack }) => {

    return (
        <div className="session-card group">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <span className={`status-badge border ${typeStyles[type]}`}>
                        {type}
                    </span>
                    
                    <h3 className="mt-3 font-mono text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {formatDate(date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {formatDuration(durationMinutes)}
                        </span>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                        <span
                            key={tech}
                            className="tech-chip text-primary/90 border-primary/30 bg-primary/5"
                        >
                            {tech}
                        </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};