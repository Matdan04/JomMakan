import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () =>{},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartitemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );
    const updatedItems = [...state.items];
    if (existingCartitemIndex > -1) {
      const existingItem = state.items[existingCartitemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartitemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartitemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );

    const existingCartItem = state.items[existingCartitemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartitemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartitemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

if(action.type =='CLEAR_CART'){
  return {...state, items:[]};
}

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  
  function addItem(item) {
    dispatchCartAction({
      type: "ADD_ITEM",
      item,
    });
  }
  function removeItem(id) {
    dispatchCartAction({
      type:'REMOVE_ITEM',
      id
    })
  }
  function clearCart(){
    dispatchCartAction({type:"CLEAR_CART"})
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };
  console.log(   '~~~~~~' ,      cartContext     , '~~~~~~'   );
  
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
