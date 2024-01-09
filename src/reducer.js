export const initialState = {
	fields: ['', '', '', '', '', '', '', '', ''],
	isDraw: false,
	isGameEnded: false,
	currentPlayer: 'X'
};

export function appReducer(state = initialState, action){
	const { type, payload } = action;

	switch(type){
		case 'SET_CURRENT_PLAYER': {
			return payload;
		}
		case 'SET_IS_GAME_ENDED': {
			return payload;
		}
		case 'SET_IS_DRAW': {
			return payload;
		}
		case 'SET_FIELDS': {
			return payload;
		}
		default:
			return state;
	}
};
