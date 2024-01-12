import { appReducer } from "./reducer";
import { legacy_createStore as createStore } from "redux";

// function createStore(reducer){
// 	let state;

// 	return {
// 		dispatch: (action) => {
// 			state = reducer(state, action);
// 		},
// 		getState: () => state,
// 	};
// };

export const store = createStore(appReducer);

// store.dispatch({});

