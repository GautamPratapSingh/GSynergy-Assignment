import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Chart {
  Week: string;
  "GM Dollars": number;
  "Sales Dollars": number;
  "GM %": number;
  id: string;
}

interface ChartState {
  chart: Chart[];
}

const initialState: ChartState = {
  chart: [],
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setChart: (state, action: PayloadAction<Chart[]>) => {
      state.chart = action.payload;
    },
  },
});

export const { setChart } = chartSlice.actions;
export default chartSlice.reducer;