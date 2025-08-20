import axios from "axios";
import { useCallback, useState } from "react";
import { Pagination,} from "@mui/material";
import Load from "../load/load";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from "react-query";
import { BOOKS_API } from "../Api/api";
import { useSelector } from "react-redux";
import { Book } from "@mui/icons-material";
import ConfirmDialog from "../dialog/ConfirmDialog";
import BookCard from "./BookCard";
import FilterSidebar from "./FilterSidebar";




interface Book {
  name: string;
  price: number;
}


const Books = () => {

  {/* fliter*/ }
  const [showPrice, setShowPrice] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState("alphabetical");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  

  
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

{/* Pagination */}
 const [current, setCurrent] = useState(1);
  const itemsPerPage = displayCount;
  const lastIndex = current * itemsPerPage;
  const startIndex = lastIndex - itemsPerPage;
 const totalPages = Math.ceil(search?.length / itemsPerPage)
 const currentBooks = search?.slice(startIndex, lastIndex).slice(0, displayCount);


 
  const favoriteItems = useSelector((state: any) => state.counter.favoriteItems);

 
console.log(favoriteItems)


  return (

    <>
      <ToastContainer />
      {isLoading? <Load />:
    <div className="flex flex-col md:flex-row h-full p-2">

<FilterSidebar
            showPrice={showPrice}
            setShowPrice={setShowPrice}
            showCategory={showCategory}
            setShowCategory={setShowCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            sortOption={sortOption}
            setSortOption={setSortOption}
            displayCount={displayCount}
            setDisplayCount={setDisplayCount}
            booksLength={books?.length || 0}
          />

        <div className="w-full flex flex-col gap-6 p-6">

          <BookCard currentBooks={currentBooks} handleClickOpen={handleClickOpen} />
<div>
<Pagination
    page={current}
    onChange={(_, value) => setCurrent(value)}
    count={totalPages}

  />
</div>


          </div>

  

<ConfirmDialog
  open={open}
  title="Are you sure delete this book?"
  onClose={handleClose}
  onConfirm={handleDelete}
  confirmText="Delete"
  cancelText="Close"
  sx={{
    "& .MuiDialog-paper": {
      boxShadow: "0px 8px 24px rgba(0,0,0,0.3)",
      borderRadius: "12px", 
    },
  }}
/>



          </div>

          

    
    }
    </>
  );
};

export default Books;
