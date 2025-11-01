import { configureStore } from '@reduxjs/toolkit'
import cartListReducer from './slices/cartlistslices'

const store = configureStore({
  reducer: {
    cartList: cartListReducer,
  },
})

export default store