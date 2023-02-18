import { createHashRouter } from "react-router-dom";
import { exerciseRoute } from "./exercises/exercises";
import { homeRoute } from "./home/Home";

export const router = createHashRouter([homeRoute, exerciseRoute]);
