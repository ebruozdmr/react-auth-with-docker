import { AuthProvider } from "./context/authContext";
import { PersonnelProvider } from "./context/personnelContext";
import Router from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <PersonnelProvider>
        <Router></Router>
      </PersonnelProvider>
    </AuthProvider>
  );
}
export default App;
