import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SKU {
  ID: string;
  Label: string;
  Class: string;
  Department: string;
  Price: number;
  Cost: number;
  id: string;
}

interface SKUsState {
  skus: SKU[];
}

const initialState: SKUsState = {
  skus: [],
};

const skusSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    setSKUs: (state, action: PayloadAction<SKU[]>) => {
      state.skus = action.payload;
    },
  },
});

export const { setSKUs } = skusSlice.actions;
export default skusSlice.reducer;