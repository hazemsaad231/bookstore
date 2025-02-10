import { useState, useEffect, useCallback } from "react";
import { Rating, Typography, TextField, Button } from "@mui/material";
import axios from "axios";


interface Review {
  bookId: string;
  rating: number;
  comment: string;
}


const ReviewSystem = ({bookId}: {bookId: any}) => {

 const role = localStorage.getItem("role")


  useEffect(() => {
    if(bookId){
      console.log(bookId)
    }else{
      console.log("no book id")
    }
  })



  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  // تحميل التقييمات المحفوظة عند تحميل الصفحة
 
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://backend-production-65d5.up.railway.app/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
  
    fetchReviews();
  }, [bookId]);
  const review = reviews?.filter((rev: any) => rev.bookId === bookId);

  console.log("Filtered Orders:", review);
  // إضافة تقييم جديد
  const handleSubmit = async() => {
    if (rating && comment.trim() !== "") {
      try {
        await axios.post(`https://backend-production-65d5.up.railway.app/reviews`, { rating, comment, bookId });
        const updatedReviews = [...reviews, { rating, comment, bookId }];
        setReviews(updatedReviews);
        setRating(0);
        setComment("")
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };


  // const handleClearReviews = async() => {
  // const response = await axios.delete(`https://backend-production-65d5.up.railway.app/reviews`);
  // console.log(response.data,"deleted");
  //   setReviews([]);
  // };
  const handleClearReviews = useCallback(  async () => {

    try {
      await axios.delete(`https://backend-production-65d5.up.railway.app/reviews`);
      console.log("Review deleted successfully.");
      setReviews(reviews.filter((rev: any) => rev.bookId !== bookId));
    
    } catch (errors) {
      console.log(errors);
    }
  }, [bookId]);


  return (
    <div className="flex flex-col items-center gap-2 ">

  {/* عرض التقييمات */}
  <div className="w-80 flex flex-col justify-center items-center">
        <Typography variant="h5" sx={{ letterSpacing: "1px" }}>Reviews</Typography>
        {review.map((review, index) => (
          <div key={index} className="py-2">
            <Typography variant="subtitle1">⭐ {review.rating} Stars</Typography>
            <Typography variant="body2">{review.comment}</Typography>
          </div>
        ))}
      </div>


      <Typography variant="h5">Rate & Review</Typography>

      {/* إدخال التقييم */}
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
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Review
      </Button>
      {role==="Admin" &&
  <Button variant="outlined" color="secondary" onClick={handleClearReviews}>
  Clear All Reviews
</Button>
}

    
    </div>
  );
};

export default ReviewSystem;


