import { combineReducers } from "redux";
import inventoryReducer from "../reducers/inventoryReducer";
import cartReducer from "../reducers/cartReducer";
import tokenReducer from "../reducers/loginReducer";
import feedbackReducer from "../reducers/feedbackReducer";
import findReducer from "../reducers/findReducer";

const rootReducer = combineReducers(
    {
        inventoryState: inventoryReducer,
        cartState: cartReducer,
        tokenState: tokenReducer,
        feedbackState: feedbackReducer,
        foundResultState: findReducer
    }
)

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer