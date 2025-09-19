import { useState } from "react";
import { apiConnector } from "../../../services/apiConnector";
import { coursesAPI } from "../../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function RatingAndReview({_id}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
    const {token}=useSelector((state) => state.auth);
  const handleSubmit = async () => {
    if (rating > 0) {
      await submitReviewToBackend();
      
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setReview("");
      }, 3000);
    }
  };
  const submitReviewToBackend = async () => {
    try{
        const result = await apiConnector("POST", coursesAPI.RatingAndReview_API, {courseId: _id, rating: rating, review: review,token: token } );
        console.log("Review submitted successfully:", result);
        setResponse(result.data.message || "Review submitted successfully!");
        setSubmitted(true);
        toast.success("Review submitted successfully!");
    }catch(error){
        console.error("Error submitting review:", error);
        toast.error(error.response?.data?.message);
        }
    }

  const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
    >
      <svg
        className={`w-8 h-8 ${
          filled ? "text-yellow-400" : "text-gray-600"
        } hover:text-yellow-400 transition-colors duration-200`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
          <p className="text-gray-300">{response}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Rate & Review</h2>
      
      <div className="space-y-6">
        {/* Rating Section */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Your Rating
          </label>
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= (hoverRating || rating)}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              />
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-sm text-gray-400 mt-2">
              {rating} out of 5 stars
            </p>
          )}
        </div>

        {/* Review Section */}
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-300 mb-2">
            Write Your Review
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your thoughts about your experience..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {review.length}/500
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
            rating === 0
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}