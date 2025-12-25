import { FaFacebookF, FaTwitter, FaInstagram, FaLocationArrow, FaPhoneAlt } from 'react-icons/fa';
import { IoBookSharp, IoMailOutline } from "react-icons/io5";
import { MdOutlineArrowForward } from "react-icons/md";

const Footer = () => {
  return (
    <div className='w-full bg-primary' id='contact'>
      <footer className="relative bg-primary text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-48 translate-y-48"></div>
        
        <div className="relative container mx-auto px-4 pt-16 pb-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">

            {/* Logo and Contact - Enhanced */}
            <div className="lg:col-span-4">
              <div className='flex items-center gap-3 mb-6 group'>
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-all duration-300">
                  <IoBookSharp className='text-5xl text-white' />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Bookstore
                  </h2>
                  <p className="text-xs text-gray-300">Your Reading Paradise</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Discover thousands of books across all genres. Your next great read is waiting for you.
              </p>

              <div className="space-y-3">
                <div className='flex items-center gap-3 text-sm group cursor-pointer'>
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                    <FaLocationArrow className='text-base' />
                  </div>
                  <span className="group-hover:text-gray-200 transition-colors">123 Book Street, Cairo, Egypt</span>
                </div>
                
                <div className='flex items-center gap-3 text-sm group cursor-pointer'>
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                    <FaPhoneAlt className='text-base' />
                  </div>
                  <span className="group-hover:text-gray-200 transition-colors">+201062588052</span>
                </div>

                <div className='flex items-center gap-3 text-sm group cursor-pointer'>
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                    <IoMailOutline className='text-base' />
                  </div>
                  <span className="group-hover:text-gray-200 transition-colors">info@bookstore.com</span>
                </div>
              </div>
            </div>

            {/* Book Categories - Enhanced */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-lg mb-6 relative inline-block">
                Book Categories
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-white to-transparent"></span>
              </h3>
              <ul className="space-y-3">
                {['Fiction', 'Non-Fiction', 'Bestsellers', 'New Releases', 'Children\'s Books'].map((item, idx) => (
                  <li key={idx} className='text-sm text-gray-300 hover:text-white hover:translate-x-2 cursor-pointer transition-all duration-300 flex items-center gap-2 group'>
                    <MdOutlineArrowForward className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources - Enhanced */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-lg mb-6 relative inline-block">
                Resources
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-white to-transparent"></span>
              </h3>
              <ul className="space-y-3">
                {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service', 'FAQs'].map((item, idx) => (
                  <li key={idx} className='text-sm text-gray-300 hover:text-white hover:translate-x-2 cursor-pointer transition-all duration-300 flex items-center gap-2 group'>
                    <MdOutlineArrowForward className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* About Bookstore - Enhanced */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-lg mb-6 relative inline-block">
                About Bookstore
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-white to-transparent"></span>
              </h3>
              <ul className="space-y-3">
                {['Our Story', 'Help Center', 'Guides', 'Partner Network', 'Advertise'].map((item, idx) => (
                  <li key={idx} className='text-sm text-gray-300 hover:text-white hover:translate-x-2 cursor-pointer transition-all duration-300 flex items-center gap-2 group'>
                    <MdOutlineArrowForward className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Section - Enhanced */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-lg mb-6 relative inline-block">
                Stay Updated
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-white to-transparent"></span>
              </h3>
              
              {/* Newsletter Form */}
              <div className="mb-6">
                <p className="text-sm text-gray-300 mb-4">Subscribe to get latest updates & offers</p>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300"
                  />
                  <button className="absolute right-1 top-1 bottom-1 px-4 bg-white text-primary rounded-md hover:bg-gray-100 transition-all duration-300 font-semibold text-sm">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-sm font-semibold mb-4">Follow Us</h4>
                <div className='flex gap-3'>
                  <a href="#" className="p-3 bg-white/10 rounded-lg hover:bg-blue-600 hover:scale-110 transition-all duration-300 group">
                    <FaFacebookF className="text-lg group-hover:rotate-12 transition-transform" />
                  </a>
                  <a href="#" className="p-3 bg-white/10 rounded-lg hover:bg-blue-400 hover:scale-110 transition-all duration-300 group">
                    <FaTwitter className="text-lg group-hover:rotate-12 transition-transform" />
                  </a>
                  <a href="#" className="p-3 bg-white/10 rounded-lg hover:bg-pink-500 hover:scale-110 transition-all duration-300 group">
                    <FaInstagram className="text-lg group-hover:rotate-12 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar - Enhanced */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col justify-center items-center gap-4">
              <p className="text-sm text-gray-300">
                © 2025 <span className="font-semibold text-white">Bookstore</span>. All rights reserved.
              </p>
              
             
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;