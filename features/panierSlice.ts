// features/panierSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProduitPanier {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  currency: string;
  quantity: number;
}

interface PanierState {
  items: ProduitPanier[];
}

const initialState: PanierState = {
  items: [],
};

const panierSlice = createSlice({
  name: "panier",
  initialState,
  reducers: {
    ajouterAuPanier: (state, action: PayloadAction<Omit<ProduitPanier, "quantity">>) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementerQuantite: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementerQuantite: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    supprimerDuPanier: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const {
  ajouterAuPanier,
  incrementerQuantite,
  decrementerQuantite,
  supprimerDuPanier
} = panierSlice.actions;

export default panierSlice.reducer;
