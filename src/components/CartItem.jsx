// import axios from "axios";
// import { FcDeleteDatabase } from "react-icons/fc"
// import { useDispatch } from "react-redux";
// import { remove } from "../redux/Slices/CartSlice";
// import { toast } from "react-hot-toast";


// const CartItem = ({ item, index }) => {
//   const dispatch = useDispatch();
//   console.log("item", item.product)
//   const removeFromCart = async () => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/api/carts/cart/${item._id}`, {
//         withCredentials: true
//       });
//       if (response.status === 200) {

//         dispatch(remove(item.id));
//         toast.success("Item Removed");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error removing item from cart");
//     }
//   }

//   return (
//     <div className="flex justify-center content-center">

//       <div className=" flex flex-col items-center justify-between gap-3 p-4 mt-10 ml-5 border-b-4 w-[400px]" >

//         <div className="">
//           <img src={item?.product?.image} className="h-20 " />
//         </div>
//         <div>
//           <h1 className="text-gray-700 font-semibold text-lg text-left  w-40 mt-1">{item?.product.title}</h1>
//           <h1 className=" text-gray-400 font-normal text-[10px] ">{item.product.description}</h1>
//           <div>
//             <p className="text-yellow-600 font-semibold">₹{item.product.price}</p>
//             <div
//               onClick={removeFromCart}>
//               <FcDeleteDatabase />
//             </div>
//           </div>

//         </div>


//       </div>

//     </div>
//   );
// };

// export default CartItem;


import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";
import { useState } from "react";

const CartItem = ({ item, onRemove }) => {
  const dispatch = useDispatch();
  const [Quantity, setQuantity] = useState(item.quantity);

  const removeFromCart = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/carts/cart/${item._id}`, {
        withCredentials: true
      });
      if (response.status === 200) {
        dispatch(remove(item.id));
        onRemove(item._id);
        toast.success("Item Removed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error removing item from cart");
    }
  };

  return (
    <div className="flex justify-center content-center">
      <div className="flex flex-col items-center justify-between gap-3 p-4 mt-10 ml-5 border-b-4 w-[400px]">
        <div>
          <img src={item?.product?.image} className="h-20" />
        </div>
        <div>
          <h1 className="text-gray-700 font-semibold text-lg text-left w-40 mt-1">{item?.product?.title}</h1>
          <h1 className="text-gray-400 font-normal text-[13px]">{item?.product?.description}</h1>
          <button onClick={() => setQuantity(Quantity + 1)}>+</button>
          <h1 className="text-gray-800 font-bold text-[13px]">Quantity:{Quantity}</h1>
          <div>
            <button onClick={() => setQuantity(Quantity - 1)}>-</button>
            <p className="text-yellow-600 font-semibold">₹{item?.product?.price}</p>
            <span onClick={removeFromCart} className="text-red-500 " style={{ cursor: "pointer", fontSize: "30px", display: "inline-block" }}>
              <MdDelete />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
