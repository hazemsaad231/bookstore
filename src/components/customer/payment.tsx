import { useState } from 'react'; 
import { CardElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { resetCart } from '../../redux/counter';
import axios from 'axios';

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const Id = useSelector((state: RootState) => state.counter.userData?._id);
  const cartItems = useSelector((state: RootState) => state.counter.cartItems);
  const dis = useDispatch();
  
const data = localStorage.getItem("data");

const email = data ? JSON.parse(data).email : null;

console.log(email)

  const basket = () => {
    dis(resetCart());
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe لم يتم تحميله بعد. حاول مرة أخرى.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const addressElement = elements.getElement(AddressElement);

    if (cardElement && addressElement) {
      setLoading(true);
      const { error, token } = await stripe.createToken(cardElement);

      const address = await addressElement?.getValue();

      if (error) {
        setLoading(false);
        toast.error(error.message);
        return;
      }

      if (address.complete) {
        if (!Id) {
          toast.error("Please log in to place an order.");
          return;
        }

        const id = Id;
        const data = {
          token: 'tok_visa',
          delivery_address: {
            name: address.value.name,
            country: address.value.address.country,
            city: address.value.address.city,
            state: address.value.address.state,
            building: 1,
            street: address.value.address.line1,
            floor: 1,
            apartment: 1,
            mobile: address.value.phone,
            additional_info: 'test info',
            location: {
              type: "Point",
              coordinates: [30.0444, 31.2357],
            },
          },
          cartItems,
        };

        try {
          const orders =  axios.post("https://backend-production-65d5.up.railway.app/orders", {
            userId: id,
            token: token?.id,
            email: email,
            delivery_address: data.delivery_address,
            cartItems: data.cartItems,
            timestamp: new Date(),
          });

          await orders ;

          toast.success("successful order");
          setTimeout(() => {
            navigate('/home/order', { state: { cartItems } });
          },2000)
         localStorage.setItem("orders", `${JSON.stringify(cartItems)}`);
          basket();
        } catch (error) {
          console.error("error", error);
          toast.error("Failed to add order. Please try again.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        toast.error("please fill the form");
      }
    } else {
      toast.error("please fill the form");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex w-full justify-center items-center">
        <div className="flex flex-col ">
          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mt: 4 }}>
            <div className="bg-gray-100 p-2 m-4 text-center rounded-lg shadow-xl">
              <Typography variant="h5" gutterBottom>
                Payment Info
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Box sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2 }}>
                    <CardElement options={{ hidePostalCode: true }} />
                  </Box>
                </Grid>
              </Grid>
            </div>

            <div className="bg-gray-100 p-2 text-center rounded-lg shadow-xl">
              <Typography variant="h5" gutterBottom>
                Shipping Data
              </Typography>
              <Grid item xs={12}>
                <AddressElement options={{
                  mode: 'shipping',
                  fields: { phone: 'always' }
                }} />
              </Grid>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={!stripe || loading}
            >
              {loading ? "Processing..." : "PROCEED TO CHECKOUT"}
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Payment;


