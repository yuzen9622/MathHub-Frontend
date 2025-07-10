import { tokenUtils } from '@/lib/cookieUtils';
import { initializeAuth, loginFailure, loginStart, loginSuccess, logout } from '@/redux/slices/AuthSlice';
import type { RootState } from '@/redux/store/app';
import { authAPI, cleanupTokenRefresh, setupTokenRefresh } from '@/services/authService';
import type { LoginRequest, LoginResponse, UpdateProfileResponse, User } from '@/types/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authState = useSelector((state: RootState) => state.authSlice);

	// 初始化認證狀態
	useEffect(() => {
		const initializeAuthState = async () => {
			const accessToken = tokenUtils.getAccessToken();

			if (accessToken) {
				try {
					// 檢查 token 是否過期
					if (!tokenUtils.isTokenExpired(accessToken)) {
						// 獲取用戶資訊
						const userData = (await authAPI.getCurrentUser()) as User;

						dispatch(
							initializeAuth({
								user: userData,
							})
						);
					} else {
						// Token 過期，嘗試刷新
						const refreshResult = await authAPI.refreshToken();
						if (!refreshResult) {
							// 刷新失敗，清除所有 tokens
							tokenUtils.clearTokens();
						}
					}
				} catch (error) {
					console.error('Failed to initialize auth state:', error);
					tokenUtils.clearTokens();
				}
			}
		};

		initializeAuthState();
	}, [dispatch]);

	// 設定自動刷新 token
	useEffect(() => {
		if (authState.isAuthenticated) {
			setupTokenRefresh();
		}

		// 清理函數：組件卸載時清理定時器
		return () => {
			cleanupTokenRefresh();
		};
	}, [authState.isAuthenticated]);

	// 登入
	const login = async (credentials: LoginRequest) => {
		dispatch(loginStart());

		try {
			const response = (await authAPI.login(credentials)) as LoginResponse;

			// 設定 tokens
			tokenUtils.setAccessToken(response.accessToken);
			tokenUtils.setIdToken(response.idToken);
			// Refresh Token 由後端設定為 HttpOnly Cookie，前端不需要手動儲存

			// 更新 Redux state
			dispatch(
				loginSuccess({
					user: response.user,
				})
			);

			return { success: true };
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : '登入失敗，請稍後再試';
			dispatch(loginFailure(errorMessage));
			return { success: false, error: errorMessage };
		}
	};

	// 登出
	const logoutUser = async () => {
		try {
			await authAPI.logout();
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			// 清除本地 tokens
			tokenUtils.clearTokens();
			dispatch(logout());
			navigate('/');
		}
	};

	// 刷新 token
	const refreshToken = async () => {
		return await authAPI.refreshToken();
	};

	// 更新用戶資訊
	const updateUserInfo = async (userData: Partial<User>) => {
		try {
			const response = (await authAPI.updateProfile(userData)) as UpdateProfileResponse;
			return { success: true, user: response.user };
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : '更新失敗';
			return { success: false, error: errorMessage };
		}
	};

	// 更改密碼
	const changePassword = async (currentPassword: string, newPassword: string) => {
		try {
			await authAPI.changePassword(currentPassword, newPassword);
			return { success: true };
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : '密碼更改失敗';
			return { success: false, error: errorMessage };
		}
	};

	// 忘記密碼
	const forgotPassword = async (email: string) => {
		try {
			await authAPI.forgotPassword(email);
			return { success: true };
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : '發送失敗';
			return { success: false, error: errorMessage };
		}
	};

	// 檢查是否有特定權限
	const hasPermission = (permission: string): boolean => {
		return authState.user?.permissionList.includes(permission) || false;
	};

	// 檢查是否有任一權限
	const hasAnyPermission = (permissions: string[]): boolean => {
		return permissions.some((permission) => hasPermission(permission));
	};

	// 檢查是否有所有權限
	const hasAllPermissions = (permissions: string[]): boolean => {
		return permissions.every((permission) => hasPermission(permission));
	};

	return {
		// 狀態
		user: authState.user,
		isAuthenticated: authState.isAuthenticated,
		isFetching: authState.isFetching,
		error: authState.error,

		// 操作
		login,
		logout: logoutUser,
		refreshToken,
		updateUserInfo,
		changePassword,
		forgotPassword,

		// 權限檢查
		hasPermission,
		hasAnyPermission,
		hasAllPermissions,
	};
};
