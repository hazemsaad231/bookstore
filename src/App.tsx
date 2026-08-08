import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Auth/login'
import Master from './components/layout/master'
import Master1 from './components/layout/master1'
import Home from './pages/homeComponents/home'
import Books from './pages/Books/books'
import Forgot from './pages/Auth/forgot'
import Reset from './pages/Auth/reset'
import Details from './pages/Books/bookDetails'
import All from './pages/customer/all'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Profile from './pages/profile/profile'
import  Register  from './pages/Auth/register'
import AddBook from './pages/Add_update/add_update'
import Orders from './pages/orders/orders'
import Order from './pages/customer/paymentOrder'
import OrderDetails from './pages/orders/orderDetails'
import MyOrder from './pages/customer/myOrder'
import MyFavourate from './pages/customer/myFavourate'
import {QueryClientProvider, QueryClient} from 'react-query'
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './pages/Auth/protected'
function App() {

  const Stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

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
      {path: 'details/:id', element: <Details/>},
      {path: 'profile', element: <PrivateRoute><Profile/></PrivateRoute>},
      {path: 'all', element: <PrivateRoute role="Customer"><All/></PrivateRoute>},
      {path: 'all/:id', element: <PrivateRoute role="Customer"><All/></PrivateRoute>},
      {path: 'order', element: <PrivateRoute role="Customer"><Order/></PrivateRoute>},
      {path: 'myOrders/:id', element: <PrivateRoute role="Customer"><MyOrder/></PrivateRoute>},
      {path: 'favourite', element: <PrivateRoute role="Customer"><MyFavourate/></PrivateRoute>},
      {path: 'addBook', element: <PrivateRoute role="Admin"><AddBook/></PrivateRoute>},
      {path: 'addBook/:id', element: <PrivateRoute role="Admin"><AddBook/></PrivateRoute>},
      {path: 'orders', element: <PrivateRoute role="Admin"><Orders/></PrivateRoute>},
      {path: 'orderDetails/:id', element: <PrivateRoute role="Admin"><OrderDetails/></PrivateRoute>},

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

