import { ReactElement, isValidElement } from 'react';
import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { AuthProvider } from '../../context/authContext';
import { ScreenBreakpointsProvider } from '../../context/screenBreakpoints';
import { FiltersProvider } from '../../context/FiltersContext';
import { SocketProvider } from '../../context/SocketContext';
import { ChatRoomProvider } from '../../context/ChatRoomContext';

import ErrorPage from '../../pages/ErrorPage';

interface RenderOptions {
  element: ReactElement;
  errorElement?: ReactElement;
  path: string;
}

const isReactElement = (obj: unknown): obj is ReactElement => {
  return typeof obj === 'object' && obj !== null && isValidElement(obj);
};

const renderWithRouter = (
  children: ReactElement | RenderOptions,
  routes: RenderOptions[] = []
): ReturnType<typeof render> => {
  const options: RenderOptions = isReactElement(children)
    ? { element: children, path: '/', errorElement: <ErrorPage /> }
    : children;

  const router = createMemoryRouter([{ ...options }, ...routes], {
    initialEntries: [options.path],
    initialIndex: 1,
  });

  return render(
    <AuthProvider>
      <ScreenBreakpointsProvider>
        <FiltersProvider>
          <SocketProvider>
            <ChatRoomProvider>
              <RouterProvider router={router} />
            </ChatRoomProvider>
          </SocketProvider>
        </FiltersProvider>
      </ScreenBreakpointsProvider>
    </AuthProvider>
  );
};

export default renderWithRouter;
