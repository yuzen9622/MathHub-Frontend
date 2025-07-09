import { createSlice } from '@reduxjs/toolkit';

import { getUUID } from '@lib/utils';

const toastSlice = createSlice({
	name: 'toast',
	initialState: {
		toasts: [],
	},

	reducers: {
		AddToast(state, action) {
			state.toasts = [...state.toasts, {...action.payload, id: getUUID() }]
		},

		RemoveToast(state, action) {
			state.toasts = state.toasts.slice(0, state.toasts.length - 1);
		},
	},
});

export const { AddToast, RemoveToast } = toastSlice.actions;

export default toastSlice.reducer;
