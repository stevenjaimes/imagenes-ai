import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-1 py-6">
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;