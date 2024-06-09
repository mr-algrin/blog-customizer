import { FormEvent, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';

import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	backgroundColors,
	defaultArticleState,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [state, setState] = useState<ArticleStateType>({
		...defaultArticleState,
	});

	const onChange =
		<Key extends keyof ArticleStateType>(key: Key) =>
		(value: ArticleStateType[Key]) => {
			setState((prev) => ({ ...prev, [key]: value }));
		};

	const onClick = () => setIsOpen((prev) => !prev);

	const onApply = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
	};

	const onReset = () => setState({ ...defaultArticleState });

	return (
		<div>
			<ArrowButton onClick={onClick} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={onApply} onReset={onReset}>
					<div className={styles.content}>
						<span className={styles.title}>Задайте параметры</span>
						<Select
							title={'Шрифт'}
							selected={state.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={onChange('fontFamilyOption')}
						/>
						<RadioGroup
							title={'Размер шрифта'}
							name={'fontSize'}
							options={fontSizeOptions}
							selected={state.fontSizeOption}
							onChange={onChange('fontSizeOption')}
						/>
						<Select
							title={'Цвет шрифта'}
							selected={state.fontColor}
							options={fontColors}
							onChange={onChange('fontColor')}
						/>
						<Separator />
						<Select
							title={'Цвет фона'}
							selected={state.backgroundColor}
							options={backgroundColors}
							onChange={onChange('backgroundColor')}
						/>
						<Select
							title={'Ширина контента'}
							selected={state.contentWidth}
							options={contentWidthArr}
							onChange={onChange('contentWidth')}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
