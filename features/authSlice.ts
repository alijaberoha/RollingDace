import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ 1. Type utilisateur
export type User = {
  email: string;
  abonnement: boolean;
};

// ✅ 2. Type de l'état global auth
type AuthState = {
  user: User | null;
};

// ✅ 3. State initial avec type explicite
const initialState: AuthState = {
  user: null,
};

// ✅ 4. Slice avec typage de l'action login
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
