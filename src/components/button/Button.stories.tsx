import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
	component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonStory: Story = {
	render: () => {
		return (
			<>
				<Button
					title='Сбросить'
					type='reset'
					onClick={() => alert('клик на кнопку сбросить')}
					variant={'primary'}
				/>
				<Button
					title='Применить'
					type='submit'
					onClick={() => alert('клик на кнопку применить')}
					variant={'secondary'}
				/>
			</>
		);
	},
};
