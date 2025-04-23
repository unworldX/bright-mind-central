
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Plus, Book, CheckCircle, Clock } from "lucide-react";
import AppLayout from "@/components/Layout/AppLayout";

// Study plan interface
interface StudyPlan {
  id: number;
  title: string;
  subject: string;
  deadline: string;
  progress: number;
  tasks: Task[];
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
  duration: string;
  priority: "high" | "medium" | "low";
}

// Priority color mapping
const priorityColors = {
  high: "text-red-500",
  medium: "text-amber-500",
  low: "text-green-500",
};

const StudyPlans = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock data for study plans
  const studyPlans: StudyPlan[] = [
    {
      id: 1,
      title: "Final Exam Prep - Calculus",
      subject: "Mathematics",
      deadline: "Apr 30, 2025",
      progress: 65,
      tasks: [
        { id: 101, title: "Review differentiation rules", completed: true, duration: "2 hours", priority: "high" },
        { id: 102, title: "Practice integration problems", completed: true, duration: "3 hours", priority: "high" },
        { id: 103, title: "Study applications of integrals", completed: false, duration: "2 hours", priority: "medium" },
        { id: 104, title: "Review series and sequences", completed: false, duration: "2.5 hours", priority: "medium" },
        { id: 105, title: "Take practice exam", completed: false, duration: "1.5 hours", priority: "high" },
      ]
    },
    {
      id: 2,
      title: "Programming Project - Data Structures",
      subject: "Computer Science",
      deadline: "May 15, 2025",
      progress: 30,
      tasks: [
        { id: 201, title: "Design system architecture", completed: true, duration: "3 hours", priority: "high" },
        { id: 202, title: "Implement binary search tree", completed: true, duration: "4 hours", priority: "high" },
        { id: 203, title: "Implement hash table", completed: false, duration: "4 hours", priority: "high" },
        { id: 204, title: "Write test cases", completed: false, duration: "2 hours", priority: "medium" },
        { id: 205, title: "Prepare documentation", completed: false, duration: "2 hours", priority: "low" },
      ]
    },
    {
      id: 3,
      title: "Research Paper - American Literature",
      subject: "Literature",
      deadline: "May 5, 2025",
      progress: 40,
      tasks: [
        { id: 301, title: "Research topic and sources", completed: true, duration: "3 hours", priority: "high" },
        { id: 302, title: "Create outline", completed: true, duration: "1.5 hours", priority: "high" },
        { id: 303, title: "Write introduction", completed: false, duration: "2 hours", priority: "medium" },
        { id: 304, title: "Write body paragraphs", completed: false, duration: "6 hours", priority: "high" },
        { id: 305, title: "Write conclusion", completed: false, duration: "1 hour", priority: "medium" },
        { id: 306, title: "Format citations", completed: false, duration: "1 hour", priority: "low" },
      ]
    }
  ];

  // Mock data for today's tasks
  const todayTasks = [
    { id: 101, title: "Study applications of integrals", subject: "Mathematics", duration: "2 hours", time: "10:00 AM - 12:00 PM", completed: false },
    { id: 201, title: "Implement hash table", subject: "Computer Science", duration: "2 hours", time: "2:00 PM - 4:00 PM", completed: false },
    { id: 301, title: "Write introduction", subject: "Literature", duration: "2 hours", time: "4:30 PM - 6:30 PM", completed: false },
  ];

  const [tasks, setTasks] = useState(todayTasks);

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Calculate remaining study time
  const totalTime = tasks.reduce((acc, task) => {
    const hours = parseInt(task.duration.split(" ")[0]);
    return acc + (task.completed ? 0 : hours);
  }, 0);

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      "Mathematics": "bg-blue-500",
      "Computer Science": "bg-purple-500",
      "Literature": "bg-amber-500",
      "Physics": "bg-orange-500",
      "Chemistry": "bg-green-500",
      "Biology": "bg-emerald-500",
      "History": "bg-red-500",
    };
    
    return colors[subject] || "bg-gray-500";
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Study Plans</h1>
            <p className="text-muted-foreground">Organize and track your study schedule</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Create New Plan
          </Button>
        </div>

        {/* Study Plans Overview */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* Left Column - Calendar and Today's Schedule */}
          <div className="md:col-span-5 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Study Calendar</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Today's Schedule</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {totalTime} hours remaining
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                        id={`task-${task.id}`}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={`task-${task.id}`}
                          className={`text-sm font-medium cursor-pointer ${task.completed ? "line-through text-muted-foreground" : ""}`}
                        >
                          {task.title}
                        </label>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <div className={`h-2 w-2 rounded-full ${getSubjectColor(task.subject)}`} />
                          <span>{task.subject}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{task.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Study Plans */}
          <div className="md:col-span-7">
            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active">Active Plans</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="mt-4 space-y-4">
                {studyPlans.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Book className="h-4 w-4 text-primary" />
                          <CardTitle className="text-base">{plan.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className={`h-2 w-2 rounded-full ${getSubjectColor(plan.subject)}`} />
                          <span>{plan.subject}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                        <span>Deadline: {plan.deadline}</span>
                        <span>{plan.progress}% Complete</span>
                      </div>
                      <Progress value={plan.progress} className="h-1.5 mt-2" />
                    </CardHeader>
                    <CardContent className="pt-0 pb-3">
                      <div className="space-y-2">
                        {plan.tasks.map((task) => (
                          <div key={task.id} className="flex items-center text-sm">
                            {task.completed ? (
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            ) : (
                              <div className="h-4 w-4 mr-2 rounded-full border border-gray-300" />
                            )}
                            <span className={task.completed ? "text-muted-foreground line-through" : ""}>
                              {task.title}
                            </span>
                            <span className="ml-auto flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {task.duration}
                              <span className={`ml-2 ${priorityColors[task.priority]}`}>
                                • {task.priority} priority
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="completed" className="mt-4">
                <div className="flex flex-col items-center justify-center h-40 text-center p-4 border rounded-lg bg-muted/20">
                  <CheckCircle className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No completed study plans yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your completed study plans will appear here
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default StudyPlans;
