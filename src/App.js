import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import AppRouter from "./components/AppRouter";
import Sidebar from "./scenes/global/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase/firebase.utils.js";

function App() {
  const [theme, colorMode] = useMode();
  const [user] = useAuthState(auth);

  console.log(db);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar user={user} />
          <main className="content">
            <Topbar user={user} />
            <AppRouter />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
