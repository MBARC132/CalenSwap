import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getSwappableSlots, getSwapRequests, requestSwap, respondSwap } from '../controllers/swap.controller.js';


const SwapRoutes = (app) => {
    app.use(authMiddleware);

    app.get('/swappable-slots', getSwappableSlots);
    app.post('/swap-request', requestSwap);
    app.get("/swap-requests", getSwapRequests);
    app.post("/swap-response/:requestId", respondSwap);
}

export default SwapRoutes;