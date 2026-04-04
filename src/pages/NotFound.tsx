import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.pinimg.com/736x/7f/96/da/7f96daa4a1887d1dbcc4224e7e62c0db.jpg" 
          alt="School Campus" 
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>
      <div className="text-center relative z-10 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
        <h1 className="mb-4 text-6xl md:text-8xl font-bold text-white drop-shadow-xl font-display">404</h1>
        <p className="mb-8 text-xl md:text-2xl text-white/90 drop-shadow-md">Oops! Page not found</p>
        <a href="/" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
