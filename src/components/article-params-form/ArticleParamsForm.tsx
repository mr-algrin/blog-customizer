import { FormEvent, useState, useCallback, useRef } from 'react';
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
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useClose } from 'src/hooks/useClose';

type ArticleParamsFormProps = {
	initialParams: ArticleStateType;
	onUpdateParams: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [state, setState] = useState<ArticleStateType>(props.initialParams);

	useClose({
		isOpen: isOpen,
		onClose: () => setIsOpen(false),
		rootRef: asideRef,
	});

	const onChange =
		<Key extends keyof ArticleStateType>(key: Key) =>
		(value: ArticleStateType[Key]) => {
			setState((prev) => ({ ...prev, [key]: value }));
		};

	const onClick = () => setIsOpen((prev) => !prev);

	const onApply = useCallback(
		(evt: FormEvent<HTMLFormElement>) => {
			evt.preventDefault();
			props.onUpdateParams(state);
		},
		[state, props.onUpdateParams]
	);

	const onReset = useCallback(() => {
		setState({ ...props.initialParams });
		props.onUpdateParams(props.initialParams);
	}, [props.onUpdateParams, props.initialParams]);

	return (
		<div>
			<ArrowButton onClick={onClick} isOpen={isOpen} />
			<aside
				ref={asideRef}
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
						<Button title='Сбросить' type='reset' variant={'secondary'} />
						<Button title='Применить' type='submit' variant={'primary'} />
					</div>
				</form>
			</aside>
		</div>
	);
};
