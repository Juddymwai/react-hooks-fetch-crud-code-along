import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((resp) => resp.json())
      .then((data) => setItems(data))
  }, [])

  function handleAddItem(newData){
    setItems([...items, newData])

  }
  

  function handleAddToCart(updatedData){

  setItems(items.map((item)=>{
    if (item.id=== updatedData.id){
      return updatedData
      
    }
    else {
      return item;
    }
  }))

  
  }
  function handleDeletion(deletedItem){
    setItems(items.filter((item)=> item.id !==deletedItem.id)
    
    )

  }
  

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onAddToCart={handleAddToCart} onHandleDeletion={handleDeletion}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;