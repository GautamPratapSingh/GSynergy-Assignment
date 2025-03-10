import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Calculation {
  Store: string;
  SKU: string;
  Week: string;
  "Sales Units": number;
  "Sales Dollars": number;
  "Cost Dollars": number;
  "GM Dollars": number;
  "GM %": number;
  id: string;
}

interface CalculationsState {
  calculations: Calculation[];
}

const initialState: CalculationsState = {
  calculations: [],
};

const calculationsSlice = createSlice({
  name: 'calculations',
  initialState,
  reducers: {
    setCalculations: (state, action: PayloadAction<Calculation[]>) => {
      state.calculations = action.payload;
    },
  },
});

export const { setCalculations } = calculationsSlice.actions;
export default calculationsSlice.reducer;