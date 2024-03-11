import { CssBaseline } from '@mui/material';
import { AuthProvider, ThemeProvider } from './providers';
import { Routing } from './Routing.tsx';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
