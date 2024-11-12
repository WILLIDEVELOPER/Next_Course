import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  subTotal: number;
  tax: number;
  total: number;
  itemsInCart: number;
  getTotalItems: () => number;
  updateCartSummary: () => void;
  addProductTocart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      subTotal: 0,
      tax: 0,
      total: 0,
      itemsInCart: 0,

      // Helper function to update calculated values

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      updateCartSummary: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (sum, product) => product.quantity * product.price + sum,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

        set({ subTotal, tax, total, itemsInCart });
      },

      addProductTocart: (product: CartProduct) => {
        const { cart, updateCartSummary } = get();

        // Check if the product with the selected size is already in the cart
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
        } else {
          // Increment quantity if the product exists
          const updatedCartProducts = cart.map((item) => {
            if (item.id === product.id && item.size === product.size) {
              return { ...item, quantity: item.quantity + product.quantity };
            }
            return item;
          });

          set({ cart: updatedCartProducts });
        }

        // Update cart summary values
        updateCartSummary();
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart, updateCartSummary } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
        updateCartSummary();
      },

      removeProduct: (product: CartProduct) => {
        const { cart, updateCartSummary } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });
        updateCartSummary();
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
