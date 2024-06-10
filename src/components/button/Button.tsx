import React from 'react';
import clsx from 'clsx';

import { Text } from 'components/text';

import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
	variant,
}: {
	variant: 'primary' | 'secondary';
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	return (
		<button
			className={clsx(
				styles.button,
				variant === 'primary' ? styles.primary : styles.secondary
			)}
			type={type}
			onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
