import { FaFacebookF, FaTwitter, FaInstagram,FaLocationArrow,FaPhoneAlt} from 'react-icons/fa';
import { IoBookSharp } from "react-icons/io5";


const Footer = () => {
  return (
    <div className='w-full bg-[rgb(237,85,59)] flex justify-center' id='contact'>
    <footer className="bg-[rgb(237,85,59)] text-white py-10" style={{fontFamily:"quicksand"}}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

          <div>

            <div className='flex gap-6'>
            <IoBookSharp className='text-8xl relative bottom-8'/>
            </div>
          

            <ul>
            <div className='flex gap-2 mb-2 relative bottom-4'>
                <FaLocationArrow className='text-2xl '/>
                <li className='text-sm font-thin'> hosary mosque, 6 october, cairo, egypt</li>
                </div>
                <div className='flex gap-2 mb-2'>
          <FaPhoneAlt className='text-2xl '/>
                <li className='text-sm font-thin'>+201062588052</li>
                </div>
       

              
           
            </ul>
          </div>


          <div>
            <h3 className="font-bold text-md mb-4">Our Products</h3>
            <ul>
            <li className='text-sm font-thin'>Career</li>
              <li className='text-sm font-thin'>book</li>
              <li className='text-sm font-thin'>Packages</li>
              <li className='text-sm font-thin'>Features</li>
              <li className='text-sm font-thin'>Priceline</li>  
              </ul>
           
          </div>

   
          <div>
            <h3 className="font-bold text-md mb-4">Resources</h3>
            <ul>
            <li className='text-sm font-thin'>Why choose us</li>
              <li className='text-sm font-thin'>Our Story</li>
              <li className='text-sm font-thin'>Investor Relations</li>
              <li className='text-sm font-thin'>Press Center</li>
              <li className='text-sm font-thin'>Cruises</li> 
              <li className='text-sm font-thin'>Developer</li> 
              </ul>
            </div>
          

          <div>
            <h3 className="font-bold text-md mb-4"> About Rentcars </h3>
            <ul>
              <li className='text-sm font-thin'>download</li>
              <li className='text-sm font-thin'>Help Centre</li>
              <li className='text-sm font-thin'>Guides</li>
              <li className='text-sm font-thin'>Partner Network</li>
              <li className='text-sm font-thin'> Advertise</li>
                        
                        

            </ul>
          </div>

   
          <div>
            <h3 className="font-bold text-md mb-4 flex justify-center items-center">Follow Us</h3>
           
           <div className='flex justify-center items-center gap-4'>
           <FaFacebookF className="text-xl hover:text-blue-500"/>
           <FaTwitter className="text-xl hover:text-blue-400"/>
           <FaInstagram className="text-xl hover:text-pink-500"/>
           </div>
          </div>


        </div>

        <div className="text-center mt-10">
          <p>© 2025 My Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;

