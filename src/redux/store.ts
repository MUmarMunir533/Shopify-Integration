import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// Persist configuration for the cart slice
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"], // Only persist the items array
};

// Wrap the cart reducer with persistReducer
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Combine all reducers; note ke cartReducer ko ab persistedCartReducer use kar rahe hain
const rootReducer = combineReducers({
  quickViewReducer,
  cartReducer: persistedCartReducer,
  wishlistReducer,
  productDetailsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions to avoid warnings
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export persistor to wrap your app with PersistGate (e.g., in _app.tsx or your layout)
export const persistor = persistStore(store);
