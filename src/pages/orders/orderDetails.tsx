import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Load from '../../ui/load';
import axios from 'axios';
import { Orders_API } from '../../Api/api';
import { Package, User, DollarSign, MapPin, Phone, Globe } from 'lucide-react';



const OrderDetails = () => {
  const { id } = useParams();

  const fetchOrderDetails = async (id: string) => {
 
    return await axios.get(`${Orders_API}/${id}`);
  };
  
  const { data: data , isLoading } = useQuery({
    queryKey: ['orderDetails', id],
    queryFn: () => fetchOrderDetails(id!),
    enabled: !!id, // فقط اجلب البيانات عندما يكون هناك id
  });

  console.log(data?.data);

  const Details = data?.data;

  if (isLoading) return <Load />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Order Details</h1>

        {/* Cart Items Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Ordered Items</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Details?.cartItems?.map((item: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name || 'Product image'}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold text-green-600">EGP{item.price} each</p>
                    <p className="text-sm font-bold text-blue-600">Total: EGP{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <DollarSign className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Quantity</p>
              <p className="text-2xl font-bold text-blue-600">
                {Details?.cartItems?.reduce((total: number, item: any) => total + item.quantity, 0) || 0}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="text-2xl font-bold text-green-600">
                EGP{(Details?.cartItems?.reduce((total: number, item: any) => total + item.price * item.quantity, 0) || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Details Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Customer Details</h2>
          </div>
          {Details?.delivery_address ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{Details.delivery_address.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{Details.delivery_address.mobile}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Country</p>
                  <p className="font-medium">{Details.delivery_address.country}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-medium">{Details.delivery_address.city}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 md:col-span-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{Details.delivery_address.street}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No delivery address available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
