import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from '@/pages/Auth/login'
import Master from '@/components/layout/master'
import Master1 from '@/components/layout/master1'
import Home from '@/pages/homeComponents/home'
import Books from '@/pages/Books/books'
import Forgot from '@/pages/Auth/forgot'
import Reset from '@/pages/Auth/reset'
import Details from '@/pages/Books/bookDetails'
import All from '@/pages/customer/all'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Profile from '@/pages/profile/profile'
import  Register  from '@/pages/Auth/register'
import AddBook from '@/pages/Add_update/add_update'
import Orders from '@/pages/orders/orders'
import Order from '@/pages/customer/paymentOrder'
import OrderDetails from '@/pages/orders/orderDetails'
import MyOrder from '@/pages/customer/myOrder'
import MyFavourate from '@/pages/customer/myFavourate'
import {QueryClientProvider, QueryClient} from 'react-query'
import { Toaster } from 'react-hot-toast';
function App() {

  const Stripe = loadStripe("pk_test_51QFwLTBBBCgBrYZETIOQg6jU8b6FNOuHyjGPeIWliPqSeYXqTbJkV8QYxeNHqUMCyzf5m4meV3J3HX1m7mMEEWVj00Hz8287JJ")

  const queryClient = new QueryClient()

const route = createBrowserRouter([
  {path: '/login',
  element: <Master />,
  errorElement:<div>error</div>,
  children:[
    {index:true,element:<Login/>},
    {path:'login', element: <Login/>},
    {path:'register', element: <Register/>},
    {path:'forgot', element: <Forgot/>},
    {path:'reset', element: <Reset/>},
  ]
  },
  {
    path: '/',
    element: <Master1 />,
    errorElement:<div>error</div>,
    children:[
      {index:true, element: <Home/>},
      {path: 'home', element: <Home/>},
      {path: 'book', element: <Books/>},
      {path: 'all', element: <All/>},
      {path: 'order', element: <Order/>},
      {path: 'profile', element: <Profile/>},
      {path:'addBook',element:<AddBook/>},
      {path:'addBook/:id',element:<AddBook/>},
      {path: 'all/:id', element: <All/>},
      {path: 'details/:id', element: <Details/>},
      {path: 'orders', element: <Orders/>},
      {path: 'orderDetails/:id', element: <OrderDetails/>},
      {path: 'myOrders/:id', element: <MyOrder/>},
      {path: 'favourite', element:<MyFavourate/>},

    ]
  }
])

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
<QueryClientProvider client={queryClient}>
<Elements stripe={Stripe}>
<RouterProvider router={route}>

</RouterProvider>
  
</Elements>
</QueryClientProvider>
    </>
  )
}

export default App

