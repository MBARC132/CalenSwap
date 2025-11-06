import express from "express";
import { register, signin } from "../controllers/user.controller.js";

const UserRoutes = (app) => {
    app.post('/register', register)
    app.post('/signin', signin)
}

export default UserRoutes;