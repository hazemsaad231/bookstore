import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { setUserData } from "../../redux/counter";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.counter.userData);

  useEffect(() => {
    dispatch(setUserData());
  }, [dispatch]); 

  console.log(userData);

  return (
    <div className="flex justify-center items-center bg-gradient-to-r border from-red-100 to-white py-12">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-3xl p-6 m-6">
        <div className="flex justify-center mb-6">
          <div className="h-32 w-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {userData?.first_name?.[0]}{userData?.last_name?.[0]}
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800">{userData?.first_name} {userData?.last_name}</h2>
        <p className="text-center text-gray-500">{userData?.role}</p>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Email :</span>
            <span className="text-sm sm:text-sm md:text-md lg:text-md xl:text-md">{userData?.email}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Status :</span>
            <span>{userData?.status}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Shipping Addresses :</span>
            <span>{userData?.shipping_addresses.length > 0 ? `${userData.shipping_addresses.length} address(es)` : 'No addresses'}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
