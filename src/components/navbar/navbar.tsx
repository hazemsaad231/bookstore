import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { BiClipboard } from "react-icons/bi";
import { MdFavoriteBorder, MdOutlineBookmarkBorder } from "react-icons/md";
import { CiLogin, CiCircleRemove } from 'react-icons/ci';
import { VscListFlat } from "react-icons/vsc";

// Internal Imports
import logo from '../../assets/img/logo.png';
import { RootState } from "../../redux/store";
import { setUserData, logout } from "../../redux/counter";
import ConfirmDialog from "../../ui/ConfirmDialog";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux State
  const counterState = useSelector((state: RootState) => state.counter);
  const favouriteData = useSelector((state: RootState) => state.counter.favoriteItems);
  const orderItems = useSelector((state: RootState) => state.counter.items);

  // Local State
  const [open, setOpen] = useState(false);
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = counterState.userData?._id || localStorage.getItem("id");

  useEffect(() => {
    dispatch(setUserData());
    
    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const toggleNavbar = () => setNavbarVisible(!isNavbarVisible);
  const handleLogout = () => {
    // remove only auth keys so cart/favorites remain in localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('data');
    dispatch(logout());
    navigate("/login");
  };

  const navLinks = role === 'Customer' 
    ? [
        { name: 'HOME', path: '/home' },
        { name: 'BOOKS', path: '/book' },
        { name: 'MY ORDERS', path: `/myOrders/${userId}` },
      ]
    : [
        { name: 'HOME', path: '/home' },
        { name: 'BOOKS', path: '/book' },
        { name: 'ADD BOOK', path: '/addBook' },
      ];

  return (
    <>
      {/* Upper Social Bar - محسّن */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative flex justify-between items-center w-full px-4 md:px-8 py-3">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleNavbar}
            className="lg:hidden text-white hover:text-indigo-200 transition-colors duration-300 z-50"
          >
            {isNavbarVisible ? (
              <CiCircleRemove size={28} className="animate-spin-slow" />
            ) : (
              <VscListFlat size={28} />
            )}
          </button>
          
          {/* Social Icons */}
          <div className="flex items-center gap-3 ml-auto lg:ml-0">
            {[FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon].map((Icon, idx) => (
              <a 
                key={idx}
                href="#"
                className="text-white hover:text-indigo-300 transform hover:scale-110 transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Promotional Text - Hidden on mobile */}
          <div className="hidden md:flex items-center text-white text-sm font-light">
            <span className="animate-pulse mr-2">📚</span>
            Free shipping on orders over $50
          </div>
        </div>
      </div>

      {/* Main Navbar - محسّن بشكل كامل */}
      <nav className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-lg border-b-0' : 'shadow-sm border-b-2 border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center py-4">
            {token ? (
              <>
                {/* Welcome Message & Logo Section */}
                <div className="flex items-center gap-4">
                  <img 
                    src={logo} 
                    alt="Logo" 
                    className="w-12 h-12 md:w-16 md:h-16 object-contain hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="hidden md:block">
                    <h1 className="text-lg font-bold text-gray-800 leading-tight">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        Welcome
                      </span>
                    </h1>
                    <p className="text-sm text-gray-600 font-medium">
                      {counterState.userData?.first_name} {counterState.userData?.last_name}
                    </p>
                  </div>
                </div>

                {/* Desktop Navigation Links */}
                <ul className="hidden lg:flex items-center gap-8">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.path}
                        className="relative text-gray-700 font-semibold text-md tracking-wide hover:text-indigo-600 transition-colors duration-300 group"
                      >
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Action Icons */}
                <div className="flex items-center gap-4 md:gap-5">
              
                  {role === 'Customer' ? (
                    <>
                      {/* Cart */}
                      <Link 
                        to="/all" 
                        title="Cart"
                        className="relative group"
                      >
                        <div className="p-2 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 group-hover:from-indigo-100 group-hover:to-purple-100 transition-all duration-300">
                          <BiClipboard size={20} className="text-indigo-700 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <EnhancedBadge count={counterState.cartAmount} color="bg-blue-600" />
                      </Link>

                      {/* Favorites */}
                      <Link 
                        to="/favourite" 
                        title="Favorites"
                        className="relative group"
                      >
                        <div className="p-2 rounded-full bg-gradient-to-br from-red-50 to-pink-50 group-hover:from-red-100 group-hover:to-pink-100 transition-all duration-300">
                          <MdFavoriteBorder size={22} className="text-red-600 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <EnhancedBadge count={favouriteData.length} color="bg-red-600" />
                      </Link>
                    </>
                  ) : (
                    /* Orders */
                    <Link 
                      to="/orders" 
                      title="Orders"
                      className="relative group"
                    >
                      <div className="p-2 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 group-hover:from-indigo-100 group-hover:to-purple-100 transition-all duration-300">
                        <MdOutlineBookmarkBorder size={22} className="text-indigo-700 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <EnhancedBadge count={orderItems.length} color="bg-indigo-600" />
                    </Link>
                  )}
                  
                  {/* Logout */}
                  <button 
                    onClick={() => setOpen(true)}
                    title="Logout"
                    className="p-2 rounded-full bg-gradient-to-br from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 transition-all duration-300 group"
                  >
                    <CiLogin size={22} className="text-red-600 group-hover:rotate-180 transition-transform duration-500" />
                  </button>
                </div>
              </>
            ) : (
              /* Auth Section for non-logged users */
              <div className="w-full flex items-center justify-between">
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-14 h-14 object-contain hover:scale-110 transition-transform duration-300" 
                />
                
                <div className="flex items-center gap-3">
                  <Link 
                    to="/login" 
                    className="px-5 py-2 text-sm font-semibold text-indigo-700 border-2 border-indigo-600 rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/login/register" 
                    className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu - محسّن */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
        isNavbarVisible ? 'visible opacity-100' : 'invisible opacity-0'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleNavbar}
        ></div>
        
        {/* Menu Content */}
        <div className={`absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
          isNavbarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
            {/* User Info */}
            {token && (
              <div className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {counterState.userData?.first_name?.[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">
                      {counterState.userData?.first_name} {counterState.userData?.last_name}
                    </p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <ul className="space-y-2">
              {token ? (
                navLinks.map(link => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      onClick={toggleNavbar}
                      className="block px-4 py-3 rounded-lg text-gray-700 font-semibold hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      onClick={toggleNavbar}
                      className="block px-4 py-3 rounded-lg text-gray-700 font-semibold hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/login/register" 
                      onClick={toggleNavbar}
                      className="block px-4 py-3 rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-center"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Logout Dialog */}
      <ConfirmDialog
        open={open}
        title="Are you sure you want to logout?"
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
        confirmText="Logout"
        cancelText="Close"
        confirmColor="warning"
      />
    </>
  );
};

// Enhanced Badge Component
const EnhancedBadge = ({ count, color }: { count: any; color: string }) => (
  count > 0 ? (
    <span className={`absolute -top-1 -right-1 ${color} text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md animate-bounce`}>
      {count > 99 ? '99+' : count}
    </span>
  ) : null
);

export default Navbar;