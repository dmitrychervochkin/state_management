import styles from './App.module.css';
import { LogoContainer } from './logo/logo';
import { FieldLayout } from './field/fieldLayout';
import { InfoContainer } from './info/infoContainer';
import React, { useEffect, useState } from 'react';
import { store } from './store';

export function App() {
	const [ state, setState ] = useState(store.getState());
	const { fields, isDraw, isGameEnded, currentPlayer } = store.getState();

	function whoIsWinner(field){
		const WIN_PATTERNS = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8], // Варианты побед по горизонтали
			[0, 3, 6], [1, 4, 7], [2, 5, 8], // Варианты побед по вертикали
			[0, 4, 8], [2, 4, 6], // Варианты побед по диагонали
		];

		for (let i = 0; i < WIN_PATTERNS.length; i++) {
			const [a, b, c] = WIN_PATTERNS[i];
			if (field[a] &&	field[a] === field[b] && field[a] === field[c]) {
				return field[a];
			}
		}
		return null;
	};

	useEffect(() => {
		function handleChange(){
			setState(store.getState());
		}
		const unsubscribe = store.subscribe(handleChange);

		return () => unsubscribe();
	}, []);


	function handleClick(index) {
		const fieldsCopy = [...fields];

		if(!isGameEnded && fieldsCopy[index] === ''){
			fieldsCopy[index] = currentPlayer;
			store.dispatch({ type: 'SET_FIELDS', payload: fieldsCopy });
			// setFields(fieldsCopy);
		}

		if(whoIsWinner(fieldsCopy)){
			store.dispatch({ type: 'SET_IS_GAME_ENDED', payload: true });
			// setIsGameEnded(true);
			return null
		} else if (whoIsWinner(fieldsCopy) === null && fieldsCopy.indexOf('') === -1){
			store.dispatch({ type: 'SET_IS_DRAW', payload: true });
			// setIsDraw(true);
		} else if (whoIsWinner(fieldsCopy) === null && fieldsCopy.indexOf('') !== -1){
			store.dispatch({ type: 'SET_CURRENT_PLAYER', payload: currentPlayer === 'X' ? 'O' : 'X' });
			// setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
		}
	}

	function handleRestart(){
		store.dispatch({ type: 'SET_CURRENT_PLAYER', payload: 'X' });
		store.dispatch({ type: 'SET_IS_GAME_ENDED', payload: false });
		store.dispatch({ type: 'SET_IS_DRAW', payload: false });
		store.dispatch({ type: 'SET_FIELDS', payload: ['', '', '', '', '', '', '', '', ''] });
	}

	return (
		<div className={styles.App}>
			<LogoContainer />
			<InfoContainer/>
			<FieldLayout handleClick={handleClick} />
			<button
				onClick={handleRestart}
				className={styles.restart_btn}
			>
				Начать заново
			</button>
		</div>
	);
}

