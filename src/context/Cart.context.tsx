"use client"
import React, { createContext, useContext, useReducer } from "react"

interface Item {
  id: number
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
}

type CartPayload = {
  [ActionTypes.Add]: Item
  [ActionTypes.Delete]: Item
  [ActionTypes.Update]: Item
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
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
export const useCartContext = () => useContext(CartContext)
