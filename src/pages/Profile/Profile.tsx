
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Book, Video, BookOpen, Award } from "lucide-react";
import AppLayout from "@/components/Layout/AppLayout";
import ResourceCard from "@/components/Resources/ResourceCard";

interface ProfileStats {
  resourcesRead: number;
  goalsCompleted: number;
  studyHours: number;
  forumPosts: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
}

const Profile = () => {
  const [user] = useState({
    name: "Alex Johnson",
    username: "alex_j",
    email: "alex.johnson@example.com",
    bio: "Computer Science student passionate about programming and mathematics. Love to share knowledge and collaborate on interesting projects.",
    avatar: "/placeholder.svg",
    joinedDate: "September 2023",
  });
  
  const [stats] = useState<ProfileStats>({
    resourcesRead: 142,
    goalsCompleted: 87,
    studyHours: 215,
    forumPosts: 34,
  });
  
  const [achievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "Resource Master",
      description: "Read over 100 resources",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
      date: "March 15, 2024",
    },
    {
      id: 2,
      title: "Consistent Learner",
      description: "Completed 50 study goals",
      icon: <Award className="h-5 w-5 text-amber-500" />,
      date: "February 22, 2024",
    },
    {
      id: 3,
      title: "Helpful Contributor",
      description: "Posted 25 responses in forums",
      icon: <Award className="h-5 w-5 text-blue-500" />,
      date: "January 10, 2024",
    },
  ]);
  
  // Mock data for favorite resources
  const favoriteResources = [
    { id: 1, title: "Calculus Fundamentals", type: "PDF", author: "Dr. Smith", subject: "Math", class: "MAT-201", thumbnail: "/placeholder.svg" },
    { id: 5, title: "World History: Modern Era", type: "Video", author: "Dr. Garcia", subject: "History", class: "HIST-202", thumbnail: "/placeholder.svg" },
    { id: 8, title: "Machine Learning Basics", type: "Video", author: "Prof. Anderson", subject: "Computer Science", class: "CS-401", thumbnail: "/placeholder.svg" },
  ];
  
  // Mock data for uploaded resources
  const uploadedResources = [
    { id: 3, title: "Organic Chemistry Notes", type: "PDF", author: "Alex Johnson", subject: "Chemistry", class: "CHEM-302", thumbnail: "/placeholder.svg" },
    { id: 9, title: "Programming Algorithms", type: "PDF", author: "Alex Johnson", subject: "Computer Science", class: "CS-201", thumbnail: "/placeholder.svg" },
  ];

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Edit className="h-3 w-3" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>
                
                <div>
                  <p>{user.bio}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Computer Science</Badge>
                  <Badge variant="secondary">Mathematics</Badge>
                  <Badge variant="secondary">Programming</Badge>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Member since {user.joinedDate}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-5 w-5 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold">{stats.resourcesRead}</p>
              <p className="text-sm text-muted-foreground">Resources Read</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-5 w-5 mx-auto mb-2 text-amber-500" />
              <p className="text-2xl font-bold">{stats.goalsCompleted}</p>
              <p className="text-sm text-muted-foreground">Goals Completed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Book className="h-5 w-5 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{stats.studyHours}</p>
              <p className="text-sm text-muted-foreground">Study Hours</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Video className="h-5 w-5 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{stats.forumPosts}</p>
              <p className="text-sm text-muted-foreground">Forum Posts</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Resources and Achievements Tabs */}
        <Tabs defaultValue="favorites">
          <TabsList>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="uploads">My Uploads</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="favorites" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {favoriteResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="uploads" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {uploadedResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-4">
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
