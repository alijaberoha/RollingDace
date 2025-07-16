import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Type du produit
export type Produit = {
  id: string;
  name: string;
  age?: number;
  rating?: number;
  players?: {
    min?: number;
    max?: number;
  };
};

// ✅ Type du state
type ProduitState = {
  items: Produit[];
  loading: boolean;
  error: string | null;
};

// ✅ Initial state
const initialState: ProduitState = {
  items: [],
  loading: false,
  error: null,
};

// ✅ Thunk pour récupérer les produits depuis le fichier local
export const fetchProduits = createAsyncThunk<Produit[]>(
  "produits/fetch",
  async () => {
    const response = await axios.get("/jeux_50.json");
    return response.data;
  }
);

// ✅ Slice
const produitSlice = createSlice({
  name: "produits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduits.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProduits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erreur inconnue";
      });
  },
});

export default produitSlice.reducer;
