import { configureStore } from "@reduxjs/toolkit";
import videoSlicer from "../slicers/video-slicer";

export const store = configureStore({
    reducer: videoSlicer
})