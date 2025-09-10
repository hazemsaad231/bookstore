import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BOOKS_API } from "../Api/api";



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
               
                toast("Update is successful");
            } else {
                const response = await axios.post(BOOKS_API, data);
                console.log(response);
                setTimeout(() => {
                    navigate("/book")
                },2000)
               
                toast("Add is successful");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during the operation.");
        }
    };



    

    return (
        <div className="py-20">

            <ToastContainer limit={1} />
            <div className="border-t-[40px] border-primary  shadow-xl rounded-xl bg-white w-[80%] sm:w-[80%] m-auto md:w-[70%] lg:w-[50%] xl:w-[50%] px-12 sm:px-8 md:px-20 lg:px-10 xl:px-5 py-5">
            <h1 className="text-md sm:text-md md:text-lg lg:text-lg xl:text-xl  mt-2 mb-6 font-sans text-center tracking-[0.2em]">{id ? "Update Book" : "Add Book"}</h1>
    
    <div className="flex flex-col justify-center items-center">
    <form onSubmit={handleSubmit(onSubmit)}>
             <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 xl:gap-10 place-items-center m-auto">
                 <div className="flex flex-col">
                    <label htmlFor="">Name</label>
                     <input type="text" placeholder="Enter name" className="border w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-4 shadow" {...register("name", { required: true })} />
                     {errors.name && <span className="text-red-500">Name is required</span>}
                </div>
                <div className="flex flex-col mt-2">
                     <label htmlFor="">Description</label>
                     <input type="text" placeholder="Enter description" className="border  w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-4 shadow" {...register("description", { required: true })} />
                    {errors.description && <span className="text-red-500">Description is required</span>}
                </div>
                 <div className="flex flex-col mt-2">
                     <label htmlFor="">Author</label>
                     <input type="text" placeholder="Enter author" className="border  w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-4 shadow" {...register("author", { required: true })} />
                     {errors.author && <span className="text-red-500">Author is required</span>}
                </div>

                 <div className="flex flex-col mt-2">
                     <label htmlFor="">Price</label>
                    <input type="text" placeholder="Enter price" className="border  w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-4 shadow" {...register("price", { required: true })} />
                    {errors.price && <span className="text-red-500">Price is required</span>}
                 </div>
                      <div className="flex flex-col mt-2">
                    <label htmlFor="">Category</label>
                     <input list="categories" id="browser" autoComplete="off" placeholder="Enter category" className="border  w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-4 shadow" {...register("category", { required: true })} />
                     {errors.category && <span className="text-red-500">Category is required</span>}
                     <datalist id="categories">
  <option value="Religion"/>
  <option value="Literature"/>
  <option value="Self-Help"/>
  <option value="History"/>
  <option value="Children"/>
  <option value="Business"/>
  <option value="Cooking"/>
  <option value="Sports"/>
  <option value="ٌRomance"/>
  <option value="ٌOther"/>
</datalist>
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor="">Image</label>
                    <input type="text" className="border w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-4 shadow" {...register("image", { required: true,pattern:{
                          value:/(\.(jpg|jpeg|png|gif|bmp|webp|svg)$)|(^https?:\/\/[^\s]+)$/i,
                       message: 'Only JPG, JPEG, and PNG files are allowed',
                    } })} placeholder="Enter image" />
                   {errors.image && <span className="text-red-500">Image is required</span>}
                </div>

                <div className="flex flex-col mt-2">
                    <label htmlFor="">featured book </label>
                     <input list="browsers" id="browser" autoComplete="off" placeholder="Enter featured" className="border  w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-4 shadow" {...register("featured", { required: false })} />
                     <datalist id="browsers">
  <option value="true"/>
  <option value="false"/>
</datalist>
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor="">new Realease book</label>
                     <input list="browsers" id="browser" autoComplete="off" placeholder="Enter new realease" className="border  w-48 sm:w-48 md:w-60 lg:w-max xl:w-max p-2 px-4 shadow" {...register("new", { required: false })} />
                     <datalist id="browsers">
  <option value="true"/>
  <option value="false"/>
</datalist>
                </div>

            </div>
           
             <div className="flex justify-center">
                <button className="bg-primary text-white px-16 py-2 rounded-lg mt-10">{id ? "Update" : "Add"}</button>
             </div>
       </form>
    </div>


            </div>
           
        </div>
    );
}

export default AddBook;
