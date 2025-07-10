import { type ComponentType, lazy } from 'react';

// 懶加載組件
const LoginForm = lazy(() => import('@/components/Auth/LoginForm'));
const About = lazy(() => import('@/pages/About/About'));
const Exam = lazy(() => import('@/pages/Exam/Exam'));
const Home = lazy(() => import('@/pages/Home/Home'));
const Playground = lazy(() => import('@/pages/Playground/Playground'));

// 路由配置介面
export interface RouteConfig {
	path: string;
	element: React.LazyExoticComponent<ComponentType>;
	requireAuth?: boolean;
	redirectTo?: string;
	title?: string;
	description?: string;
	permissions?: string[];
}

// 路由配置
export const routes: RouteConfig[] = [
	// 公開路由
	{
		path: '/',
		element: Home,
		title: '首頁',
		description: 'MathHub 首頁',
	},
	{
		path: '/exam/:questId',
		element: Exam,
		redirectTo: '/login',
		title: '考試',
		description: '數學考試',
	},
	{
		path: '/playground',
		element: Playground,
		title: '遊樂場',
		description: '數學遊樂場',
	},
	{
		path: '/about',
		element: About,
		title: '關於我們',
		description: '關於 MathHub',
	},

	// 登入頁面（已登入用戶不能訪問）
	{
		path: '/login',
		element: LoginForm,
		title: '登入',
		description: '用戶登入',
	},
];

// 根據路徑獲取路由配置
export const getRouteConfig = (path: string): RouteConfig | undefined => {
	return routes.find((route) => {
		// 處理動態路由參數
		if (route.path.includes(':')) {
			const routePathParts = route.path.split('/');
			const pathParts = path.split('/');

			if (routePathParts.length !== pathParts.length) {
				return false;
			}

			return routePathParts.every((part, index) => {
				return part.startsWith(':') || part === pathParts[index];
			});
		}

		return route.path === path;
	});
};

// 檢查路由是否需要權限
export const isRouteProtected = (path: string): boolean => {
	const config = getRouteConfig(path);
	return config?.requireAuth || false;
};

// 獲取路由重定向路徑
export const getRouteRedirect = (path: string): string | undefined => {
	const config = getRouteConfig(path);
	return config?.redirectTo;
};
