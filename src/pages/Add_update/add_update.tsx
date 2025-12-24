import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { BOOKS_API } from "@/Api/api";
import { success , Error } from '@/ui/toasts';  

// Icon components
const BookIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const DollarIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const ImageIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CategoryIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);



const AddBook = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({});
    const navigate = useNavigate();

    const { id } = useParams();

    console.log(id,'id');

    useEffect(() => {
        if (id) {
            const Update = async () => {
                try {
                    const res = await axios.get(`${BOOKS_API}/${id}`);
                    const book = res.data;
                    setValue("name", book.name);
                    setValue("description", book.description);
                    setValue("author", book.author);
                    setValue("price", book.price);
                    setValue("featured", book.featured);
                    setValue("new", book.new);
                    setValue("image", book.image);
                    setValue("category", book.category);
                    
                } catch (error) {
                    console.log(error);
                }
            };
            Update();
        }
    }, [id, setValue]);




    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data:any) => {
        try {
            if (id) {

                const response = await axios.put(`${BOOKS_API}/${id}`, data);
                console.log(response,'updated');
                setTimeout(() => {
                    navigate("/book")
                },2000)
            success("Update is successful");
            } else {
                const response = await axios.post(BOOKS_API, data);
                console.log(response);
                setTimeout(() => {
                    navigate("/book")
                },2000)
               
                success("Add is successful");
            }
        } catch (error) {
            console.error(error);
            Error("An error occurred during the operation.");
        }
    };



    

    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 px-6 py-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center tracking-wide">
                            {id ? "Update Book" : "Add New Book"}
                        </h1>
                        <p className="text-blue-100 text-center mt-2">
                            {id ? "Modify the book details below" : "Fill in the details to add a new book to your collection"}
                        </p>
                    </div>

                    <div className="px-6 sm:px-8 lg:px-12 py-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Book Name */}
                                <div className="space-y-2">
                                    <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                                        <BookIcon />
                                        Book Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter book name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        {...register("name", { required: true })}
                                    />
                                    {errors.name && <span className="text-red-500 text-sm flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Name is required
                                    </span>}
                                </div>

                                {/* Author */}
                                <div className="space-y-2">
                                    <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                                        <UserIcon />
                                        Author
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter author name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        {...register("author", { required: true })}
                                    />
                                    {errors.author && <span className="text-red-500 text-sm flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Author is required
                                    </span>}
                                </div>

                                {/* Price */}
                                <div className="space-y-2">
                                    <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                                        <DollarIcon />
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter price"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        {...register("price", { required: true })}
                                    />
                                    {errors.price && <span className="text-red-500 text-sm flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Price is required
                                    </span>}
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                                        <CategoryIcon />
                                        Category
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        {...register("category", { required: true })}
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Religion">Religion</option>
                                        <option value="Literature">Literature</option>
                                        <option value="Self-Help">Self-Help</option>
                                        <option value="History">History</option>
                                        <option value="Children">Children</option>
                                        <option value="Business">Business</option>
                                        <option value="Cooking">Cooking</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Romance">Romance</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.category && <span className="text-red-500 text-sm flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Category is required
                                    </span>}
                                </div>

                                {/* Image URL */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                                        <ImageIcon />
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="Enter image URL (JPG, PNG, etc.)"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        {...register("image", {
                                            required: true,
                                            pattern: {
                                                value: /(\.(jpg|jpeg|png|gif|bmp|webp|svg)$)|(^https?:\/\/[^\s]+$)/i,
                                                message: 'Please enter a valid image URL'
                                            }
                                        })}
                                    />
                                    {errors.image && <span className="text-red-500 text-sm flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {'Image URL is required'}
                                    </span>}
                                </div>

                                {/* Description */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="flex text-sm font-semibold text-gray-700 items-center gap-2">
                                        <BookIcon />
                                        Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Enter book description"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                                        {...register("description", { required: true })}
                                    />
                                    {errors.description && <span className="text-red-500 text-sm flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Description is required
                                    </span>}
                                </div>

                                {/* Featured Book */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Featured Book
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        {...register("featured")}
                                    >
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>

                                {/* New Release */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        New Release
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        {...register("new")}
                                    >
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-center pt-6">
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    {id ? "Update Book" : "Add Book"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBook;
