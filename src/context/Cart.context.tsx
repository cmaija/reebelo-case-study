"use client"
import { Product } from "@/lib/interfaces"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react"

export interface Item {
  product: Product
  units: number
}

interface Cart {
  items: {
    [productId: string]: Item
  }
}
interface CartContext {
  state: Cart
  dispatch: React.Dispatch<any>
  itemsCount: number
}

const initialState: Cart = {
  items: {},
}

export const initializer = (initialValue = initialState) => {
  if (typeof window !== "undefined" && window?.localStorage) {
    const cartState = window.localStorage.getItem("CART_STATE")
    if (cartState && cartState !== null) {
      return JSON.parse(cartState)
    }
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
  DeleteItem = "DELETE_ITEM_BY_ID",
  Load = "LOAD_CART",
  UpdateItemCount = "UPDATE_ITEM_COUNT",
  ClearCart = "CLEAR_CART",
}

type CartPayload = {
  [ActionTypes.Add]: Item
  [ActionTypes.Delete]: Product
  [ActionTypes.DeleteItem]: Product
  [ActionTypes.UpdateItemCount]: Item
  [ActionTypes.Load]: Cart
  [ActionTypes.ClearCart]: null
}

export type CartActions = ActionMap<CartPayload>[keyof ActionMap<CartPayload>]

const cartReducer = (state: Cart, action: CartActions): Cart => {
  let newState
  switch (action.type) {
    case ActionTypes.Add:
      newState = structuredClone(state)
      let oldItem = structuredClone(newState.items[action.payload.product.id])
      if (oldItem) {
        newState.items[action.payload.product.id] = {
          ...oldItem,
          units: oldItem.units + action.payload.units,
        }
      } else {
        newState.items[action.payload.product.id] = {
          product: action.payload.product,
          units: action.payload.units,
        }
      }
      return newState

    case ActionTypes.Delete:
      newState = structuredClone(state)
      if (newState.items[action.payload.id]) {
        newState.items[action.payload.id].units > 1
          ? newState.items[action.payload.id].units--
          : delete newState.items[action.payload.id]
      }
      return newState

    case ActionTypes.DeleteItem:
      newState = structuredClone(state)
      delete newState.items[action.payload.id]
      return newState

    case ActionTypes.Load:
      const { items } = action.payload
      return { ...state, items }

    case ActionTypes.ClearCart:
      return { ...state, items: {} }

    case ActionTypes.UpdateItemCount:
      newState = structuredClone(state)
      newState.items[action.payload.product.id] = action.payload
      return newState
    default:
      return state
  }
}

export const CartContext = createContext<{
  state: Cart
  dispatch: React.Dispatch<CartActions>
  itemsCount: number
}>({
  state: initialState,
  dispatch: () => null,
  itemsCount: 0,
})

function countItems(cart: Cart) {
  return Object.values(cart.items).reduce((count: number, item: Item) => {
    return count + item.units
  }, 0)
}

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, initializer)
  const itemsCount = useMemo(() => countItems(state), [state.items])

  useEffect(() => {
    if (!state || typeof window === "undefined" || !window?.localStorage) return
    window.localStorage.setItem("CART_STATE", JSON.stringify(state))
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch, itemsCount }}>
      {children}
    </CartContext.Provider>
  )
}
export const useCartContext = () => useContext(CartContext)
