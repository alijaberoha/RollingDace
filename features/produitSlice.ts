import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduits = createAsyncThunk("produits/fetch", async () => {
  const response = await axios.get("/jeux_50.json"); // ✅ fichier local
  return response.data;
});

const produitSlice = createSlice({
  name: "produits",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
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
        state.error = action.error.message || "Erreur inconnue";
      });
  },
});

export default produitSlice.reducer;
