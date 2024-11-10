import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import axios from "axios";

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState("");


    async function fetchProducts() {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/products/all`);
            setProducts(prevProducts => [...prevProducts, ...res.data]);

        } catch (error) {
            console.log("Error fetching products:", error);
            setProducts([]);
            setError("Failed to fetch products");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);
    console.log("products:", products)


    return (
        <div>
            {loading ? <Spinner /> :
                products.length > 0 ? (
                    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
                        {products.map((product) => (
                            <Product key={product._id} post={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <p>No Data Found</p>
                    </div>
                )}
        </div>
    );
};

export default Dashboard;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Spinner from "../components/Spinner";
// import Product from "../components/Product";
// import { current } from "@reduxjs/toolkit";

// const Dashboard = () => {
//     const [loading, setLoading] = useState(false);
//     const [products, setProducts] = useState([]);
//     const [page, setPage] = useState(1);
//     const [hasMore, setHasMore] = useState(true);
//     const [error, setError] = useState("");

//     async function fetchProducts() {
//         setLoading(true);
//         try {
//             const res = await axios.get(`http://localhost:5000/api/products/all?page=${page}&limit=10`);
//             setProducts(prevProducts => [...prevProducts, ...res.data]);
//             if (res.data.length <= 10) {
//                 setHasMore(false);
//             }
//         } catch (error) {
//             console.log("Error fetching products:", error);
//             setProducts([]);
//             setError("Error fetching products");
//         }
//         setLoading(false);
//     }

//     useEffect(() => {
//         fetchProducts();
//     }, [page]);

//     const handleScroll = () => {
//         if(window.innerHeight+window.scrollY >= document.body.offsetHeight-100) {
//             setPage(prevPage => prevPage + 1);
//         }
//     };

//     window.addEventListener("scroll", handleScroll);


//     useEffect(() => {
//         const handleScroll = () => {

//             if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;


//             if (hasMore) {
//                 setPage(prevPage => prevPage + 1);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [loading, hasMore]);

//     return (
//         <div>
//             {loading ? <Spinner /> :
//                 products.length > 0 ? (
//                     <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
//                         {products.map((product) => (
//                             <Product key={product._id} post={product} />
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="flex justify-center items-center">
//                         <p>No Data Found</p>
//                     </div>
//                 )}
//         </div>
//     );
// };

// export default Dashboard;