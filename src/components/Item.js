// import { json } from "msw/lib/types/context";
import React from "react";

function Item({ item, onAddToCart, onHandleDeletion }) {

  function handleUpdate(){
    console.log('clickme')
    fetch(`http://localhost:4000/items/${item.id}`,{
      method:"PATCH",
      headers:{
        "content-Type":"application/json",
      },
      body:JSON.stringify({
        isInCart:!item.isInCart,
      })
      
    })
    .then((r)=>r.json())
    .then((updatedData)=>onAddToCart(updatedData))

  }
  function handleDelete(){
    fetch(`http://localhost:4000/items/${item.id}`,{
      method:"DELETE",
      
    })
    .then((r)=>r.json())
    .then(()=> onHandleDeletion(item))

  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleUpdate}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
