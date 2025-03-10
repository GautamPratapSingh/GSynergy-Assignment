import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Planning {
  Store: string;
  SKU: string;
  Week: string;
  "Sales Units": number;
  id: string;
}

interface PlanningState {
  planning: Planning[];
}

const initialState: PlanningState = {
  planning: [],
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    setPlanning: (state, action: PayloadAction<Planning[]>) => {
      state.planning = action.payload;
    },
  },
});

export const { setPlanning } = planningSlice.actions;
export default planningSlice.reducer;