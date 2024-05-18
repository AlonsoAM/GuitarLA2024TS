import {useEffect, useMemo, useState} from "react";
import {db} from "../data/db.ts";
import type {CartItem, Guitar, GuitarID} from '../types'

export const useCart = () => {
    // Para App
    const initialCartState = (): CartItem[] => {
        const localCartState = localStorage.getItem("cart");
        return localCartState ? JSON.parse(localCartState) : [];
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCartState)
    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: Guitar) => {
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)

        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart];
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        } else {
            const newItem: CartItem = {...item, quantity: 1}
            setCart([...cart, newItem])
        }
    }

    const removeFromCart = (id: GuitarID) => {
        const updatedCart = cart.filter((guitar) => guitar.id !== id);
        setCart(updatedCart);
    }

    const increaseQuantity = (id: GuitarID) => {
        const updatedCart = cart.map((guitar) => {
            if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
                return {
                    ...guitar,
                    quantity: guitar.quantity + 1
                }
            }
            return guitar;
        });
        setCart(updatedCart);
    }

    const decrementQuantity = (id: GuitarID) => {
        const updatedCart = cart.map((guitar) => {
            if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
                return {
                    ...guitar,
                    quantity: guitar.quantity - 1
                }
            }
            return guitar;
        });
        setCart(updatedCart);
    }

    const clearCart = () => {
        setCart([]);
    }

    // Para el Header
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const total = useMemo(() => cart.reduce((acc, guitar) => acc + (guitar.price * guitar.quantity), 0), [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decrementQuantity,
        clearCart,
        isEmpty,
        total
    }


}