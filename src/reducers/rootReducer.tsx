import { combineReducers } from "redux";
import inventoryReducer from "./inventoryReducer";
import cartReducer from "./cartReducer";
import tokenReducer from "./loginReducer";
import feedbackReducer from "./feedbackReducer";

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