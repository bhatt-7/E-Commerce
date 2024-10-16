// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminProduct = ({ post,removeProductFromList }) => {
//     const navigate = useNavigate();

//     // Handle product deletion
//     const deleteProduct = async () => {
//         try {
//             await axios.delete(`http://localhost:5000/api/products/${post._id}`, { withCredentials: true });
//             removeProductFromList(post._id);
//             toast.success("Product deleted successfully");
//             //remove the element from cart as well
//         } catch (error) {
//             toast.error("Error deleting product");
//             console.error("Error deleting product:", error);
//         }
//     };

//     // Navigate to the edit product page
//     const editProduct = () => {
//         navigate(`/edit-product/${post._id}`); // Assuming you have a route for editing products
//     };

//     return (
//         <div id={post._id} className="flex flex-col items-center justify-between 
//             hover:scale-110 transition duration-200 ease-in-out gap-3 p-4 mt-10 ml-5 rounded-xl shadow-xl">
//             <div>
//                 <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{post.title}</p>
//             </div>
//             <div>
//                 <p className="w-40 text-gray-600 font-normal text-md text-left">
//                     {post.description.split(" ").slice(0, 10).join(" ")}
//                 </p>
//             </div>
//             <div className="h-[180px]">
//                 <img src={post.image} className="h-full w-full " alt={post.title} />
//             </div>

//             {/* Display the price */}
//             <div className="flex justify-between gap-4 items-center w-full mt-5">
//                 <p className="text-yellow-600 font-semibold">₹{post.price}</p>
//             </div>

//             {/* Buttons for Admin Actions */}
//             <div className="flex justify-between gap-4 items-center w-full mt-3">
//                 <button
//                     className="text-blue-600 border-2 border-blue-600 rounded-full font-semibold 
//                     text-[12px] p-1 px-3 uppercase hover:bg-blue-600 hover:text-white transition duration-300 ease-in"
//                     onClick={editProduct}>
//                     Edit
//                 </button>

//                 <button
//                     className="text-red-600 border-2 border-red-600 rounded-full font-semibold 
//                     text-[12px] p-1 px-3 uppercase hover:bg-red-600 hover:text-white transition duration-300 ease-in"
//                     onClick={deleteProduct}>
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AdminProduct;


// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useState } from "react";

