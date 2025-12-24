import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MdDelete } from "react-icons/md";
import { DeleteFromFavorite } from "../../redux/counter";
import { Link } from "react-router-dom";


const MyFavourate = () => {
  const favourateBooks = useSelector((state: RootState) => state.counter.favoriteItems);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(DeleteFromFavorite({ id }));
  };

  return (
    <div className="py-16 px-4 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-primary h-16 flex items-center justify-center">
            <h1 className="text-2xl font-bold text-white">My Favorite Books</h1>
          </div>
          <div className="p-8">
            {favourateBooks.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">No Favorite Books Yet</h2>
                <p className="text-gray-500">Start adding books to your favorites to see them here!</p>
              </div>
            ) : (
              <>
                <p className="text-center text-gray-600 mb-8 text-lg">
                  You have {favourateBooks.length} book{favourateBooks.length > 1 ? 's' : ''} in your favorite list.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {favourateBooks.map((book: any) => (
                    <div key={book.id} className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <div className="p-4">
                        <img
                          src={book.image || 'default_image_url'}
                          alt={book.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{book.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Author:</span> {book.author}
                        </p>
                        <p className="text-lg font-bold text-primary mb-4">
                          ${book.price}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <MdDelete size={18} />
                            Remove
                          </button>
                          <Link
                            to={`/details/${book.id}`}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  };
  
        


export default MyFavourate