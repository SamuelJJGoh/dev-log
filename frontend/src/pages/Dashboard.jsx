import { Layout } from "../components/layout/layout.jsx";
import { StatsCard } from "../components/dashboard/StatsCard.jsx";
import { RecentSessions } from "../components/dashboard/RecentSessions.jsx";
import { Code2, Clock, BookOpen, Flame, ArrowRight } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Dashboard() {
    const USER = import.meta.env.VITE_USERNAME
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [sessions, setSessions] = useState([]);
    const [resources, setResources] = useState([]);

    const fetchAllSessions = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/v1/sessions`);
            setSessions(response.data);
        } catch (error) {
            console.error("Error fetching sessions:", error);
        } finally {
            console.log("Fetching sessions completed")
        }
    }, [API_BASE_URL]);

     const fetchAllResources = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/v1/resources`);
            setResources(response.data);
        } catch (error) {
            console.error("Error fetching resources:", error);
        } finally {
            console.log("Fetching resources completed")
        }
    }, [API_BASE_URL]);

     useEffect(() => {
        fetchAllSessions();
        fetchAllResources();
    }, [fetchAllSessions, fetchAllResources]);


    const last30Days = useMemo(() => {
        const currentDate = new Date();
        const fromDate = new Date(
            currentDate.getFullYear(), 
            currentDate.getMonth(), 
            currentDate.getDate() - 30
        );

        const lastMonthSessions = sessions.filter((session) => {
            const sessionDate = new Date(session.date);
            if (isNaN(sessionDate.getTime())) {
                return false
            }
            return sessionDate >= fromDate && sessionDate <= currentDate; // doesn't include sessions in the future
        });

        return lastMonthSessions
    }, [sessions])

    const last30DaysSessionCount = useMemo(() => {
        return last30Days.length;
    }, [last30Days])

    const last30DaysHoursCoded = useMemo(() => {
        const totalMinutes = last30Days.reduce(
            (sum, session) => sum + (session.durationMinutes),
            0
        );
        return (totalMinutes / 60).toFixed(2);
    }, [last30Days]);

    const resourcesToReviewCount = useMemo(() => {
        const resourcesToReview = resources.filter((resource) => 
            resource.status === "To watch"
        )

        return resourcesToReview.length;
    }, [resources])

    const getStreakCount = useMemo(() => {
        let streak = 0;

        const sortedSessionsDescending = [...sessions].sort((a, b) => new Date(b.date) - new Date(a.date));

        while (
            sortedSessionsDescending.length > 0 &&
            new Date(sortedSessionsDescending[0].date).getTime() > Date.now()
        ) {
            sortedSessionsDescending.shift();
        }
        
        const msPerDay = 24 * 60 * 60 * 1000;
        const today = new Date();

        const toMidnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const todayMidnight = toMidnight(today);

        let previousDay = null;

        for (const session of sortedSessionsDescending) {
            const sessionDay = toMidnight(new Date(session.date));

            if (!previousDay) {
                const gapFromToday = Math.floor((todayMidnight - sessionDay) / msPerDay);
                // had a session today
                if (gapFromToday === 0) { 
                    previousDay = sessionDay;
                    streak = 1
                // no session today so far, but today is not over, so we still maintain streaks from before today
                } else if (gapFromToday === 1) { 
                    previousDay = sessionDay;
                    streak = 1
                // no session today, streak is broken
                } else {
                    break
                }
            }

            const gapBetweenDays  = Math.floor((previousDay - sessionDay) / msPerDay);
            if (gapBetweenDays === 1) {
                previousDay = sessionDay
                streak += 1;
            } else if (gapBetweenDays === 0) {
                continue  // multiple sessions on the same day, we ignore this
            } else {
                break // gap > 1 so streak broken
            }
        }
         
        return streak;
    }, [sessions])

    return (
       <Layout>
            <div className="mx-auto max-w-7xl px-6 py-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        {`Welcome back, ${USER}`} 
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Track your progress, review your sessions, and keep learning.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <StatsCard 
                        label={"Total Sessions"}
                        value={last30DaysSessionCount}
                        subtitle={"Last 30 days"}
                        icon={<Code2 className="h-6 w-6"/>}
                        accentColor={"primary"}
                    />
                    <StatsCard 
                        label={"Hours Coded"}
                        value={last30DaysHoursCoded}
                        subtitle={"Last 30 days"}
                        icon={<Clock className="h-6 w-6"/>}
                        accentColor={"accent"}
                    />
                    <StatsCard 
                        label={"To Review"}
                        value={resourcesToReviewCount}
                        subtitle={"Resources queued"}
                        icon={<BookOpen className="h-6 w-6"/>}
                        accentColor={"warning"}
                    />
                    <StatsCard 
                        label={"Current Streak"}
                        value={getStreakCount}
                        subtitle={"Days in a row"}
                        icon={<Flame className="h-6 w-6"/>}
                        accentColor={"success"}
                    />
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Recent Sessions */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-mono text-xl font-semibold">Recent Sessions</h2>
                                <Link
                                    to="/sessions"
                                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                >
                                    <span className="flex items-center gap-2">
                                        View all <ArrowRight className="h-4 w-4"/>
                                    </span>
                                </Link>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {last30Days.map((session, index) => (
                                    <RecentSessions
                                        key={index} 
                                        {...session} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Weekly Activity and Learning Queue */}
                    <div>

                    </div>

                </div>
            </div>
       </Layout>
    );
}