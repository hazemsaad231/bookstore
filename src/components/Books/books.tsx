import axios from "axios";
import { useCallback, useState } from "react";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, NativeSelect, TextField } from "@mui/material";
import { FaArrowDown, FaArrowUp,FaShoppingCart } from "react-icons/fa";
import { Link} from "react-router-dom";
import Load from "../load/load";
import { useDispatch } from "react-redux";
import { addToCart, addToFavorite } from "../../redux/counter";
import { toast, ToastContainer } from "react-toastify";
import { MdFavoriteBorder } from "react-icons/md";
import { useQuery } from "react-query";
import { BOOKS_API } from "../Api/api";




interface Book {
  name: string;
  price: number;
}


const Books = () => {
  const [showPrice, setShowPrice] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState("alphabetical");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const dispatch = useDispatch();

  
 

  
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id: any) => {
    setOpen(true);
    setSelectedDelete(id);
  };

  const handleClose = () => {

    setOpen(false);
  };

  const handleDelete = useCallback(  async () => {

    try {

      await axios.delete(`${BOOKS_API}/${selectedDelete}`);
      toast('Delete is successful!');
      getBooks();
      handleClose();
    
    } catch (errors) {
      console.log(errors);
    }
  }, [selectedDelete]);






  const handleAddToCart = (book: any) => {
    dispatch(addToCart(book));
  };

  const handleAddMyFavorite = (book: any) => {
    dispatch(addToFavorite(book));
  };

  const role = localStorage.getItem("role");

  const getBooks = async () => {
    
    return await axios.get(BOOKS_API);

  }
 const {data,isLoading} = useQuery('allBooks',getBooks,{
   refetchInterval: 500,
   refetchOnWindowFocus: true
 });
 const books = data?.data;

 const [displayCount, setDisplayCount] = useState(8);

 const filteredBooks = books?.filter((book:{  category: string, price: string}) => {
  const price = parseFloat(book.price);
  const min = parseFloat(minPrice) || 0;
  const max = parseFloat(maxPrice) || Infinity;
  const isPriceValid = price >= min && price <= max;
  const isCategoryValid = selectedCategories.length === 0 || selectedCategories.includes(book.category);
  return isPriceValid && isCategoryValid;
})
.sort((a:Book, b:Book) => {
  if (sortOption === "alphabetical") return a.name.localeCompare(b.name);
  if (sortOption === "priceLowToHigh") return a.price - b.price;
  if (sortOption === "priceHighToLow") return b.price - a.price;
  return 0;
});

