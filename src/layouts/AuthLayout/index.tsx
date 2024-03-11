import { FC, PropsWithChildren } from 'react';
import { Logo } from '../../components';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="flex-center min-h-screen flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(/assets/images/auth-bg.png)` }}
    >
      <Logo className="mb-16 w-60" />
      <div className="w-120 max-w-[90vw] rounded-lg bg-white px-8 py-12 shadow-lg">
        {children}
      </div>
    </div>
  );
};
