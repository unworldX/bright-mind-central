
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowUp, ArrowDown, MessageSquare } from "lucide-react";
import AppLayout from "@/components/Layout/AppLayout";
import { CreateThreadModal } from "@/components/Forums/CreateThreadModal";
import { toast } from "sonner";

interface ForumTopic {
  id: number;
  title: string;
  description: string;
  category: string;
  posts: number;
  lastPostBy: string;
  lastPostTime: string;
}

interface ForumThread {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  votes: number;
  datePosted: string;
  lastReply: string;
}

const Forums = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [createThreadOpen, setCreateThreadOpen] = useState(false);

  // Mock data for forum topics
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>([
    { 
      id: 1, 
      title: "Mathematics", 
      description: "Discussion about calculus, algebra, statistics and other math topics", 
      category: "Academic", 
      posts: 247, 
      lastPostBy: "Taylor M.", 
      lastPostTime: "2 hours ago" 
    },
    { 
      id: 2, 
      title: "Computer Science", 
      description: "Programming, algorithms, data structures and CS theory", 
      category: "Academic", 
      posts: 389, 
      lastPostBy: "Robin H.", 
      lastPostTime: "30 minutes ago" 
    },
    { 
      id: 3, 
      title: "Study Tips & Techniques", 
      description: "Share effective study methods, time management and productivity tips", 
      category: "General", 
      posts: 173, 
      lastPostBy: "Jordan P.", 
      lastPostTime: "1 day ago" 
    },
    { 
      id: 4, 
      title: "Biology & Life Sciences", 
      description: "Discussions about biology, biochemistry, genetics and related fields", 
      category: "Academic", 
      posts: 215, 
      lastPostBy: "Casey O.", 
      lastPostTime: "5 hours ago" 
    },
    { 
      id: 5, 
      title: "App Feedback & Support", 
      description: "Questions, feedback and feature requests for the Student Library app", 
      category: "Meta", 
      posts: 84, 
      lastPostBy: "Admin", 
      lastPostTime: "3 days ago" 
    },
  ]);

  // Mock data for recent threads
  const [recentThreads, setRecentThreads] = useState<ForumThread[]>([
    { 
      id: 1, 
      title: "Need help with differential equations", 
      author: "MathStudent123", 
      category: "Mathematics", 
      replies: 8, 
      views: 156, 
      votes: 12, 
      datePosted: "4 hours ago", 
      lastReply: "30 minutes ago" 
    },
    { 
      id: 2, 
      title: "Best resources for learning React?", 
      author: "CodeLearner", 
      category: "Computer Science", 
      replies: 15, 
      views: 237, 
      votes: 24, 
      datePosted: "1 day ago", 
      lastReply: "2 hours ago" 
    },
    { 
      id: 3, 
      title: "Pomodoro technique effectiveness", 
      author: "StudyGuru", 
      category: "Study Tips & Techniques", 
      replies: 21, 
      views: 312, 
      votes: 31, 
      datePosted: "2 days ago", 
      lastReply: "4 hours ago" 
    },
    { 
      id: 4, 
      title: "Understanding DNA replication", 
      author: "BioEnthusiast", 
      category: "Biology & Life Sciences", 
      replies: 7, 
      views: 143, 
      votes: 18, 
      datePosted: "1 day ago", 
      lastReply: "6 hours ago" 
    },
  ]);

  // Mock data for popular threads
  const [popularThreads, setPopularThreads] = useState<ForumThread[]>([
    { 
      id: 5, 
      title: "Comprehensive guide to exam preparation", 
      author: "TopStudent", 
      category: "Study Tips & Techniques", 
      replies: 45, 
      views: 1243, 
      votes: 87, 
      datePosted: "1 week ago", 
      lastReply: "1 day ago" 
    },
    { 
      id: 6, 
      title: "AI tools for students: comprehensive list", 
      author: "TechSavvy", 
      category: "Computer Science", 
      replies: 38, 
      views: 982, 
      votes: 76, 
      datePosted: "2 weeks ago", 
      lastReply: "5 hours ago" 
    },
    { 
      id: 7, 
      title: "Biochemistry pathways explained simply", 
      author: "BioChem101", 
      category: "Biology & Life Sciences", 
      replies: 29, 
      views: 876, 
      votes: 63, 
      datePosted: "3 days ago", 
      lastReply: "12 hours ago" 
    },
    { 
      id: 8, 
      title: "Speed reading techniques that actually work", 
      author: "BookWorm", 
      category: "Study Tips & Techniques", 
      replies: 32, 
      views: 947, 
      votes: 58, 
      datePosted: "5 days ago", 
      lastReply: "1 hour ago" 
    },
  ]);

  const handleVote = (threadId: number, value: number, threadType: 'recent' | 'popular') => {
    const updateThreads = (threads: ForumThread[]) =>
      threads.map((thread) =>
        thread.id === threadId ? { ...thread, votes: thread.votes + value } : thread
      );

    if (threadType === 'recent') {
      setRecentThreads(updateThreads(recentThreads));
    } else {
      setPopularThreads(updateThreads(popularThreads));
    }
  };

  const handleCreateThread = (values: any) => {
    const newThread: ForumThread = {
      id: Date.now(),
      title: values.title,
      author: "CurrentUser", // In a real app, this would be the current user's username
      category: values.category,
      replies: 0,
      views: 1,
      votes: 0,
      datePosted: "just now",
      lastReply: "just now",
    };
    
    setRecentThreads([newThread, ...recentThreads]);
    toast.success("Thread created successfully!");
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Mathematics": "bg-blue-100 text-blue-700",
      "Computer Science": "bg-purple-100 text-purple-700",
      "Study Tips & Techniques": "bg-green-100 text-green-700",
      "Biology & Life Sciences": "bg-emerald-100 text-emerald-700",
      "App Feedback & Support": "bg-gray-100 text-gray-700",
      "Academic": "bg-blue-100 text-blue-700",
      "General": "bg-green-100 text-green-700",
      "Meta": "bg-gray-100 text-gray-700",
    };
    
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  // Filter topics based on search query
  const filterTopics = (topics: ForumTopic[]) => {
    if (!searchQuery) return topics;
    
    return topics.filter(t => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Filter threads based on search query
  const filterThreads = (threads: ForumThread[]) => {
    if (!searchQuery) return threads;
    
    return threads.filter(t => 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Discussion Forums</h1>
            <p className="text-muted-foreground">Collaborate and discuss with other students</p>
          </div>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setCreateThreadOpen(true)}
          >
            Create New Thread
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search forums and discussions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Forums Content */}
        <Tabs defaultValue="topics">
          <TabsList>
            <TabsTrigger value="topics">Forum Topics</TabsTrigger>
            <TabsTrigger value="recent">Recent Discussions</TabsTrigger>
            <TabsTrigger value="popular">Popular Threads</TabsTrigger>
          </TabsList>
          
          <TabsContent value="topics" className="mt-6">
            <div className="space-y-4">
              {filterTopics(forumTopics).map(topic => (
                <Card key={topic.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{topic.title}</span>
                      <Badge className={getCategoryColor(topic.category)}>
                        {topic.category}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                  </CardHeader>
                  <CardContent className="pb-4 pt-0">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span>{topic.posts} posts</span>
                      </div>
                      <div className="text-muted-foreground">
                        Last post by <span className="font-medium">{topic.lastPostBy}</span> · {topic.lastPostTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <div className="space-y-4">
              {filterThreads(recentThreads).map(thread => (
                <Card key={thread.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center space-y-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleVote(thread.id, 1, 'recent')}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium">{thread.votes}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleVote(thread.id, -1, 'recent')}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={getCategoryColor(thread.category)}>
                            {thread.category}
                          </Badge>
                        </div>
                        <h3 className="text-base font-semibold mb-1">{thread.title}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>Posted by {thread.author} · {thread.datePosted}</span>
                          <span>Replies: {thread.replies}</span>
                          <span>Views: {thread.views}</span>
                          <span>Last reply: {thread.lastReply}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-6">
            <div className="space-y-4">
              {filterThreads(popularThreads).map(thread => (
                <Card key={thread.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center space-y-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleVote(thread.id, 1, 'popular')}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium">{thread.votes}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleVote(thread.id, -1, 'popular')}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={getCategoryColor(thread.category)}>
                            {thread.category}
                          </Badge>
                        </div>
                        <h3 className="text-base font-semibold mb-1">{thread.title}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>Posted by {thread.author} · {thread.datePosted}</span>
                          <span>Replies: {thread.replies}</span>
                          <span>Views: {thread.views}</span>
                          <span>Last reply: {thread.lastReply}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Create Thread Modal */}
        <CreateThreadModal
          open={createThreadOpen}
          onOpenChange={setCreateThreadOpen}
          onSubmit={handleCreateThread}
        />
      </div>
    </AppLayout>
  );
};

export default Forums;
