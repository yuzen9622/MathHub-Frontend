import { LoginRouteGuard, PermissionDenied, RouteGuard } from '@/components/RouteGuard/RouteGuard';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { type RouteConfig, routes } from './routeConfig';

// 載入中組件
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
  </div>
);

// 404 頁面組件
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
    <p className="text-gray-600 mb-8">頁面不存在</p>
    <Navigate to="/" replace />
  </div>
);

// 渲染路由組件
const renderRoute = (route: RouteConfig) => {
  const RouteComponent = route.element;

  // 登入頁面特殊處理
  if (route.path === '/login') {
    return (
      <LoginRouteGuard>
        <RouteComponent />
      </LoginRouteGuard>
    );
  }

  // 需要認證的路由
  if (route.requireAuth) {
    return (
      <RouteGuard
        requireAuth={true}
        redirectTo={route.redirectTo || '/login'}
        permissions={route.permissions}
        fallback={<PermissionDenied />}
      >
        <RouteComponent />
      </RouteGuard>
    );
  }

  // 公開路由
  return <RouteComponent />;
};

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* 動態生成路由 */}
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={renderRoute(route)}
          />
        ))}

        {/* 404 路由 - 必須放在最後 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
