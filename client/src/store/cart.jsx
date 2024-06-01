import { create } from "zustand";

export const useCart = create((set, get) => ({
    cart: [],
    count: () => {
        const { cart } = get();
        if(cart.length){
            return cart.map(item => item.count).reduce((a, b) => a + b)
        }    
        return 0;
    },
    add: (product) => {
        const { cart } = get();
        const updatedCart = updateCart(product, cart)
        set({ cart: updatedCart });
    },
    remove: (product) => {
        const { cart } = get();
        const updatedCart = removeCart(product, cart)
        set({ cart: updatedCart });
    },
    removeAll: () => set({ cart: [] }),
    totalPrice: () => {
        const { cart } = get();
        if(cart.length){
            return cart.map(item => item.price * item.count).reduce((a, b) => a + b)
        }    
        return 0;
    }
}))

function updateCart(product, cart) {
  const cartItem = { ...product, count: 1 };

    const productOnCart = cart.map(item => item._id).includes(product._id);
    
    if (!productOnCart) cart.push(cartItem)
    else {
        return cart.map(item => {
            if (item._id === product._id)
                return { ...item, count: item.count + 1 } ;
            return item
        })        
    }
    
    return cart;
}

function removeCart(idProduct, cart) {
  return cart
    .map((item) => {
      if (item.id === idProduct) return { ...item, count: item.count - 1 };
      return item;
    })
    .filter((item) => {
      return item.count;
    });
}
