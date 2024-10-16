// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import CartItem from "../components/CartItem";
// import toast from "react-hot-toast";
// //can not open cart until logged in
// import { useNavigate } from "react-router-dom";

// const Cart = () => {

//   const navigate = useNavigate();


//   const { cart } = useSelector((state) => state);
//   console.log("Printing Cart");
//   console.log(cart);
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
//   }, [cart])
//   //check if local storage has token, otherwise redirect to login
//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       toast.error("Please login to check cart");
//       navigate("/login");
//     }
//   }, []);
//   return (
//     <div className="flex justify-center content-center">
//       {
//         cart.length > 0 ?
//           (<div className="flex flex-col-reverse sm:flex-row justify-center content-center m-3 gap-10">


//             <div>
//               {
//                 cart.map((item, index) => {
//                   return <CartItem key={item.id} item={item} itemIndex={index} />
//                 })
//               }
//             </div>

//             <div className="flex flex-col justify-between  mt-10 w-[400px]">

//               <div>
//                 <div className="text-yellow-700 font-semibold text-[20px] text-left ">Your Cart</div>
//                 <div className="text-yellow-700 font-bold text-[40px] text-left ">Summary</div>
//                 <p>
//                   <span className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">Total Items: {cart.length}</span>
//                 </p>
//               </div>

//               <div className="text-gray-700 font-semibold text-lg text-left  w-40 mt-1">
//                 <p >Total Amount: ₹{totalAmount}</p>
//                 <button className="bg-yellow-500 p-3 rounded-xl w-[300px] hover:bg-yellow-600 transition duration-300 ease-in text-white ">
//                   CheckOut Now
//                 </button>
//               </div>

//             </div>


//           </div>) :
//           (<div className="flex flex-col gap-10 justify-center content-center">
//             <h1 className="font-bold text-4xl">Cart Empty</h1>
//             <Link to={"/dashboard"}>
//               <button className="bg-yellow-400 p-4 rounded-xl hover:bg-yellow-500 text-white font-bold">
//                 Shop Now
//               </button>
//             </Link>
//           </div>)
//       }
//     </div>
//   );
// };

// export default Cart;


// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import CartItem from "../components/CartItem";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Cart = () => {
//   const navigate = useNavigate();
//   const { cart } = useSelector((state) => state);
//   const [cartItems, setCartItems] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     // Fetch cart items from the backend
//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/carts/cart', { withCredentials: true });
//         console.log("Response data:", response.data);
//         setCartItems(response.data.cartItems);
//         console.log("CartItems", response.data.cartItems);

//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//         toast.error("Failed to fetch cart items");
//       }
//     };

//     fetchCartItems();
//   }, []);

//   useEffect(() => {
//     // Calculate total amount from fetched cart items
//     setTotalAmount(cartItems.reduce((acc, curr) => acc + (curr.product?.price || 0), 0));
//   }, [cartItems]);

//   // Check if local storage has token, otherwise redirect to login
//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       toast.error("Please login to check cart");
//       navigate("/login");
//     }
//   }, [navigate]);

//   return (
//     <div className="flex justify-center content-center">
//       {cartItems?.length > 0 ? (
//         <div className="flex flex-col-reverse sm:flex-row justify-center content-center m-3 gap-10">
//           <div>
//             {cartItems.map((item) => (
//               <CartItem key={item._id} item={item} />
//             ))}
//           </div>

//           <div className="flex flex-col justify-between mt-10 w-[400px]">
//             <div>
//               <div className="text-yellow-700 font-semibold text-[20px] text-left ">Your Cart</div>
//               <div className="text-yellow-700 font-bold text-[40px] text-left ">Summary</div>
//               <p>
//                 <span className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">Total Items: {cartItems.length}</span>
//               </p>
//             </div>

//             <div className="text-gray-700 font-semibold text-lg text-left w-40 mt-1">
//               <p>Total Amount: ₹{totalAmount}</p>
//               <button className="bg-yellow-500 p-3 rounded-xl w-[300px] hover:bg-yellow-600 transition duration-300 ease-in text-white">
//                 CheckOut Now
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col gap-10 justify-center content-center">
//           <h1 className="font-bold text-4xl">Cart Empty</h1>
//           <Link to={"/dashboard"}>
//             <button className="bg-yellow-400 p-4 rounded-xl hover:bg-yellow-500 text-white font-bold">
//               Shop Now
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/carts/cart', { withCredentials: true });
        console.log("Response data:", response.data.cartItems);
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to fetch cart items");
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    setTotalAmount(cartItems.reduce((acc, curr) => acc + (curr.product?.price || 0), 0));
  }, [cartItems]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to check cart");
      navigate("/login");
    }
  }, [navigate]);

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const checkOutHandler = async () => {
    try {
      const productsInCart = cartItems.map(item => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));

      const { data: { orderId, order } } = await axios.post('http://localhost:5000/api/payments/create-order', {
        amount: totalAmount,
        currency: "INR",
        products: productsInCart
      }, { withCredentials: true });

      const options = {
        key: "rzp_test_5XhKGpSXFOwnLs",
        amount: order.amount,
        currency: order.currency,
        name: "CQ-Store",
        description: "Payment for cart items",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyUrl = `http://localhost:5000/api/payments/verify-payment`;
            const verifyResponse = await axios.post(verifyUrl, {
              order_id: orderId,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature
            });

            if (verifyResponse.data.success) {
              toast.success("Payment Successful");
              setCartItems([]);
              const response = await axios.put("http://localhost:5000/api/carts/remove-all", {}, { withCredentials: true });
              if (response.data.status === 200) {
                navigate("/success");
              }
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            toast.error("Error verifying payment");
          }
        },
        prefill: {
          name: "Ayush",
          email: "ayushbhatt@gmail.com",
          contact: "9999999990",
        },
        theme: {
          color: "#528FF0",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Error during checkout");
    }
  };


  return (
    <div className="flex justify-center content-center">
      {cartItems?.length > 0 ? (
        <div className="flex flex-col-reverse sm:flex-row justify-center content-center m-3 gap-10">
          <div>
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} onRemove={handleRemoveItem} />
            ))}
          </div>

          <div className="flex flex-col justify-between mt-10 w-[400px]">
            <div>
              <div className="text-yellow-700 font-semibold text-[20px] text-left ">Your Cart</div>
              <div className="text-yellow-700 font-bold text-[40px] text-left ">Summary</div>
              <p>
                <span className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">Total Items: {cartItems?.length}</span>
              </p>
            </div>

            <div className="text-gray-700 font-semibold text-lg text-left w-40 mt-1">
              <p>Total Amount: ₹{totalAmount}</p>
              <button onClick={checkOutHandler} className="bg-yellow-500 p-3 rounded-xl w-[300px] hover:bg-yellow-600 transition duration-300 ease-in text-white">
                CheckOut Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10 justify-center content-center">
          <h1 className="font-bold text-4xl">Cart Empty</h1>
          <Link to={"/dashboard"}>
            <button className="bg-yellow-400 p-4 rounded-xl hover:bg-yellow-500 text-white font-bold">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
