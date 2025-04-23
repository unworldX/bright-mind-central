
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Auto-redirect to dashboard after a delay
    // const timer = setTimeout(() => navigate('/dashboard'), 3000);
    // return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="mx-auto h-20 w-20 bg-purple-600 rounded-full flex items-center justify-center">
          <BookOpen className="h-10 w-10 text-white" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Student Library</h1>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Access, share, and collaborate on study resources for all your academic needs
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/register')}
          >
            Create Account
          </Button>
        </div>
        
        <div className="pt-4">
          <Button 
            variant="ghost" 
            className="text-sm text-muted-foreground"
            onClick={() => navigate('/dashboard')}
          >
            Continue as Guest
          </Button>
        </div>
      </div>
      
      <div className="mt-12 text-center text-muted-foreground text-sm">
        <p>Note: Backend functionality requires Supabase integration</p>
        <p className="mt-1">Lovable Student Library App</p>
      </div>
    </div>
  );
};

export default Index;
