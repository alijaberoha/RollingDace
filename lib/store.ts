import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import authReducer from "@/features/authSlice";
import produitReducer from "@/features/produitSlice";
import panierReducer from "@/features/panierSlice"; // ✅ importe le nouveau slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    produits: produitReducer,
    panier: panierReducer, // ✅ ajoute ici
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
