import { Route, Routes as ReactRoutes, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const Bikes = lazy(() => import("./pages/Bikes"));


function App() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route
          path="/"
          element={
            <Suspense fallback={<></>}>
              <Bikes />
            </Suspense>
          }
        />
      </ReactRoutes>
    </BrowserRouter>
  );
}

export default App;