const search = filteredBooks ;


 const [current, setCurrent] = useState(1);
  const itemsPerPage = displayCount;
  const lastIndex = current * itemsPerPage;
  const startIndex = lastIndex - itemsPerPage;
 const totalPages = Math.ceil(search?.length / itemsPerPage)
 const currentBooks = search?.slice(startIndex, lastIndex).slice(0, displayCount);

 
  const togglePrice = () => setShowPrice(!showPrice);
  const toggleCategory = () => setShowCategory(!showCategory);
  

  const handleCategoryChange = (event: any) => {
    const { name, checked } = event.target;
    setSelectedCategories((prev: any) => checked ? [...prev, name] : prev.filter((category: any) => category !== name));
  };

 
  
  const [clickedIcons, setClickedIcons] = useState<{ [key: string]: boolean }>({});

  const changeIconColor = (id: string) => {
    setClickedIcons((prev) => ({
      ...prev,
      [id]: !prev[id], // يعكس الحالة (true/false)
    }));
  };
  
  


  const clearFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    setDisplayCount(8);
    setSortOption("alphabetical");
    setSelectedCategories([]);
    setShowPrice(false);
    setShowCategory(false);
  };

  const filter = () => {
    setShowPrice(true);
    setShowCategory(true);
  };

  return (

    <>
      {isLoading? <Load />:
    <div className="flex flex-col p-2">
      <ToastContainer />
    
    
         
        <div className="flex gap-4">
          <div className="hidden sm:hidden md:hidden lg:block xl:block">
            <div className="flex flex-col gap-2 w-60 p-2">
              <button className="bg-indigo-800 text-white p-2 rounded" onClick={filter}>filter</button>
              <ul>
                <div className="flex justify-between m-4">
                  <li className="text-indigo-800 font-bold">Price</li>
                  <button onClick={togglePrice} className="ml-2">
                    {showPrice ? <FaArrowUp color="indigo" /> : <FaArrowDown color="indigo" />}
                  </button>
                </div>

                {showPrice && (
                  <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '10ch' } }} noValidate autoComplete="off">
                    <TextField
                      id="min-price"
                      label="Min $"
                      variant="outlined"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <TextField
                      id="max-price"
                      label="Max $"
                      variant="outlined"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </Box>
                )}

                <div className="flex justify-between m-4">
                  <li className="text-indigo-800 font-bold">Category</li>
                  <button onClick={toggleCategory}>
                    {showCategory ? <FaArrowUp color="indigo" /> : <FaArrowDown color="indigo" />}
                  </button>
                </div>

                {showCategory && (
                  <FormGroup style={{ marginLeft: '15px' }}>
                    <FormControlLabel control={<Checkbox name="love" onChange={handleCategoryChange} />} label="love" />
                    <FormControlLabel control={<Checkbox name="sports" onChange={handleCategoryChange} />} label="sports" />
                    <FormControlLabel control={<Checkbox name="self-help" onChange={handleCategoryChange} />} label="Self-help" />
                    <FormControlLabel control={<Checkbox name="food" onChange={handleCategoryChange} />} label="food" />
                    <FormControlLabel control={<Checkbox name="kids" onChange={handleCategoryChange} />} label="kids" />
                    <FormControlLabel control={<Checkbox name="history" onChange={handleCategoryChange} />} label="history" />
                    <FormControlLabel control={<Checkbox name="other" onChange={handleCategoryChange} />} label="other" />
                  </FormGroup>
                )}
              </ul>
              <button onClick={clearFilter} className="bg-[rgb(237,85,59)] px-4 py-2 rounded-md text-white">Clear Filter</button>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center p-1">
              <Box sx={{ minWidth: 80 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" sx={{ color: 'indigo' }}>Sort by:</InputLabel>
                  <NativeSelect
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, color: 'indigo.800' }}
                  >
                    <option value="alphabetical" className="text-indigo-800">Alphabetically, A-Z</option>
                    <option value="priceLowToHigh" className="text-indigo-800">Price: Low to High</option>
                    <option value="priceHighToLow" className="text-indigo-800">Price: High to Low</option>
                  </NativeSelect>
                </FormControl>
              </Box>

           
                <span className="text-indigo-800 text-md sm:text-md md:text-lg lg:text-xl xl:text-xl mt-1 text-center w-full font-semibold">
                  Showing {displayCount} books
                </span> 
              

              <Box sx={{ minWidth: 80 }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" sx={{ color: 'indigo' }}>Show:</InputLabel>
                  <NativeSelect
                    value={displayCount}
                    onChange={(e) => setDisplayCount(parseInt(e.target.value))}
                    sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, color: 'indigo.800' }}
                  >
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={books?.length}>all</option>
                  </NativeSelect>
                </FormControl>
              </Box>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 py-6 ">
              {currentBooks?.map((book: any) => (
                <div key={book.id} className="text-center relative group">
                  <div className="shadow-xl mx-2 sm:mx-8 md:mx-8 lg:mx-6 xl:mx-2 rounded-xl p-4  bg-slate-50 ">
                  <div className="transform hover:scale-105 transition duration-300">
                   
                    <img
                      src={book.image || 'default_image_url'} // إضافة صورة افتراضية إذا لم توجد صورة
                      alt={book.name}
                      className="w-full h-60 mb-4 m-auto rounded-xl shadow-lg"
                      loading="lazy"
                    />

<div className="absolute inset-0 flex flex-col justify-end mb-8 items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
           
              
           { role === 'Customer' ?
           <button className=" bg-[rgb(237,85,59)] text-white w-full py-2">
             <Link to={`/home/details/${book.id}`} className="text-white">View Details</Link> </button>:
             <button className=" bg-indigo-600 text-white w-full py-2">
             <Link to={`/home/details/${book.id}`} className="text-white">View Details</Link> </button>
             }
             { role === 'Admin' ?
              <button className="bg-[rgb(237,85,59)] text-white w-full py-2">
             <Link to={`/home/addBook/${book.id}`} className="text-white">Update</Link></button>:null
             }

           { role === 'Customer' ?
           <button className="bg-indigo-600 text-white w-full  py-2">
           <FaShoppingCart size={30} onClick={() => handleAddToCart(book)} className="m-auto" /></button>:
           <button className="bg-indigo-600 text-white w-full  py-2"
           onClick={() => handleClickOpen(book.id)

           }
           >
            delete
           </button>
           
          }
        </div>




       </div>
                     <div className="mt-2 cursor-pointer">
                 { role === 'Customer' ?
                         <MdFavoriteBorder 
                         size={24} 
                         color={clickedIcons[book.id] ? "red" : "gray"} 
                         onClick={() => {changeIconColor(book.id);  handleAddMyFavorite(book)}}
                         
                         className="cursor-pointer"
                       />
                          :
                        <div></div>
                         }
                 </div>
                     <div className="flex justify-between text-gray-600 font-semibold text-sm">
                      <h3>Name</h3>
                     <h3>{book.name}</h3>
                     </div>
                   <div className="flex justify-between text-gray-600 text-sm">
                    <h4>Author</h4>
                   <p>{book.author}</p>
                   </div>
                   <div className="flex justify-between text-gray-600 text-sm">
                    <h4>Price</h4>
                   <p>${book.price}</p>
                   </div>
               
                  
                 
                   </div>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            boxShadow: "none", // لإزالة الظل من المربع
            backgroundColor: "white", // تغيير لون خلفية الحوار
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0)", // تغيير لون خلفية التعتيم للشفافية
          },
        }}
       >
        <DialogTitle sx={{ fontSize: "1rem" }}>{"Are you sure you want to delete this book?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={() =>{ handleDelete()
            handleClose()
          }}>Delete</Button>
        </DialogActions>
      </Dialog>
                </div>
                
              ))}

            </div>

            <div className="m-auto py-8">
            <button
              onClick={() => setCurrent(current > 1 ? current - 1 : current)}
              className="px-1 py-2 mx-1 text-white bg-[rgb(237,85,59)] rounded-full p-1"
              disabled={current === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index + 1)}
                className={`px-1 py-2 mx-1 rounded ${current === index + 1 ? 'bg-[rgb(237,85,59)] text-white rounded-full' : 'bg-gray-300 rounded-full'}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrent(current < totalPages ? current + 1 : current)}
              className="px-1 py-2 mx-1 text-white bg-[rgb(237,85,59)] rounded-full p-1"
              disabled={current === totalPages}
            >
              Next
            </button>
          </div>



          </div>

          </div>

    </div>
    }
    </>
  );
};

export default Books;


