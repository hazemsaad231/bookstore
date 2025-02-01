import { Phone } from "@mui/icons-material"
import { Link} from "react-router-dom"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FaUser } from "react-icons/fa";
import { BiClipboard } from "react-icons/bi";
import logo from '../../assets/img/logo.png'
import Close from "./logout/close";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ReactNode, useEffect, useState } from "react";
import { setUserData } from "../../redux/counter";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import React from "react";
interface UserData {
  cartAmount: ReactNode;
  userData: {
    first_name: string;
    last_name: string;
  
  };
}




const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const userData:UserData = useSelector((state: RootState) => state.counter);

  const orderItems = useSelector((state: RootState) => state.counter.items);

  console.log(orderItems)


  const userDataString = localStorage.getItem("data");
  const user = userDataString ? JSON.parse(userDataString) : null;
  const userId = user?._id;

console.log(userId)


  const role = localStorage.getItem("role");
  console.log(role)

  useEffect(() => {

    dispatch(setUserData());
  }, [dispatch]);




  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const toggleNavbar = () => setNavbarVisible(!isNavbarVisible);

  return (
    <>
      <div className="flex justify-between items-center w-full p-4 bg-indigo-900 text-white">
        {/* تظهر فقط على الشاشات الصغيرة */}
        <GiHamburgerMenu
          size={25}
          className="block md:hidden"
          color="white"
          onClick={toggleNavbar}
        />

        <div className="flex gap-1">
          <Phone />
          <h2 className="text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">01062588052</h2>
        </div>

        <div className="flex gap-1">
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
          <LinkedInIcon />
        </div>
      </div>

      <div className="flex justify-around items-center w-full border-2 p-1">
        <div>
          <h1 className="text-md sm:text-md md:text-lg lg:text-xl xl:text-xl font-semibold text-indigo-900">
            <span className="text-indigo-700">Welcome </span>
            {userData.userData?.first_name} {userData.userData?.last_name}
          </h1>
        </div>

        <div>
          <img src={logo} alt="" className="w-16 hidden sm:hidden md:block lg:block xl:block" />
        </div>




{role === 'Customer' ? (
  <ul className="hidden md:flex gap-x-4 p-2 text-lg cursor-pointer">
    <li><Link to="/home">HOME</Link></li>
    <li className="border-x-2 border-gray-300 px-4"><Link to="book">BOOKS</Link></li>
    <li className=" px-4"><Link to={`/home/myOrders/${userId}`} >my orders</Link></li>
  </ul>
) : (
  <ul className="hidden md:flex gap-x-4 p-2 text-lg cursor-pointer">
    <li><Link to="/home">HOME</Link></li>
    <li className="border-x-2 border-gray-300 px-4"><Link to="book">BOOKS</Link></li>
    <li className=" px-4"><Link to="addBook">Add book</Link></li>
  </ul>
)}
       



        <ul className="flex gap-4 px-6 cursor-pointer relative top-1 p-1 ">
          <li><Link to="profile"><FaUser size={25} /></Link></li>
          {role === 'Customer' ? <li className="border-x-2 border-gray-300 px-4"><Link to="all"><BiClipboard size={25} /></Link>
          <span className="text-white relative bottom-10 left-3 bg-red-600 rounded-full p-1 text-sm">
              {userData.cartAmount}
            </span>
          </li>:  <li className="border-x-2 border-gray-300 px-2"><Link to="carts"><TbLayoutDashboardFilled size={28} /></Link></li>}
        {role !== 'Customer' ? <li className=" "><Link to="orders"><MdOutlineBookmarkBorder size={28} /></Link>
        <span className="text-white relative bottom-10 left-3 bg-red-600 rounded-full p-1 text-sm">
              {orderItems.length.toString()}
            </span></li>: 
            <li className=""><Link to={'favourite'}><MdFavoriteBorder size={28} /></Link></li>}
          <li className="border-l-2 border-gray-300 px-2"><Close /></li>
        </ul>
      </div>

      {/* القائمة المنسدلة للشاشات الصغيرة */}
      {isNavbarVisible && (
        <ul className="flex  gap-4 p-4 text-lg bg-gray-100 justify-center border-gray-300 md:hidden">
          <li><Link to="home" onClick={toggleNavbar}>HOME</Link></li>
          <li className=""><Link to="book" onClick={toggleNavbar}>BOOKS</Link></li>
          {role === 'Customer' ? <li className=""><Link to={`/home/myOrders/${userId}`} onClick={toggleNavbar}>my orders</Link></li>: <li><Link to={"addBook"} onClick={toggleNavbar}>Add book</Link></li>}
          
        </ul>
      )}
    </>
  );
};

export default Navbar;
