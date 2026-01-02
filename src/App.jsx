import React from "react";
import { PrimeReactProvider } from "primereact/api";
import AppRoutes from "./routes/AppRoutes";

const App = () => (
  <PrimeReactProvider>
    <AppRoutes />
  </PrimeReactProvider>
);

export default App;
