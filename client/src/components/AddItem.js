import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";



 const AddItem = () => {
  const { id, username } = useParams();
  const navigate = useNavigate();

  const [itemDetails, setItemDetails] = useState({
    userId: id,
    item_name: "",
    quantity: "",
    description: "",
  })

  const createItem = async (newItem) => {
    try{
      console.log("item created:", newItem);

      const response = await fetch("http://localhost:3001/additems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Post request failed");
      }
        return 1;
    } catch (error){
      console.log("Error creating item:", error);
      return 0;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemDetails({
      ...itemDetails,
      [name]: value,
    });
  };



 }

 export default AddItem;