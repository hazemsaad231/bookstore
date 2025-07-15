import { Phone } from "@mui/icons-material"
import { Link, useNavigate} from "react-router-dom"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FaUser } from "react-icons/fa";
import { BiClipboard } from "react-icons/bi";
import logo from '../../assets/img/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ReactNode, useEffect, useState } from "react";
import { setUserData } from "../../redux/counter";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { CiLogin } from 'react-icons/ci'
import { VscListFlat } from "react-icons/vsc";
import { CiCircleRemove } from "react-icons/ci";




interface UserData {
  cartAmount: ReactNode;
  userData: {
    first_name: string;
    last_name: string;
  
  };
}




const Navbar = () => {
  const dispatch = useDispatch();
  const userData:UserData = useSelector((state: RootState) => state.counter);
  const favouriteData = useSelector((state: RootState) => state.counter.favoriteItems);

  const orderItems = useSelector((state: RootState) => state.counter.items);

  console.log(orderItems)

 const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const userDataString = localStorage.getItem("data");
  const user = userDataString ? JSON.parse(userDataString) : null;
  const userId = user?._id;

console.log(userId)

const handleClose = () => {

  setOpen(false);
};

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

        {isNavbarVisible ? (
          <CiCircleRemove
            size={25}
            className="block sm:block md:block lg:hidden xl:hidden"
            color="white"
            onClick={toggleNavbar}
          />
        ):
        <VscListFlat
          size={25}
          className="block sm:block md:block lg:hidden xl:hidden"
          color="white"
          onClick={toggleNavbar}
        />
      }
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

      <div className="flex justify-between items-center w-full border-2 px-2 pt-1">
        <div>
          <h1 className="text-md sm:text-md md:text-lg lg:text-xl xl:text-xl font-semibold text-indigo-900">
            <span className="text-indigo-700">Welcome </span>
            {userData.userData?.first_name}  {userData.userData?.last_name}
          </h1>
        </div>

        <div>
          <img src={logo} alt="" className="w-16 hidden sm:hidden md:block lg:block xl:block" />
        </div>




{role === 'Customer' ? (
  <ul className="hidden sm:hidden md:hidden lg:flex xl:flex gap-x-4 p-1 text-lg cursor-pointer">
    <li><Link to="/home">HOME</Link></li>
    <li className="border-x-2 border-gray-300 px-4"><Link to="book">BOOKS</Link></li>
    <li className=" px-2"><Link to={`/home/myOrders/${userId}`} >my orders</Link></li>
  </ul>
) : (
  <ul className="hidden sm:hidden md:hidden lg:flex xl:flex gap-x-4 p-1 text-lg cursor-pointer">
    <li><Link to="/home">HOME</Link></li>
    <li className= "border-x-2 border-gray-300 px-4 "><Link to="book">BOOKS</Link></li>
    <li className=" px-2"><Link to="addBook">Add book</Link></li>
  </ul>
)}
       



        <ul className="flex gap-x-4 pl-6 cursor-pointer relative top-3 ">
          <li><Link to="profile"><FaUser size={24} className="text-indigo-800"/></Link></li>
          {role === 'Customer' ? <li className="px-4"><Link to="all"><BiClipboard size={24} className="text-indigo-800"/></Link>
          <span className="text-white relative bottom-10 left-3 bg-red-600 rounded-full p-1 text-sm">
              {userData.cartAmount}
            </span>
          </li>: null}
        {role !== 'Customer' ? <li className=" "><Link to="orders"><MdOutlineBookmarkBorder size={25}className="text-indigo-800" /></Link>
        <span className="text-white relative bottom-10 left-3 bg-red-600 rounded-full p-1 text-sm">
              {orderItems.length.toString()}
            </span></li>: 
            <li><Link to={'favourite'}><MdFavoriteBorder size={25} className="text-indigo-800"/></Link>
             <span className="text-white relative bottom-10 left-3 bg-red-600 rounded-full p-1 text-sm">
              {favouriteData.length.toString()}
            </span>
            </li>}
          <li onClick={() => setOpen(true)}><CiLogin size={25} className="text-indigo-800"/></li>
        </ul>
      </div>

      {/* القائمة المنسدلة للشاشات الصغيرة */}
      {isNavbarVisible && (
        <ul className="flex border-x-[8px] border-indigo-800 rounded-xl gap-8 p-4 text-lg text-indigo-800 bg-white/50 justify-center  shadow-md">
          <li><Link to="home" onClick={toggleNavbar}>HOME</Link></li>
          <li className=""><Link to="book" onClick={toggleNavbar}>BOOKS</Link></li>
          {role === 'Customer' ? <li className=""><Link to={`/home/myOrders/${userId}`} onClick={toggleNavbar}>my orders</Link></li>: <li><Link to={"addBook"} onClick={toggleNavbar}>Add book</Link></li>}
          
        </ul>
      )}
       <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.2)", // لإزالة الظل من المربع
            backgroundColor: "white", // تغيير لون خلفية الحوار
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0)", // تغيير لون خلفية التعتيم للشفافية
          },
        }}
       >
        <DialogTitle sx={{fontSize:"1rem"}} >{"Are you sure you want to logout?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={() => {
             localStorage.removeItem('token')
             navigate('/login')
          }}
           
          >logout</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
