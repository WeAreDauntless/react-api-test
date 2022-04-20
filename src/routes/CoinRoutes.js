import React from 'react';
import {Route, Routes} from "react-router-dom";
import Coins from "../pages/Coins";
import Coin from "../pages/Coin";

const CoinRoutes = () => {
    return (
        <Routes>
            <Route path="/coins/markets" element={<Coins/>}/>
            <Route path="/currency/:id" element={<Coin/>}/>
        </Routes>
    );
};

export default CoinRoutes;