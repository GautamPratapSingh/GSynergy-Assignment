import { createSlice } from '@reduxjs/toolkit';

interface NavItem {
  id: number;
  label: string;
  icon: string;
}

interface NavState {
  items: NavItem[];
}

const initialState: NavState = {
  items: [
    { id: 1, label: 'Stores', icon: '🏬' },
    { id: 2, label: 'SKUs', icon: '📦' },
    { id: 3, label: 'Calendar', icon: '📅' },
    { id: 4, label: 'Planning', icon: '📝' },
    { id: 5, label: 'Calculations', icon: '🧮' },
    { id: 6, label: 'Chart', icon: '📈' },
  ],
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {},
});

export default navSlice.reducer;