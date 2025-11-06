import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createEvent, deleteEvent, getMyEvent, updateEventStatus } from "../controllers/event.controller.js";

const EventRoutes = (app) => {
    app.use(authMiddleware);

    app.post("/", createEvent);
    app.get("/me", getMyEvent);
    app.patch("/:id/status", updateEventStatus);
    app.delete('/delete/:id', deleteEvent)
}

export default EventRoutes;