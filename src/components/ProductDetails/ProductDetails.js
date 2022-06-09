import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function ProductDetails() {
    const { id } = useParams();
    let navigate = useNavigate();
    const [productDetails, setProductDetails] = useState({});
    const [productDetailsLoading, setProductDetailsLoading] = useState(false);

    window.addEventListener('keydown', (event) => handleKeyDown(event) )

    const handleKeyDown = event => {
        if (event.key === "Backspace") {
            window.removeEventListener('keydown', handleKeyDown);
            navigate(`../dashboard`);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setProductDetailsLoading(true);
                let productDetailsData = await axios.get(`http://localhost:9000/products/${id}`);
                setProductDetails(productDetailsData.data)
                setProductDetailsLoading(false);
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    }, [id])
    
    return (
        <div>
            {productDetails &&
                <div>
                    <p>Name: {productDetails.name} </p>
                    <p>isFood : {productDetails.isFood?.toString()} </p>
                    <p>Category: {productDetails.category} </p>
                </div>}
            {productDetailsLoading && <CircularProgress />}
        </div>
    )
}

export default ProductDetails;