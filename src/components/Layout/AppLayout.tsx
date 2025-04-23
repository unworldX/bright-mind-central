
import { useState, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, Book, Calendar, Bell, MessageSquare, User, Settings, LogOut, Menu, X, Search, BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const mainNavItems: NavItem[] = [
    { label: "Home", icon: Home, path: "/dashboard" },
    { label: "Study Resources", icon: Book, path: "/resources" },
    { label: "Forums", icon: MessageSquare, path: "/forums" },
    { label: "Study Plans", icon: Calendar, path: "/study-plans" },
    { label: "Reminders", icon: Bell, path: "/reminders" },
  ];
  
  const secondaryNavItems: NavItem[] = [
    { label: "Profile", icon: User, path: "/profile" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];
  
  const NavItem = ({ item }: { item: NavItem }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link 
        to={item.path} 
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <item.icon size={20} />
        <span>{item.label}</span>
      </Link>
    );
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-card transition-transform lg:translate-x-0 lg:static lg:z-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Student Library</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <nav className="px-2 space-y-1">
            {mainNavItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
            
            <div className="mx-3 my-4 h-px bg-border" />
            
            {secondaryNavItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </nav>
        </div>
        
        <div className="sticky bottom-0 border-t bg-card p-4">
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <Link to="/login">
              <LogOut size={16} />
              <span>Logout</span>
            </Link>
          </Button>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1">
        {/* Mobile Header */}
        <header className="flex h-16 items-center gap-4 border-b px-4 lg:px-6 sticky top-0 bg-background z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden" 
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </Button>
          
          <div className="flex w-full items-center justify-between lg:hidden">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-semibold">Student Library</span>
            </div>
            <Button size="icon" variant="ghost">
              <Search size={20} />
            </Button>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="container mx-auto py-4 px-4 pb-16">
          {children}
        </div>

        {/* Safe area inset for mobile devices */}
        <div className="h-8 lg:hidden"></div>
      </main>
    </div>
  );
};

export default AppLayout;
