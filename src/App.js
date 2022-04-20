import React from "react";
import {BrowserRouter} from "react-router-dom";
import CoinRoutes from "./routes/CoinRoutes";

const App = () => {
    return (
        <BrowserRouter>
            <CoinRoutes/>
        </BrowserRouter>
    );
};

export default App;