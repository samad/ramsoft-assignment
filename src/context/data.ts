import dayjs from 'dayjs';

import { IState } from './types';

export const initialState: IState = (JSON.parse(
	localStorage.getItem('jira-clone-state') as any,
) as any) || {
	columns: [
		{
			id: 'd9ed284e-5d24-5507-9390-ddbf8203f39c',
			name: "📆 ToDo's",
			rows: [
				{
					id: 1,
					name: 'Conquer the World',
					description: 'Build a giant robot army and take over all major cities!',
					deadline: dayjs('2023-06-30').valueOf(),
					active: false,
				},
				{
					id: 2,
					name: 'Learn to Fly',
					description: 'Attend flying lessons and become a certified superhero pilot!',
					deadline: dayjs('2023-07-15').valueOf(),
					active: false,
				},
				{
					id: 3,
					name: 'Invent a Time Machine',
					description: 'Travel back in time and attend all your favorite historical events!',
					deadline: dayjs('2023-08-01').valueOf(),
					active: false,
				},
			].sort((a, b) => (a.name > b.name ? 1 : -1)),
		},
		{
			id: 'ae26bada-cd70-57b4-9ae4-16183ea3e0b7',
			name: '💥 Doing',
			rows: [
				{
					id: 1,
					name: 'Learn to Juggle Chainsaws',
					description: 'Master the art of juggling chainsaws without any accidents!',
					deadline: Date.now(),
					active: false,
				},
				{
					id: 2,
					name: 'Develop a Teleportation Device',
					description: 'Create a device that can teleport you instantly to any location!',
					deadline: Date.now(),
					active: false,
				},
				{
					id: 3,
					name: 'Become a Ninja',
					description: 'Train in martial arts and stealth to become the ultimate ninja!',
					deadline: Date.now(),
					active: false,
				},
			],
		},
		{
			id: '1bec3743-fba7-5cc4-8ee6-965ff7bf22c6',
			name: '✅ Done',
			rows: [
				{
					id: 1,
					name: 'Build a Chocolate Fountain',
					description: 'Create a fountain that dispenses an endless supply of chocolate!',
					deadline: dayjs('2023-05-15').valueOf(),
					active: false,
				},
				{
					id: 2,
					name: 'Organize a Pillow Fight Championship',
					description: 'Host a pillow fight competition and crown the ultimate pillow fighter!',
					deadline: dayjs('2023-05-18').valueOf(),
					active: false,
				},
				{
					id: 3,
					name: 'Start a Unicorn Sanctuary',
					description: 'Rescue and care for endangered unicorns in a magical sanctuary!',
					deadline: dayjs('2023-05-20').valueOf(),
					active: false,
				},
			],
		},
	],
};

export default initialState;
