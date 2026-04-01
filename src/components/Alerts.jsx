import React from "react";

function Alerts(){

 const alerts = [
  "Milk running low",
  "Eggs almost finished"
 ];

 return(

  <div className="card">

   <h2>Low Stock Alerts</h2>

   {alerts.map((a,i)=>(
    <p key={i} className="alert">{a}</p>
   ))}

  </div>

 )

}

export default Alerts;