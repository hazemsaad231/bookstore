import { FaFacebookF, FaTwitter, FaInstagram, FaLocationArrow, FaPhoneAlt } from 'react-icons/fa';
import { IoBookSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <div className='w-full bg-primary flex justify-center' id='contact'>
      <footer className="bg-primary text-white py-12 w-full" >
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 px-10">

            {/* Logo and Contact */}
            <div className="lg:col-span-2">
              <div className='flex items-center gap-4 mb-4'>
                <IoBookSharp className='text-6xl text-white' />
                <h2 className="text-2xl font-bold">Bookstore</h2>
              </div>
              <ul className="space-y-2 text-center">
                <li className='flex items-center gap-2 text-sm'>
                  <FaLocationArrow className='text-lg' />
                  <span>123 Book Street, Cairo, Egypt</span>
                </li>
                <li className='flex items-center gap-2 text-sm'>
                  <FaPhoneAlt className='text-lg' />
                  <span>+201062588052</span>
                </li>
              </ul>
            </div>

            {/* Book Categories */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-lg mb-4">Book Categories</h3>
              <ul className="space-y-2">
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>Fiction</li>
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>Non-Fiction</li>
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>Bestsellers</li>
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>New Releases</li>
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>Children's Books</li>
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>About Us</li>
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>Contact</li>
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>Privacy Policy</li>
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>Terms of Service</li>
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>FAQs</li>
              </ul>
            </div>

            {/* About Bookstore */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-lg mb-4">About Bookstore</h3>
              <ul className="space-y-2">
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>Our Story</li>
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>Help Center</li>
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>Guides</li>
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>Partner Network</li>
                <li className='text-sm hover:text-gray-300 cursor-pointer transition-colors'>Advertise</li>
              </ul>
            </div>

            {/* Follow Us and Newsletter */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-lg mb-4 text-center">Follow Us</h3>
              <div className='flex justify-center gap-4 mb-6'>
                <FaFacebookF className="text-xl hover:text-blue-500 cursor-pointer transition-colors" />
                <FaTwitter className="text-xl hover:text-blue-400 cursor-pointer transition-colors" />
                <FaInstagram className="text-xl hover:text-pink-500 cursor-pointer transition-colors" />
              </div>
            
            </div>

          </div>

          <div className="text-center mt-12 pt-8 border-t border-gray-600">
            <p className="text-sm">© 2025 Bookstore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

