import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Facilities", path: "/facilities" },
  { label: "Gallery", path: "/gallery" },
  { label: "Syllabus", path: "/syllabus" },
  { label: "Career", path: "/career" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground text-[10px] md:text-sm py-2 px-4 whitespace-nowrap overflow-hidden text-ellipsis">
        <div className="container mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> 9813177106, 9813177141</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> stkabirpublicschool.dhr@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-card shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="School Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="font-display text-lg md:text-xl leading-tight text-primary">St.Kabir Public</h1>
              <p className="text-xs text-muted-foreground -mt-1">Sr. Sec. School</p>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex items-center gap-1">
              {navItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg font-display font-semibold text-sm transition-colors ${location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-orange-light"
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/apply" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:opacity-90 shadow-md transition-all active:scale-95">
              Apply Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-card border-t border-border px-4 pb-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`block py-3 px-4 rounded-lg font-display font-semibold text-sm ${location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/apply"
              onClick={() => setOpen(false)}
              className="block mt-4 py-3 px-4 bg-primary text-white rounded-lg font-bold text-center text-sm shadow-lg active:scale-95 transition-all"
            >
              Apply Now
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
