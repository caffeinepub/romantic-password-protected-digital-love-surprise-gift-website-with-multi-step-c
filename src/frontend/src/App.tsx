import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import GiftCreatorPage from './pages/GiftCreatorPage';
import GiftUnlockPage from './pages/GiftUnlockPage';
import AppLayout from './components/layout/AppLayout';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: GiftCreatorPage,
});

const giftRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gift/$giftId',
  component: GiftUnlockPage,
});

const routeTree = rootRoute.addChildren([indexRoute, giftRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
