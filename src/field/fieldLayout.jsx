import styles from './field.module.css';
import React from 'react';
import { FieldContainer } from './fieldContainer';
import PropTypes from 'prop-types';
import { store } from '../store';

export function FieldLayout({handleClick}) {
	const { fields } = store.getState();

	return (
		<div className={styles.container}>
			{fields?.map((field, index) => (
				<FieldContainer
					key={index}
					index={index}
					field={field}
					handleClick={handleClick}
				/>
			))}
		</div>
	);
}

FieldLayout.propTypes ={
	// fields: PropTypes.array.isRequired,
	handleClick: PropTypes.func
}
