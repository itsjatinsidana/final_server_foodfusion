import { configureStore } from "@reduxjs/toolkit";
import menuItem from "./Slices/menuItem";
import { setMenuItems } from "./Slices/menuItem";

const store = configureStore({
    reducer:{
        menu:menuItem
    }
})
export {store,setMenuItems}