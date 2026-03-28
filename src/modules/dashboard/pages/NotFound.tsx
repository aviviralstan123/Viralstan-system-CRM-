import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Only log in development
    if (import.meta.env.DEV) {
      console.error("404 Error: Path not found:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-[60vh] items-center justify-center text-center p-4">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <FileQuestion className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="gradient-primary px-8">
        <Link to="/">Return to Dashboard</Link>
      </Button>
    </div>
  );
};

export default NotFound;
