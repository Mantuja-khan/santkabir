
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

import whatsappQr from "@/assets/whatsapp.jpeg";
import schoolLogo from "@/assets/logo.jpeg";

const Footer = () => (
  <footer className="bg-navy text-cream">
    <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* School Information */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white p-2 md:p-3 rounded-2xl shadow-xl border-4 border-white/10 flex items-center justify-center">
            <img
              src={schoolLogo}
              alt="St. Kabir Logo"
              className="w-10 h-10 md:w-14 md:h-14 object-contain"
            />
          </div>

          <h3 className="font-display text-xl md:text-2xl text-accent leading-tight uppercase tracking-tight">
            St. Kabir Public
            <br />
            Sr. Sec. School
          </h3>
        </div>

        <p className="text-sm opacity-80 leading-relaxed mb-6">
          Established with a vision to provide excellence in education, St.
          Kabir Public Sr. Sec. School, NRP Bass Road, Alawalpur, Dharuhera,
          Rewari stands as a pillar of academic success and character building.
          We nurture young minds from Nursery to Class 12th using modern
          facilities, digital classrooms, and a student-centric approach.
          Our dedicated faculty ensures every child achieves their maximum
          potential in a safe, caring, and disciplined environment.
        </p>

        {/* Social Media Links */}
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/profile.php?id=100063849761727&rdid=6SV0NDdAMA6gXZ87&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17rK498DKM%2F#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <Facebook className="w-5 h-5" />
          </a>

          <a
            href="https://www.instagram.com/st.kabir_school90/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <Instagram className="w-5 h-5" />
          </a>

          <a
            href="https://www.youtube.com/@stkabirpublicsrsecschool"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-10 h-10 bg-primary/20 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="font-display text-lg mb-4 text-accent">
          Quick Links
        </h4>

        <ul className="space-y-2 text-sm">
          {[
            { label: "Home", path: "/" },
            { label: "About Us", path: "/about" },
            { label: "Facilities", path: "/facilities" },
            { label: "Gallery", path: "/gallery" },
            { label: "Syllabus", path: "/syllabus" },
            { label: "Career", path: "/career" },
            { label: "Contact Us", path: "/contact" },
          ].map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="opacity-80 hover:opacity-100 hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Information */}
      <div>
        <h4 className="font-display text-lg mb-4 text-accent">
          Contact Info
        </h4>

        <div className="space-y-3 text-sm">
          <p className="flex items-start gap-2">
            <Phone className="w-4 h-4 mt-0.5 text-primary shrink-0" />
            <span>+91-9813177106, 9813177141</span>
          </p>

          <p className="flex items-start gap-2">
            <Mail className="w-4 h-4 mt-0.5 text-primary shrink-0" />
            <a
              href="mailto:stkabirpublicschool.dhr@gmail.com"
              className="hover:text-primary transition-colors break-all"
            >
              stkabirpublicschool.dhr@gmail.com
            </a>
          </p>

          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
            <span>
              St. Kabir Public Sr. Sec. School, NRP Bass Road, Alawalpur,
              Dharuhera, Rewari
            </span>
          </p>

          {/* WhatsApp QR Code */}
          <div className="pt-6 border-t border-cream/10 mt-6">
            <p className="text-accent font-display text-sm mb-3">
              For direct message on WhatsApp, scan here
            </p>

            <div className="bg-white p-2 rounded-xl inline-block shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={whatsappQr}
                alt="WhatsApp QR Code"
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Copyright and Developer Credit */}
    <div className="border-t border-cream/20 text-center py-5 px-4 space-y-2">
      <p className="text-xs opacity-60">
        © {new Date().getFullYear()} St. Kabir Public Sr. Sec. School.
        All rights reserved.
      </p>

      <p className="text-xs sm:text-sm text-cream/70">
        Designed &amp; Developed by{" "}
        <a
          href="https://metawebkit.in"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Meta Webkit website"
          className="inline-block font-semibold text-accent underline underline-offset-4 decoration-accent/70 hover:text-white hover:decoration-white transition-all duration-300"
        >
          Meta Webkit
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;