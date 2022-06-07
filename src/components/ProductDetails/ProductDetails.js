import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState({});
    useEffect(() => {
        const fetchData =async () => {
            try {
                let productDetailsData = await axios.get(`http://localhost:9000/products/${id}`);
                setProductDetails(productDetailsData.data)
            } catch (error) {
                
            }
        }
        fetchData();
    }, [id])
    console.log(productDetails)
    return (
        <div>
            {productDetails &&
                <div>
                    <p>Name: {productDetails.name} </p>
                    <p>isFood? : {productDetails.isFood} </p>
                    <p>Category: {productDetails.category} </p>
                </div>}
        </div>
    )
}

export default ProductDetails;