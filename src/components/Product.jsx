// import { toast } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { add, remove } from "../redux/Slices/CartSlice";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Product = ({ post }) => {
//   const navigate = useNavigate();
//   const { cart } = useSelector((state) => state);
//   const dispatch = useDispatch();

//   const addToCart = async () => {
//     try {
//       if (!localStorage.getItem('token')) {
//         toast.error("Please login to add items to cart");
//         navigate('/login');
//         return;
//       }

//       await axios.post('http://localhost:5000/api/carts/add',
//         {
//           productId: post._id
//         }
//         ,
//         {
//           withCredentials: true
//         }
//       );
//       dispatch(add(post));

//       toast.success("Item added to Cart");
//     } catch (error) {
//       console.error("Error adding product to cart:", error);

//     }
//   }

//   const removeFromCart = async () => {
//     try {
//       console.log("Removing product ID:", post._id); // 
//       await axios.post('http://localhost:5000/api/carts/remove', { productId: post._id }, { withCredentials: true });
//       dispatch(remove(post._id));
//       console.log("Removed product from cart:", post._id);
//       toast.success("Item removed from Cart");
//     } catch (error) {
//       toast.error("Error removing item from cart");
//       console.error("Error:", error);
//     }
//   };


//   return (
//     <div id={post._id} className="flex flex-col items-center justify-between 
//     hover:scale-110 transition duration-200 ease-in-out gap-3 p-4 mt-10 ml-5 rounded-xl shadow-xl ">
//       <div>
//         <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{post.title}</p>
//       </div>
//       <div>
//         <p className="w-40 text-gray-600 font-normal text-md text-left text-">{post.description.split(" ").slice(0, 10).join(" ")}</p>
//       </div>
//       <div>
//         <p className="text-blue-600 font-semibold">
//           {
//             post.quantity ? "Available In Stock" : <b className='text-red-600'>Out of Stock</b>
//           }
//         </p>
//       </div>
//       <div className="h-[180px]">
//         <img src={post.image} className="h-full w-full " />
//       </div>

//       <div className="flex justify-between gap-12 items-center w-full mt-5">
//         <div>
//           <p className="text-yellow-600 font-semibold">₹{post.price}</p>
//         </div>


//         {
//           cart.some((p) => p._id == post._id) ?
//             (<button
//               className="text-green-700 font-semibold 
//           text-[14px] p-1 px-3 uppercase disabled
//           ">
//               Item Already in Cart
//             </button>) :
//             (<button
//               className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
//           text-[12px] p-1 px-3 uppercase 
//           hover:bg-gray-700
//           hover:text-white transition duration-300 ease-in"
//               onClick={addToCart}>
//               Add to Cart
//             </button>)
//         }
//       </div>

//     </div>
//   );
// };

// export default Product;

import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Product = ({ post }) => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isInCart, setIsInCart] = useState(false);


  useEffect(() => {
    const isProductInCart = cart.some((item) => item._id === post._id);
    setIsInCart(isProductInCart);
    // console.log(`Product ${post._id} is ${isProductInCart ? "" : "not "}in cart`); // 
  }, [cart, post._id]);

  const addToCart = async () => {
    try {
      if (!localStorage.getItem('token')) {
        toast.error("Please login to add items to cart");
        navigate('/login');
        return;
      }

      await axios.post('http://localhost:5000/api/carts/add',
        {
          productId: post._id
        },
        {
          withCredentials: true
        }
      );

      dispatch(add(post));
      console.log('Added product to cart:', cart);
      toast.success("Item added to Cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async () => {
    try {
      await axios.post('http://localhost:5000/api/carts/remove', { productId: post._id }, { withCredentials: true });
      dispatch(remove(post._id));
      toast.success("Item removed from Cart");
    } catch (error) {
      toast.error("Error removing item from cart");
      console.error("Error:", error);
    }
  };

  return (
    <div id={post._id} className="flex flex-col items-center justify-between hover:scale-110 transition duration-200 ease-in-out gap-3 p-4 mt-10 ml-5 rounded-xl shadow-xl">
      <div>
        <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{post.title}</p>
      </div>
      <div>
        <p className="w-40 text-gray-600 font-normal text-md text-left">{post.description.split(" ").slice(0, 10).join(" ")}</p>
      </div>
      <div>
        <p className="text-blue-600 font-semibold">
          {/* {post.quantity ? "Available In Stock" : <b className='text-red-600'>Out of Stock</b>} */}
          {
            post.quantity < 5 && post.quantity > 0 ? <b className="text-orange-300">Only a few left</b> : post.quantity > 5 ? "Available In Stock" : <b className='text-red-600'>Out of Stock</b>

          }
        </p>
      </div>
      <div className="h-[180px]">
        <img src={post.image} className="h-full w-full" />
      </div>

      <div className="flex justify-between gap-12 items-center w-full mt-5">
        <div>
          <p className="text-yellow-600 font-semibold">₹{post.price}</p>
        </div>
        {
          post.quantity > 0 &&
          <button
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        }
      </div>
    </div>
  );
};

export default Product;
