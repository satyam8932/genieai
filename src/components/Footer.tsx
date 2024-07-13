import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';


const Footer = () => {
  return (
    <footer className="bg-[rgb(15,23,42)] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div>
            <h3 className="text-lg font-semibold mb-2">GenieAI</h3>
            <p className="text-sm">A brief description of the company.</p>
          </div>
          
          {/* Middle Column */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="flex items-center mb-1">
              <Mail className="w-5 h-5 mr-2" />
              <span>info@company.com</span>
            </div>
            <div className="flex items-center mb-1">
              <Phone className="w-5 h-5 mr-2" />
              <span>+1 (123) 456-7890</span>
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Explore</h3>
            <ul>
              <li>
                <Link href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
