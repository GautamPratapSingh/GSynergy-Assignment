import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface SKU {
    ID: string;
    Label: string;
    Class: string;
    Department: string;
    Price: number;
    Cost: number;
    id: string;
  }

interface SKUState {
  skus: SKU[];
}

const initialState: SKUState = {
  skus: [],
};

export const fetchSKUs = createAsyncThunk('skus/fetchSKUs', async () => {
  const response = await axios.get('http://localhost:3001/SKUs');
  return response.data;
});

const skuSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.skus.push(action.payload);
    },
    updateSKU: (state, action: PayloadAction<{ id: string; updates: Partial<SKU> }>) => {
      const { id, updates } = action.payload;
      const index = state.skus.findIndex((sku) => sku.id === id);
      if (index !== -1) {
        state.skus[index] = { ...state.skus[index], ...updates };
      }
    },
    deleteSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSKUs.fulfilled, (state, action) => {
      state.skus = action.payload;
    });
  },
});

export const { addSKU, updateSKU, deleteSKU } = skuSlice.actions;
export default skuSlice.reducer;