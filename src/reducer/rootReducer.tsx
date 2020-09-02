import { combineReducers } from "redux";
import inventoryReducer from "../reducers/inventoryReducer";
import cartReducer from "../reducers/cartReducer";
import tokenReducer from "../reducers/loginReducer";
import feedbackReducer from "../reducers/feedbackReducer";
import findReducer from "../reducers/findReducer";
import adminUserReducer from "../reducers/adminUserReducer";
import tableActionsReducer from "../reducers/tableActionsReducer";

const rootReducer = combineReducers(
    {
        inventory: inventoryReducer,
        cart: cartReducer,
        token: tokenReducer,
        feedback: feedbackReducer,  // TODO: Is the feedback useful in future?
        foundResult: findReducer,   // TODO: We can move the found results to the specific local page.
        adminUser: adminUserReducer,
        tableActions: tableActionsReducer
    }
)

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer