import { combineReducers } from "redux";
import inventoryReducer from "../reducers/inventory.reducer";
import cartReducer from "../reducers/cart.reducer";
import tokenReducer from "../reducers/login.reducer";
import feedbackReducer from "../reducers/feedback.reducer";
import findReducer from "../reducers/find.reducer";
import adminUserReducer from "../reducers/admin.user.reducer";
import tableActionsReducer from "../reducers/table.actions.reducer";

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