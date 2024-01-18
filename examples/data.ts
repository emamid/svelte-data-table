export interface Race {
	id: number;
	name: string;
}

export interface Class {
	id: number;
	name: string;
}

export interface Character {
	id: number;
	name: string;
	raceID: number;
	classID: number;
	level: number;
	dead?: boolean;
	fingers: number,
}

export const races: Race[] = [
	{
		id: 1,
		name: 'Human',
	},
	{
		id: 2,
		name: 'Hobbit',
	}, {
		id: 3,
		name: 'Dwarf',
	}, {
		id: 4,
		name: 'Elf',
	}, {
		id: 1,
		name: 'Maiar',
	},
];

export const classes: Class[] = [
	{
		id: 1,
		name: 'Rogue',
	},
	{
		id: 2,
		name: 'Warrior',
	},
	{
		id: 3,
		name: 'Ranger',
	},
	{
		id: 4,
		name: 'Wizard',
	}
]

export let characters: Character[] = [
	{
		id: 1,
		name: 'Frodo',
		raceID: 2,
		classID: 1,
		level: 6,
		fingers: 9,
	},
	{
		id: 2,
		name: 'Sam',
		raceID: 2,
		classID: 1,
		level: 6,
		fingers: 10,
	},
	{
		id: 3,
		name: 'Merry',
		raceID: 2,
		classID: 1,
		level: 4,
		fingers: 10,
	},
	{
		id: 4,
		name: 'Pippin',
		raceID: 2,
		classID: 1,
		level: 3,
		fingers: 10,
	},
	{
		id: 5,
		name: 'Gimli',
		raceID: 3,
		classID: 2,
		level: 6,
		fingers: 10,
	},
	{
		id: 6,
		name: 'Legolas',
		raceID: 4,
		classID: 1,
		level: 6,
		fingers: 10,
	},
	{
		id: 7,
		name: 'Boromir',
		raceID: 1,
		classID: 6,
		level: 8,
		dead: true,
		fingers: 10,
	},
	{
		id: 8,
		name: 'Aragorn',
		raceID: 1,
		classID: 3,
		level: 10,
		fingers: 10,
	},
	{
		id: 9,
		name: 'Gandalf',
		raceID: 4,
		classID: 4,
		level: 50,
		fingers: 10,
	}
]
