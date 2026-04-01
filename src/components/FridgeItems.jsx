import React from "react";
import { motion } from "framer-motion";

function FridgeItems(){

 const items = [
  "Milk",
  "Eggs",
  "Tomato",
  "Cheese",
  "Butter",
  "Chicken"
 ];

 return(

  <div className="card">

   <h2>Items in Fridge</h2>

   <div className="grid">

    {items.map((item,index)=>(
      <motion.div
        key={index}
        className="item"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {item}
      </motion.div>
    ))}

   </div>

  </div>

 )

}

export default FridgeItems;