import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		userToken: localStorage.getItem("userToken") || sessionStorage.getItem("userToken") || null,
		userName: localStorage.getItem("userName") || sessionStorage.getItem("userName") || null,
		userID: localStorage.getItem("userID") || sessionStorage.getItem("userID") || null,
		userAccount: null,
		refreshToken: localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken") || null,
		// lastChangePasswordTime: localStorage.getItem("lastChangePasswordTime") || null,
		// roles: [],
		companyName: null,
		userEmail: null,
		userPhone: null,
		defaultPage: null,
		permissionList: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		LoginStart(state, action) {
			state.userToken = null;
			state.userName = null;
			state.userID = null;
			state.userAccount = null;
			state.refreshToken = null;
			// state.lastChangePasswordTime = null;
			// state.roles = [];
			state.companyName = null;
			state.userEmail = null;
			state.userPhone = null;
			state.defaultPage = null;
			state.permissionList = [];
			state.isFetching = true;
			state.error = false;
		},

		LoginSuccess(state, action) {
			state.userToken = action.payload.token;
			state.userName = action.payload.name;
			state.userID = action.payload.userID;
			state.userAccount = action.payload.account;
			state.refreshToken = action.payload.refreshToken;
			// state.lastChangePasswordTime = action.payload.lastChangePasswordTime;
			// state.roles = action.payload.roles;
			state.companyName = action.payload.companyName;
			state.userEmail = action.payload.email;
			state.userPhone = action.payload.phone;
			state.defaultPage = action.payload.defaultPage;
			state.permissionList = action.payload.permissionList;
			state.isFetching = false;
			state.error = false;
		},

		LoginFailure(state, action) { 
			state.userToken = null;
			state.userName = null;
			state.userID = null;
			state.userAccount = null;
			state.refreshToken = null;
			// state.lastChangePasswordTime = null;
			// state.roles = [];
			state.companyName = null;
			state.userEmail = null;
			state.userPhone = null;
			state.defaultPage = null;
			state.permissionList = [];
			state.isFetching = false;
			state.error = true;
		},

		LogOut(state, action) {
			state.userToken = null;
			state.userName = null;
			state.userID = null;
			state.userAccount = null;
			state.refreshToken = null;
			// state.lastChangePasswordTime = null;
			// state.roles = [];
			state.companyName = null;
			state.userEmail = null;
			state.userPhone = null;
			state.defaultPage = null;
			state.permissionList = [];
			state.isFetching = false;
			state.error = false;
		},

		UpdateChangePasswordTime(state, action) { 
			// state.lastChangePasswordTime = action.payload;
		},

		UpdateDefaultPage(state, action) {
			state.defaultPage = action.payload;
		},

		UpdateUserInfo(state, action) {
			state.userName = action.payload.name;
			state.userEmail = action.payload.email;
			state.userPhone = action.payload.phoneNum;
		},

		VerifyUserToken(state,action) {
			state.userName = action.payload.name;
			state.userID= action.payload.userID;
			state.userAccount = action.payload.account;
			state.companyName = action.payload.companyName;
			state.userEmail = action.payload.email;
			state.userPhone = action.payload.phoneNum;
			state.defaultPage = action.payload.dashboardDefaultPage;
			state.permissionList = action.payload.permissionList;
		},

		RefreshToken(state,action) {
			state.userToken = action.payload.idToken;
			state.userID = action.payload.userID;
			state.refreshToken = action.payload.refreshToken;
		}
	},
});

export const { LoginStart, LoginSuccess, LoginFailure, LogOut, UpdateChangePasswordTime, UpdateDefaultPage, UpdateUserInfo, VerifyUserToken, RefreshToken } = authSlice.actions;

export default authSlice.reducer;