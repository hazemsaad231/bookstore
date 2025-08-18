import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/login/login'
import Master from './components/layout/master'
import Master1 from './components/layout/master1'
import Home from './components/homeComponents/home'
import Books from './components/Books/books'
import Forgot from './components/login/forgot'
import Reset from './components/login/reset'
import Details from './components/Books/bookDetails'
import All from './components/customer/all'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import { ToastContainer } from 'react-toastify'
import Profile from './components/profile/profile'
import  Register  from './components/login/register'
import AddBook from './components/addBook/addbook'
import PrivateRoute from './components/login/protected'
import Orders from './components/orders/orders'
import Order from './components/customer/paymentOrder'
import OrderDetails from './components/orders/orderDetails'
import MyOrder from './components/customer/myOrder'
import MyFavourate from './components/customer/myFavourate'
import {QueryClientProvider, QueryClient} from 'react-query'

function App() {

  const Stripe = loadStripe("pk_test_51QFwLTBBBCgBrYZETIOQg6jU8b6FNOuHyjGPeIWliPqSeYXqTbJkV8QYxeNHqUMCyzf5m4meV3J3HX1m7mMEEWVj00Hz8287JJ")

  const queryClient = new QueryClient()

const route = createBrowserRouter([
  {path: '/',
  element: <Master />,
  errorElement:<div>error</div>,
  children:[
    {index:true,element:<Login/>},
    {path: 'login', element: <Login/>},
    {path: 'register', element: <Register/>},
    {path: 'forgot', element: <Forgot/>},
    {path: 'reset', element: <Reset/>},


  ]
  },
  {
    path: '/home',
    element: <PrivateRoute><Master1 /></PrivateRoute>,
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
<ToastContainer/>
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

