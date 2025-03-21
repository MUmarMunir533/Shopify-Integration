import React from "react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-r bg-blue-dark text-white from-blue-100 to-purple-100 text-gray-800 py-10 animate__animated animate__fadeIn">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-2xl mb-3 transition-colors duration-300 hover:text-blue-600">
              Contact Us
            </h3>
            <p>DGround Faisalabad Pakistan</p>
            <p className="mt-2">(+92) 3027596283</p>
            <p className="mt-2">mumarmunir533@gmail.com</p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-2xl mb-3 transition-colors duration-300 hover:text-blue-600">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="transition transform duration-300 hover:-translate-y-1 hover:text-blue-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop-with-sidebar"
                  className="transition transform duration-300 hover:-translate-y-1 hover:text-blue-600"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition transform duration-300 hover:-translate-y-1 hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-300 pt-6 text-center">
          <p className="transition transform duration-300 hover:scale-105">
            &copy; {year} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