// const AdminProduct = ({ post, updateProductInList, removeProductFromList }) => {
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [editedProduct, setEditedProduct] = useState({
//         title: post.title,
//         description: post.description,
//         price: post.price,
//         image: post.image,
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditedProduct({ ...editedProduct, [name]: value });
//     };

//     // Handle product update
//     const updateProduct = async () => {
//         try {
//             const response = await axios.put(`http://localhost:5000/api/products/${post._id}`, editedProduct, {
//                 withCredentials: true
//             });

//             toast.success("Product updated successfully");
//             updateProductInList(response.data); // Update product in the list

//             setIsEditModalOpen(false); // Close the modal
//         } catch (error) {
//             toast.error("Error updating product");
//             console.error("Error updating product:", error);
//         }
//     };

//     // Handle product deletion
//     const deleteProduct = async () => {
//         try {
//             await axios.delete(`http://localhost:5000/api/products/${post._id}`, {
//                 withCredentials: true
//             });

//             toast.success("Product deleted successfully");
//             removeProductFromList(post._id); // Remove product from the list
//         } catch (error) {
//             toast.error("Error deleting product");
//             console.error("Error deleting product:", error);
//         }
//     };

//     return (
//         <div id={post._id} className="flex flex-col items-center justify-between 
//             hover:scale-110 transition duration-200 ease-in-out gap-3 p-4 mt-10 ml-5 rounded-xl shadow-xl">
//             <div>
//                 <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{post.title}</p>
//             </div>
//             <div>
//                 <p className="w-40 text-gray-600 font-normal text-md text-left">
//                     {post.description.split(" ").slice(0, 10).join(" ")}
//                 </p>
//             </div>
//             <div className="h-[180px]">
//                 <img src={post.image} className="h-full w-full " alt={post.title} />
//             </div>

//             {/* Display the price */}
//             <div className="flex justify-between gap-4 items-center w-full mt-5">
//                 <p className="text-yellow-600 font-semibold">₹{post.price}</p>
//             </div>

//             {/* Buttons for Admin Actions */}
//             <div className="flex justify-between gap-4 items-center w-full mt-3">
//                 <button
//                     className="text-blue-600 border-2 border-blue-600 rounded-full font-semibold 
//                     text-[12px] p-1 px-3 uppercase hover:bg-blue-600 hover:text-white transition duration-300 ease-in"
//                     onClick={() => setIsEditModalOpen(true)}>
//                     Edit
//                 </button>

//                 <button
//                     className="text-red-600 border-2 border-red-600 rounded-full font-semibold 
//                     text-[12px] p-1 px-3 uppercase hover:bg-red-600 hover:text-white transition duration-300 ease-in"
//                     onClick={deleteProduct}>
//                     Delete
//                 </button>
//             </div>

//             {/* Modal for editing product */}
//             {isEditModalOpen && (
//                 <>
//                     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-white p-6 rounded-lg">
//                             <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

//                             <input
//                                 type="text"
//                                 name="title"
//                                 value={editedProduct.title}
//                                 onChange={handleInputChange}
//                                 className="border p-2 mb-2 w-full"
//                                 placeholder="Title"
//                             />
//                             <textarea
//                                 name="description"
//                                 value={editedProduct.description}
//                                 onChange={handleInputChange}
//                                 className="border p-2 mb-2 w-full"
//                                 placeholder="Description"
//                             />
//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={editedProduct.price}
//                                 onChange={handleInputChange}
//                                 className="border p-2 mb-2 w-full"
//                                 placeholder="Price"
//                             />
//                             <input
//                                 type="text"
//                                 name="image"
//                                 value={editedProduct.image}
//                                 onChange={handleInputChange}
//                                 className="border p-2 mb-2 w-full"
//                                 placeholder="Image URL"
//                             />

//                             <div className="flex justify-end space-x-3">
//                                 <button
//                                     className="bg-gray-500 text-white p-2 rounded-lg"
//                                     onClick={() => setIsEditModalOpen(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className="bg-blue-600 text-white p-2 rounded-lg"
//                                     onClick={updateProduct}
//                                 >
//                                     Save Changes
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default AdminProduct;

import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const AdminProduct = ({ post, updateProductInList, removeProductFromList }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        title: post.title,
        description: post.description,
        price: post.price,
        image: post.image,
        quantity: post.quantity,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    // Handle product update
    const updateProduct = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/products/${post._id}`, editedProduct, {
                withCredentials: true,
            });

            toast.success("Product updated successfully");
            updateProductInList(response.data); // Update product in the list
            setIsEditModalOpen(false); // Close the modal
        } catch (error) {
            toast.error("Error updating product");
            console.error("Error updating product:", error);
        }
    };

    // Handle product deletion
    const deleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${post._id}`, {
                withCredentials: true,
            });

            toast.success("Product deleted successfully");
            removeProductFromList(post._id); // Remove product from the list
        } catch (error) {
            toast.error("Error deleting product");
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div
            id={post._id}
            className={`flex flex-col items-center justify-between gap-3 p-4 mt-10 ml-5 rounded-xl shadow-xl
            ${!isEditModalOpen ? "hover:scale-105 transition-all duration-300 ease-in-out" : ""}`}
        >
            <div>
                <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">
                    {post.title}
                </p>
            </div>
            <div>
                <p className="w-40 text-gray-600 font-normal text-md text-left">
                    {post.description.split(" ").slice(0, 10).join(" ")}
                </p>
            </div>
            <div>
                <p className="text-yellow-600 font-semibold">Quantity:{post.quantity}</p>
            </div>
            <div className={`h-[180px] ${!isEditModalOpen ? "hover:scale-105 transition-transform duration-300 ease-in-out" : ""}`}>
                <img src={post.image} className="h-full w-full object-cover" alt={post.title} />
            </div>

            {/* Display the price */}
            <div className="flex justify-between gap-4 items-center w-full mt-5">
                <p className="text-yellow-600 font-semibold">₹{post.price}</p>
            </div>

            {/* Buttons for Admin Actions */}
            <div className="flex justify-between gap-4 items-center w-full mt-3">
                <button
                    className="text-blue-600 border-2 border-blue-600 rounded-full font-semibold 
                    text-[12px] p-1 px-3 uppercase hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out"
                    onClick={() => setIsEditModalOpen(true)}
                >
                    Edit
                </button>

                <button
                    className="text-red-600 border-2 border-red-600 rounded-full font-semibold 
                    text-[12px] p-1 px-3 uppercase hover:bg-red-600 hover:text-white transition-colors duration-300 ease-in-out"
                    onClick={deleteProduct}
                >
                    Delete
                </button>
            </div>

            {/* Modal for editing product */}
            {isEditModalOpen && (
                <>
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
                            <button
                                className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                <AiOutlineClose size={24} />
                            </button>
                            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

                            <input
                                type="text"
                                name="title"
                                value={editedProduct.title}
                                onChange={handleInputChange}
                                className="border p-2 mb-2 w-full"
                                placeholder="Title"
                            />
                            <textarea
                                name="description"
                                value={editedProduct.description}
                                onChange={handleInputChange}
                                className="border p-2 mb-2 w-full"
                                placeholder="Description"
                            />
                            <input
                                type="number"
                                name="price"
                                value={editedProduct.price}
                                onChange={handleInputChange}
                                className="border p-2 mb-2 w-full"
                                placeholder="Price"
                            />
                            <input
                                type="number"
                                name="quantity"
                                value={editedProduct.quantity}
                                onChange={handleInputChange}
                                className="border p-2 mb-2 w-full"
                                placeholder="Quantity"
                            />

                            <input
                                type="text"
                                name="image"
                                value={editedProduct.image}
                                onChange={handleInputChange}
                                className="border p-2 mb-2 w-full"
                                placeholder="Image URL"
                            />

                            <div className="flex justify-end space-x-3">
                                <button
                                    className="bg-gray-500 text-white p-2 rounded-lg"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-600 text-white p-2 rounded-lg"
                                    onClick={updateProduct}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminProduct;
