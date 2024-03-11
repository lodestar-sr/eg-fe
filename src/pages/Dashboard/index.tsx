import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useAuthContext } from '../../providers';

export const Dashboard = () => {
  const { user, setToken } = useAuthContext();

  const onLogout = () => {
    setToken(undefined);
  };

  return (
    <div className="flex-center h-screen flex-col gap-2 text-center text-xl">
      <h1>👋 Hi, {user!.name}</h1>
      <h2>Welcome to the application.</h2>

      <Button
        className="!mt-8 !px-8"
        variant="contained"
        startIcon={<Logout />}
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
};
