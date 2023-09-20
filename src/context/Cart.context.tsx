"use client"
import { Product } from "@prisma/client"
import React, { createContext, useContext, useEffect, useReducer } from "react"

interface Item {
  product: Product
  units: number
}

interface Cart {
  items: Item[]
}
interface CartContext {
  state: Cart
  dispatch: React.Dispatch<any>
}

const initialState: Cart = {
  items: [],
}

export const initializer = (initialValue = initialState) => {
  const cartState = localStorage.getItem("CART_STATE")
  if (cartState && cartState !== null) {
    return JSON.parse(cartState)
  }
  return initialValue
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export enum ActionTypes {
  Add = "ADD_ITEM",
  Delete = "DELETE_ITEM",
  Update = "UPDATE_ITEM",
  Load = "LOAD_CART",
}

type CartPayload = {
  [ActionTypes.Add]: Item
  [ActionTypes.Delete]: Item
  [ActionTypes.Update]: Item
  [ActionTypes.Load]: Cart
}

export type CartActions = ActionMap<CartPayload>[keyof ActionMap<CartPayload>]

const cartReducer = (state: Cart, action: any): Cart => {
  switch (action.type) {
    case ActionTypes.Add:
      return { ...state, items: [...state.items, action.payload] }

    case ActionTypes.Delete:
      return {
        ...state,
        items: state.items.filter((item) => item !== action.payload),
      }

    case ActionTypes.Update:
      const updatedItems = state.items.map((item) =>
        item === action.payload ? action.payload.newItem : item
      )
      return { ...state, items: updatedItems }

    case ActionTypes.Load:
      const { items } = action.payload
      return { items }

    default:
      return state
  }
}

export const CartContext = createContext<{
  state: Cart
  dispatch: React.Dispatch<CartActions>
}>({
  state: initialState,
  dispatch: () => null,
})

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, initializer)

  useEffect(() => {
    if (!state) return
    window.localStorage.setItem("CART_STATE", JSON.stringify(state))
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
export const useCartContext = () => useContext(CartContext)
