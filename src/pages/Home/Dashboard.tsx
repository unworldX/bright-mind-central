
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import AppLayout from "@/components/Layout/AppLayout";
import ResourceCard from "@/components/Resources/ResourceCard";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for the dashboard
  const stats = [
    { title: "Study Time", value: "12.5 hrs", progress: 75 },
    { title: "Notes Read", value: "24", progress: 60 },
    { title: "Daily Goals", value: "4/5", progress: 80 },
  ];
  
  const recentResources = [
    { id: 1, title: "Calculus Fundamentals", type: "PDF", author: "Dr. Smith", subject: "Math", class: "MAT-201", lastViewed: "2 hours ago", thumbnail: "/placeholder.svg" },
    { id: 2, title: "Introduction to Psychology", type: "Video", author: "Prof. Johnson", subject: "Psychology", class: "PSY-101", lastViewed: "Yesterday", thumbnail: "/placeholder.svg" },
    { id: 3, title: "Organic Chemistry Notes", type: "PDF", author: "You", subject: "Chemistry", class: "CHEM-302", lastViewed: "3 days ago", thumbnail: "/placeholder.svg" },
  ];
  
  const recommendedResources = [
    { id: 4, title: "Advanced Data Structures", type: "PDF", author: "Prof. Zhang", subject: "Computer Science", class: "CS-301", thumbnail: "/placeholder.svg" },
    { id: 5, title: "World History: Modern Era", type: "Video", author: "Dr. Garcia", subject: "History", class: "HIST-202", thumbnail: "/placeholder.svg" },
    { id: 6, title: "Physics: Mechanics", type: "PDF", author: "Dr. Lee", subject: "Physics", class: "PHY-101", thumbnail: "/placeholder.svg" },
  ];
  
  const upcomingReminders = [
    { id: 1, title: "Math Assignment", date: "Today, 3:00 PM", subject: "Mathematics" },
    { id: 2, title: "Biology Exam", date: "Tomorrow, 10:00 AM", subject: "Biology" },
    { id: 3, title: "Study Group Meeting", date: "Friday, 5:30 PM", subject: "Physics" },
  ];

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome Back, Student!</h1>
            <p className="text-muted-foreground">Track your progress and explore resources</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources..."
              className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <Progress value={stat.progress} className="h-2 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Resources Section */}
        <div className="space-y-6">
          <Tabs defaultValue="recent">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>
              <Button size="sm">View All</Button>
            </div>
            
            <TabsContent value="recent" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recentResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recommended" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Reminders Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Upcoming Reminders</h2>
            <Button variant="outline" size="sm">Add Reminder</Button>
          </div>
          <div className="space-y-3">
            {upcomingReminders.map((reminder) => (
              <Card key={reminder.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{reminder.title}</p>
                    <p className="text-sm text-muted-foreground">{reminder.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: reminderColor(reminder.subject) }}></div>
                    <span className="text-xs">{reminder.subject}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

// Helper function to generate colors based on subject
const reminderColor = (subject: string) => {
  const colors: Record<string, string> = {
    "Mathematics": "#9b87f5",
    "Biology": "#34D399",
    "Physics": "#F97316",
    "Chemistry": "#06B6D4",
    "History": "#8B5CF6",
    "Psychology": "#EC4899",
    "Computer Science": "#3B82F6",
  };
  
  return colors[subject] || "#9b87f5";
};

export default Dashboard;
