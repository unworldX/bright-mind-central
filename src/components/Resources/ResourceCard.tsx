
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book, Video } from "lucide-react";

interface Resource {
  id: number;
  title: string;
  type: string;
  author: string;
  subject: string;
  class: string;
  thumbnail: string;
  lastViewed?: string;
}

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const TypeIcon = resource.type === "Video" ? Video : Book;
  
  // Generate a background color based on the subject
  const getSubjectColor = (subject: string) => {
    const colors = {
      "Math": "bg-blue-100 text-blue-700",
      "Psychology": "bg-pink-100 text-pink-700",
      "Chemistry": "bg-green-100 text-green-700",
      "Computer Science": "bg-purple-100 text-purple-700",
      "History": "bg-amber-100 text-amber-700",
      "Physics": "bg-orange-100 text-orange-700",
      "Biology": "bg-emerald-100 text-emerald-700",
    };
    
    return colors[subject as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
      <div className="relative h-40 bg-muted">
        <img 
          src={resource.thumbnail} 
          alt={resource.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-background/90 p-1 rounded-md">
          <TypeIcon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold line-clamp-2">{resource.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>By {resource.author}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2 py-1 rounded-full ${getSubjectColor(resource.subject)}`}>
              {resource.subject}
            </span>
            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
              {resource.class}
            </span>
          </div>
        </div>
      </CardContent>
      {resource.lastViewed && (
        <CardFooter className="p-4 pt-0 border-t text-xs text-muted-foreground">
          Last viewed {resource.lastViewed}
        </CardFooter>
      )}
    </Card>
  );
};

export default ResourceCard;
