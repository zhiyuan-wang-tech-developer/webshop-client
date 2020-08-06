import { combineReducers } from "redux";
import inventoryReducer from "./inventory/reducer";
import cartReducer from "./cart/reducer";
import tokenReducer from "./login/reducer";
import feedbackReducer from "./feedback/reducer";

const rootReducer = combineReducers(
    {
        inventoryState: inventoryReducer,
        cartState: cartReducer,
        tokenState: tokenReducer,
        feedbackState: feedbackReducer
    }
)

export type RootStateType = ReturnType<typeof rootReducer>
export default rootReducer