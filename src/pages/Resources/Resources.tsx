
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Upload, Book, Video } from "lucide-react";
import AppLayout from "@/components/Layout/AppLayout";
import ResourceCard from "@/components/Resources/ResourceCard";

interface Resource {
  id: number;
  title: string;
  type: string;
  author: string;
  subject: string;
  class: string;
  thumbnail: string;
  uploadedAt?: string;
  views?: number;
}

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for resources
  const allResources: Resource[] = [
    { id: 1, title: "Calculus Fundamentals", type: "PDF", author: "Dr. Smith", subject: "Math", class: "MAT-201", thumbnail: "/placeholder.svg", uploadedAt: "2 weeks ago", views: 245 },
    { id: 2, title: "Introduction to Psychology", type: "Video", author: "Prof. Johnson", subject: "Psychology", class: "PSY-101", thumbnail: "/placeholder.svg", uploadedAt: "1 month ago", views: 512 },
    { id: 3, title: "Organic Chemistry Notes", type: "PDF", author: "Student Contributor", subject: "Chemistry", class: "CHEM-302", thumbnail: "/placeholder.svg", uploadedAt: "3 days ago", views: 87 },
    { id: 4, title: "Advanced Data Structures", type: "PDF", author: "Prof. Zhang", subject: "Computer Science", class: "CS-301", thumbnail: "/placeholder.svg", uploadedAt: "1 week ago", views: 302 },
    { id: 5, title: "World History: Modern Era", type: "Video", author: "Dr. Garcia", subject: "History", class: "HIST-202", thumbnail: "/placeholder.svg", uploadedAt: "2 months ago", views: 421 },
    { id: 6, title: "Physics: Mechanics", type: "PDF", author: "Dr. Lee", subject: "Physics", class: "PHY-101", thumbnail: "/placeholder.svg", uploadedAt: "5 days ago", views: 178 },
    { id: 7, title: "Cell Biology Illustrated", type: "PDF", author: "Dr. Patel", subject: "Biology", class: "BIO-201", thumbnail: "/placeholder.svg", uploadedAt: "1 month ago", views: 295 },
    { id: 8, title: "Machine Learning Basics", type: "Video", author: "Prof. Anderson", subject: "Computer Science", class: "CS-401", thumbnail: "/placeholder.svg", uploadedAt: "3 weeks ago", views: 647 },
  ];
  
  // PDF resources
  const pdfResources = allResources.filter(r => r.type === "PDF");
  
  // Video resources
  const videoResources = allResources.filter(r => r.type === "Video");
  
  // Filter resources based on search query
  const filterResources = (resources: Resource[]) => {
    if (!searchQuery) return resources;
    
    return resources.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.class.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Study Resources</h1>
            <p className="text-muted-foreground">Browse and search for study materials</p>
          </div>
          <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
            <Upload size={16} />
            Upload Resource
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title, author, subject..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="bio">Biology</SelectItem>
                <SelectItem value="chem">Chemistry</SelectItem>
                <SelectItem value="phys">Physics</SelectItem>
                <SelectItem value="hist">History</SelectItem>
                <SelectItem value="psych">Psychology</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-1">
              <Filter size={16} />
              Filters
            </Button>
          </div>
        </div>
        
        {/* Resources Tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="pdfs" className="flex items-center gap-1">
              <Book size={14} />
              Books & PDFs
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-1">
              <Video size={14} />
              Videos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filterResources(allResources).map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pdfs" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filterResources(pdfResources).map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filterResources(videoResources).map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Resources;
