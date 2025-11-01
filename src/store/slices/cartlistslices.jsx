import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const cartListSlice = createSlice({
  name: 'cartList',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload
      const price = parseFloat(newItem.price) || 0
      const existingItem = state.items.find(item => item.id === newItem.id)

      if (existingItem) {
        existingItem.quantity += 1
        existingItem.totalPrice = parseFloat(existingItem.totalPrice) + price
      } else {
        state.items.push({
          ...newItem,
          id: newItem.id ?? Date.now().toString(),
          quantity: 1,
          totalPrice: price,
        })
      }

      state.totalQuantity += 1
      state.totalAmount = parseFloat(state.totalAmount) + price
    },
    removeItem: (state, action) => {
      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity
        state.totalAmount -= parseFloat(existingItem.totalPrice)
        state.items = state.items.filter(item => item.id !== id)
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const existingItem = state.items.find(item => item.id === id)
      if (!existingItem || quantity <= 0) return

      const oldQuantity = existingItem.quantity
      const unitPrice = parseFloat(existingItem.price) || (existingItem.totalPrice / oldQuantity) || 0
      const newTotalPrice = unitPrice * quantity

      state.totalQuantity += (quantity - oldQuantity)
      state.totalAmount += (newTotalPrice - existingItem.totalPrice)

      existingItem.quantity = quantity
      existingItem.totalPrice = newTotalPrice
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1
        const unitPrice = parseFloat(existingItem.price) || (existingItem.totalPrice / (existingItem.quantity + 1)) || 0
        existingItem.totalPrice = parseFloat(existingItem.totalPrice) - unitPrice
        state.totalQuantity -= 1
        state.totalAmount -= unitPrice
      } else if (existingItem && existingItem.quantity === 1) {
        state.totalQuantity -= 1
        state.totalAmount -= parseFloat(existingItem.totalPrice)
        state.items = state.items.filter(item => item.id !== id)
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
    },
  },
})

export const { addItem, removeItem, updateQuantity, decreaseQuantity, clearCart } = cartListSlice.actions
export default cartListSlice.reducer