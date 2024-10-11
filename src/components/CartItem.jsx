
import {FcDeleteDatabase} from "react-icons/fc"
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({item, itemIndex}) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  }

  return (
    <div className="flex justify-center content-center">

      <div className=" flex flex-col items-center justify-between gap-3 p-4 mt-10 ml-5 border-b-4 w-[400px]" >

        <div className="">
          <img src={item.image} className="h-20 "/>
        </div>
        <div>
          <h1 className="text-gray-700 font-semibold text-lg text-left  w-40 mt-1">{item.title}</h1>
          <h1 className=" text-gray-400 font-normal text-[10px] ">{item.description}</h1>
          <div>
            <p className="text-yellow-600 font-semibold">${item.price}</p>
            <div
            onClick={removeFromCart}>
              <FcDeleteDatabase/>
            </div>
          </div>

        </div>


      </div>

    </div>
  );
};

export default CartItem;
