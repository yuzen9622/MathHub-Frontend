import { tokenUtils } from "@/lib/cookieUtils";
import { loginFailure, loginStart, loginSuccess } from "@/redux/slices/AuthSlice";
import type { RootState } from "@/redux/store/app";
import { authAPI } from "@/services/authService";
import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface User {
  id: string;
  name: string;
  email: string;
  account: string;
  permissionList: string[];
}

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  onSwitchToForgotPassword?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}) => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state: RootState) => state.authSlice);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    // Email 驗證
    if (!formData.email) {
      errors.email = "請輸入電子郵件";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "請輸入有效的電子郵件格式";
    }

    // 密碼驗證
    if (!formData.password) {
      errors.password = "請輸入密碼";
    } else if (formData.password.length < 6) {
      errors.password = "密碼至少需要 6 個字元";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 清除對應的驗證錯誤
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(loginStart());

    try {
      const response = await authAPI.login(formData) as {
        accessToken: string;
        idToken: string;
        refreshToken: string;
        user: User;
        expiresIn: number;
      };

      // 設定 tokens (refresh token 由後端設定為 HttpOnly Cookie)
      tokenUtils.setAccessToken(response.accessToken, response.expiresIn);
      tokenUtils.setIdToken(response.idToken, response.expiresIn);
      // refresh token 由後端自動設定為 HttpOnly Cookie，前端不需要手動處理

      // 更新 Redux state
      dispatch(
        loginSuccess({
          user: response.user,
        }),
      );

      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "登入失敗，請稍後再試";
      dispatch(loginFailure(errorMessage));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">登入您的帳戶</h2>
          <p className="mt-2 text-center text-sm text-gray-600">歡迎回到 MathHub</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                電子郵件
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  validationErrors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="電子郵件地址"
                value={formData.email}
                onChange={handleInputChange}
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                密碼
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  validationErrors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="密碼"
                value={formData.password}
                onChange={handleInputChange}
              />
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">登入失敗</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                onClick={onSwitchToForgotPassword}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                忘記密碼？
              </button>
            </div>
            <div className="text-sm">
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                註冊新帳戶
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isFetching}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFetching ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isFetching ? "登入中..." : "登入"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
