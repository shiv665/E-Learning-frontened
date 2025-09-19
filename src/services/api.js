

const BASE_URL = import.meta.env.VITE_URL_BASE_URL;


export const categories={
    CATEGORIES_API: BASE_URL+"api/v1/course/showAllTags",
    LOGIN_API: BASE_URL+"api/v1/user/sendOTP",
    SIGNUP_API: BASE_URL+"api/v1/user/signUp",
    LLOGIN_API: BASE_URL+"api/v1/user/login",
    CONTACT_API: BASE_URL+"api/v1/user/contactUs",
    IMAGE_API: BASE_URL+"api/v1/profile/updateProfilePicture",
    
    GET_USER_DETAILS: BASE_URL+"api/v1/profile/getUserDetails",
    

} 
export const coursesAPI={
    COURSE_CREATION_API: BASE_URL+"api/v1/course/createCourse",
    GET_ALL_COURSES_API: BASE_URL+"api/v1/course/getAllCourses",
    GET_COURSE_API: BASE_URL+"api/v1/course/getCourseDetails",
    SECTION_API: BASE_URL+"api/v1/course/addSection",
    GET_SECTION_API: BASE_URL+"api/v1/course/getSectionDetails",
    SUBSECTION_API: BASE_URL+"api/v1/course/addSubSection",
    GET_COURSE_INSTRUCTOR: BASE_URL+"api/v1/course/getAllCoursesByInstructor",
    GET_COURSE_STUDENT_ENROLLED: BASE_URL+"api/v1/course/getAllOfStudentEnrolled",
    DELETE_SUBSECTION_API: BASE_URL+"api/v1/course/deleteSubSection",
    SECTION_API_DELETE: BASE_URL+"api/v1/course/deleteSection",
    RatingAndReview_API: BASE_URL+"api/v1/course/createRatingAndReview",
    GET_AVERAGE_RATING_API: BASE_URL+"api/v1/course/getAverageRating",

}

export const userAPI={
    UPDATE_PROFILE_API: BASE_URL+"api/v1/profile/updateProfile",
    GET_USER_DETAILS_API: BASE_URL+"api/v1/profile/getAllProfileData",
    DELETE_ACCOUNT_API: BASE_URL+"api/v1/profile/deleteAccount",
    RESET_TOKEN_PASSWORD_API: BASE_URL+"api/v1/user/resetPasswordToken",
    RESET_PASSWORD_API: BASE_URL+"api/v1/user/resetPassword",
}
export const paymentAPI={
    PAYMENT_API: BASE_URL+"api/v1/payment/capturePayment",
    PAYMENT_VERIFY_API: BASE_URL+"api/v1/payment/verifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL: BASE_URL+"api/v1/payment/sendPaymentSuccessEmail",
}