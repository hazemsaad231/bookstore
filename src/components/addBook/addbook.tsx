import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

const AddBook = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({});
    const navigate = useNavigate();

    const { id } = useParams();

    console.log(id,'id');

    useEffect(() => {
        if (id) {
            const Update = async () => {
                try {

                    const res = await axios.get(`https://backend-production-65d5.up.railway.app/books/${id}`);
                    const book = res.data;
                    setValue("name", book.name);
                    setValue("description", book.description);
                    setValue("author", book.author);
                    setValue("price", book.price);
                    setValue("favourite", book.favourite);
                    setValue("profile", book.profile);
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
               
                const response = await axios.put(`https://backend-production-65d5.up.railway.app/books/${id}`, data);
                console.log(response,'updated');
                setTimeout(() => {
                    navigate("/home/book")
                },2000)
               
                toast("Update is successful");
            } else {
                const response = await axios.post("https://backend-production-65d5.up.railway.app/books", data);
                console.log(response);
                setTimeout(() => {
                    navigate("/home/book")
                },2000)
               
                toast("Add is successful");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during the operation.");
        }
    };

    return (
        <div className="bg-gradient-to-r border from-red-100 to-white ">

            <ToastContainer />
            <div className=" w-max m-auto px-8 sm:px-8 md:px-20 lg:px-20 xl:px-20 py-5 shadow-2xl mt-10 mb-10 bg-white  rounded-xl ">
            <h1 className="text-md sm:text-md md:text-lg lg:text-lg xl:text-xl  mt-2 mb-10 font-sans text-center tracking-[0.2em]">{id ? "Update Book" : "Add Book"}</h1>
    
    <div className="flex flex-col justify-center items-center">
    <form onSubmit={handleSubmit(onSubmit)}>
             <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 xl:gap-10 place-items-center  m-auto">
                 <div className="flex flex-col">
                    <label htmlFor="">Name</label>
                     <input type="text" placeholder="Enter name" className="border w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-8 shadow" {...register("name", { required: true })} />
                     {errors.name && <span className="text-red-500">Name is required</span>}
                </div>
                <div className="flex flex-col mt-2">
                     <label htmlFor="">Description</label>
                     <input type="text" placeholder="Enter description" className="border  w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-8 shadow" {...register("description", { required: true })} />
                    {errors.description && <span className="text-red-500">Description is required</span>}
                </div>
                 <div className="flex flex-col mt-2">
                     <label htmlFor="">Author</label>
                     <input type="text" placeholder="Enter author" className="border  w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-8 shadow" {...register("author", { required: true })} />
                     {errors.author && <span className="text-red-500">Author is required</span>}
                </div>

                 <div className="flex flex-col mt-2">
                     <label htmlFor="">Price</label>
                    <input type="text" placeholder="Enter price" className="border  w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-8 shadow" {...register("price", { required: true })} />
                    {errors.price && <span className="text-red-500">Price is required</span>}
                 </div>
                 <div className="flex flex-col mt-2">
                    <label htmlFor="">Category</label>
                     <input type="text" placeholder="Enter category" className="border  w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-8 shadow" {...register("category", { required: true })} />
                   {errors.category && <span className="text-red-500">Category is required</span>}
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor="">Image</label>
                    <input type="text" className="border w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-8 shadow" {...register("image", { required: true,pattern:{
                          value:/(\.(jpg|jpeg|png|gif|bmp|webp|svg)$)|(^https?:\/\/[^\s]+)$/i,
                       message: 'Only JPG, JPEG, and PNG files are allowed',
                    } })} placeholder="Enter image" />
                   {errors.image && <span className="text-red-500">Image is required</span>}
                </div>

                <div className="flex flex-col mt-2">
                    <label htmlFor="">favourite</label>
                     <input type="text" placeholder="Enter favourite" className="border  w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-8 shadow" {...register("favourite", { required: false })} />
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor="">profile</label>
                     <input type="text" placeholder="Enter profile" className="border  w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-8 shadow" {...register("profile", { required: false })} />
                </div>
                
            </div>
           
             <div className="flex justify-center">
                <button className="bg-orange-600 text-white px-16 py-2 rounded-lg mt-10">{id ? "Update" : "Add"}</button>
             </div>
       </form>
    </div>


            </div>
           
        </div>
    );
}

export default AddBook;
