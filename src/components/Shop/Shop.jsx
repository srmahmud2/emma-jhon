import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //add cart info to local storage
  useEffect(() => {
    const storedCart = getShoppingCart();
    let savedCart = [];

    //step 1: get the id of the added product
    for (const id in storedCart) {
      //step 2: get the product from the products stat
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        //step 3: add quantity
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        //step 4: add the product to the savedCart
        savedCart.push(addedProduct);
      }
      // console.log("added product", addedProduct);
    }
    // step 5: save the cart
    setCart(savedCart);
  }, [products]);

  //declare handleAddToCart
  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
