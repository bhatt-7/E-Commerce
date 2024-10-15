import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState("");
    async function fetchProducts() {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/products/all');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.log("Error fetching products:", error);
            setProducts([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

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
