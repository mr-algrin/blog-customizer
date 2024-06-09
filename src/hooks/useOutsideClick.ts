import { useEffect, RefObject } from 'react';

type TUseOutsideClick<T extends HTMLElement> = {
	elementRef: RefObject<T>;
	onClick: () => void;
};

export const useOutsideClick = <T extends HTMLElement>({
	elementRef,
	onClick,
}: TUseOutsideClick<T>) => {
	useEffect(() => {
		const detectClick = (evt: MouseEvent) => {
			if (
				evt.target instanceof Node &&
				elementRef.current &&
				!elementRef.current.contains(evt.target)
			) {
				onClick();
			}
		};

		document.addEventListener('mousedown', detectClick);

		return () => {
			document.removeEventListener('mousedown', detectClick);
		};
	}, [elementRef]);
};
