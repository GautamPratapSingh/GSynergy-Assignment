import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Store {
    id: string;
    "Seq No.": number;
    name?: string;
    Label?: string;
    City: string;
    State: string;
  }

interface StoresState {
  stores: Store[];
  loading: boolean;
  error: string | null;
}

const initialState: StoresState = {
  stores: [],
  loading: false,
  error: null,
};

// Async thunk to fetch stores
export const fetchStores = createAsyncThunk('stores/fetchStores', async () => {
  const response = await axios.get('http://localhost:3001/Stores');
  return response.data; // Assuming data is an array of stores
});

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore(state, action: PayloadAction<Store>) {
      state.stores.push(action.payload);
    },
    removeStore(state, action: PayloadAction<string>) {
      state.stores = state.stores.filter((store) => store.id !== action.payload);
    },
    updateStore(state, action: PayloadAction<Store>) {
      const index = state.stores.findIndex((store) => store.id === action.payload.id);
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
    },
    reorderStores: (state, action: PayloadAction<Store[]>) => {
        state.stores = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action: PayloadAction<Store[]>) => {
        state.stores = action.payload;
        state.loading = false;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch stores';
      });
  },
});

export const { addStore, removeStore, updateStore , reorderStores} = storesSlice.actions;
export default storesSlice.reducer;