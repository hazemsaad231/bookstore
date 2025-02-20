import { useState,useCallback} from "react";
import { Rating, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";






const ReviewSystem = ({bookId}: {bookId: any}) => {

 const role = localStorage.getItem("role")

  const queryClient = useQueryClient();

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [addReview, setAddReview] = useState(false);

console.log(bookId);
  const AddReview = () => {
    setAddReview(true);
  };
  const CloseReview = () => {
    setAddReview(false);
  }

  const getReviews = async () => {
    const response = await axios.get(`https://backend-production-65d5.up.railway.app/reviews`);
    return response.data;
  }


  const { data , isLoading }: any = useQuery(["reviews", bookId], getReviews, 
    { refetchInterval: 4000 });

    console.log(data);


  // فلترة التقييمات بناء على الكتاب المحدد
  const review = data?.filter((review: any) => review.bookId === bookId);

  // إضافة تقييم جديد
  const handleSubmit = async() => {
    if (rating && comment.trim() !== "") {
      try {
        await axios.post(`https://backend-production-65d5.up.railway.app/reviews`, { rating, comment, bookId });
        setRating(0);
        setComment("")
        queryClient.invalidateQueries(["reviews", bookId]); // تحديث البيانات بعد الإضافة
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };


  
  const handleClearReviews = useCallback(async () => {
    if (!bookId) {
      return;
    }
    try {
      await axios.delete(`https://backend-production-65d5.up.railway.app/reviews/${bookId}`);
      console.log("Reviews for book deleted successfully.");
    } catch (errors) {
      console.error("Error deleting reviews:", errors);
    }
  }, [bookId]);
  


  return (

    <>
    <div className="flex flex-col items-center gap-2">

{isLoading && <div>Loading...</div>}

    {/* عرض التقييمات */}
  <div className="w-80 flex flex-col justify-center items-center gap-1">
  
      
   
        <Typography variant="h5" sx={{ letterSpacing: "1px" ,fontWeight: "bold"}}>Reviews</Typography>
        {review?.map((review: any, index:number) => (
          <div key={index} className="flex flex-col p-1 gap-1 justify-center items-center w-full">
            <Typography variant="subtitle1" className="text-start w-max">⭐ {review.rating} Stars</Typography>
            <Typography variant="body2" className="text-start w-max border p-2 rounded-full">{review.comment}</Typography>
          </div>
        ))}
      </div>


      <Button variant="outlined" color="primary" onClick={AddReview}>
        Add Review
      </Button>

{addReview &&
<>
      <Typography variant="h5">Rate & Review</Typography>
 

      {/* عرض التقييمات */}
      <Rating
        name="product-rating"
        value={rating}
        onChange={(_event, newValue) =>
          newValue !== null && setRating(newValue)}
      />

      {/* إدخال التعليق */}
      <TextField
        label="Your Review"
        multiline
        rows={1}
        sx={{width: "250px"}} 
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* زر الإرسال */}
      <Button variant="contained" color="primary" onClick={() => {handleSubmit(); CloseReview()}}>
        Submit Review
      </Button>
</>
      }
      {role==="Admin" &&
  <Button variant="outlined" color="secondary" onClick={handleClearReviews}>
  Clear All Reviews
</Button>
}
    </div> 
    </>
  );
};

export default ReviewSystem;


