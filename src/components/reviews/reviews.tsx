import { useState, useEffect } from "react";
import { Rating, Typography, TextField, Button } from "@mui/material";

interface Review {
  rating: number;
  comment: string;
}

const ReviewSystem = ({bookId}: {bookId: any}) => {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);

  // تحميل التقييمات المحفوظة عند تحميل الصفحة
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`reviews${bookId}`) || "[]");
    setReviews(storedReviews);
  }, [bookId]);


  const role = localStorage.getItem("role");



  // إضافة تقييم جديد
  const handleSubmit = () => {
    if (rating && comment.trim() !== "") {
      const newReview = { rating, comment };
      const updatedReviews = [...reviews, newReview];

      setReviews(updatedReviews);
      localStorage.setItem(`reviews${bookId}`, JSON.stringify(updatedReviews));

      setRating(0);
      setComment("");
    }
  };
  const handleClearReviews = () => {
    setReviews([]);
    localStorage.removeItem(`reviews${bookId}`);
  };


  return (
    <div className="flex flex-col items-center gap-2 ">

  {/* عرض التقييمات */}
  <div className="w-80 flex flex-col justify-center items-center">
        <Typography variant="h5" sx={{ letterSpacing: "1px" }}>Reviews</Typography>
        {reviews.map((review, index) => (
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
        onChange={(_event, newValue) => setRating(newValue)}
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
{role === "admin" && (
  <Button variant="outlined" color="secondary" onClick={handleClearReviews}>
  Clear All Reviews
</Button>
)}


    
    </div>
  );
};

export default ReviewSystem;


