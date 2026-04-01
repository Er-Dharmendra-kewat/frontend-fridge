import React from "react";

function DishSuggestions(){

 const dishes = [
  "Omelette",
  "Cheese Sandwich",
  "Tomato Soup"
 ];

 return(

  <div className="card">

   <h2>AI Dish Suggestions</h2>

   <ul>

    {dishes.map((dish,i)=>(
      <li key={i}>{dish}</li>
    ))}

   </ul>

  </div>

 )

}

export default DishSuggestions;