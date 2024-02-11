export type Alignment = 'good' | 'evil';

export interface Race {
	id: number;
	name: string;
}

export interface Class {
	id: number;
	name: string;
}

export interface Book {
	id: number;
	shortName: string;
	name: string;
}

export interface Character {
	id: number;
	name: string;
	alignment: Alignment,
	classID: number;
	dead?: boolean;
	fingers: number,
	level: number;
	raceID: number;
	seenIn: number[],
	notes?: string,
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
		id: 5,
		name: 'Maiar',
	}, {
		id: 6,
		name: 'Orc',
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

export const books: Book[] = [
	{
		id: 1,
		shortName: 'Silmarillion',
		name: 'The Silmarillion',
	},
	{
		id: 2,
		shortName: 'Hobbit',
		name: 'The Hobbit',
	},
	{
		id: 3,
		shortName: 'Fellowship',
		name: 'The Fellowship of the Ring',
	},
	{
		id: 4,
		shortName: 'Towers',
		name: 'The Two Towers',
	},
	{
		id: 5,
		shortName: 'Return',
		name: 'The Return of the King',
	},
]

export let characters: Character[] = [
	{
		id: 1,
		name: 'Frodo',
		raceID: 2,
		classID: 1,
		level: 6,
		fingers: 9,
		alignment: 'good',
		seenIn: [3,4,5],
	},
	{
		id: 2,
		name: 'Sam',
		raceID: 2,
		classID: 1,
		level: 6,
		fingers: 10,
		alignment: 'good',
		seenIn: [3,4,5],
	},
	{
		id: 3,
		name: 'Merry',
		raceID: 2,
		classID: 1,
		level: 4,
		fingers: 10,
		alignment: 'good',
		seenIn: [3,4,5],
	},
	{
		id: 4,
		name: 'Pippin',
		raceID: 2,
		classID: 1,
		level: 3,
		fingers: 10,
		alignment: 'good',
		seenIn: [3,4,5],
	},
	{
		id: 5,
		name: 'Gimli',
		raceID: 3,
		classID: 2,
		level: 6,
		fingers: 10,
		alignment: 'good',
		seenIn: [3,4,5],
	},
	{
		id: 6,
		name: 'Legolas',
		raceID: 4,
		classID: 1,
		level: 6,
		fingers: 10,
		alignment: 'good',
		seenIn: [3,4,5],
	},
	{
		id: 7,
		name: 'Boromir',
		raceID: 1,
		classID: 2,
		level: 8,
		dead: true,
		fingers: 10,
		alignment: 'good',
		seenIn: [3,4],
	},
	{
		id: 8,
		name: 'Aragorn',
		raceID: 1,
		classID: 3,
		level: 10,
		fingers: 10,
		alignment: 'good',
		seenIn: [3,4,5],
	},
	{
		id: 9,
		name: 'Gandalf the Grey',
		raceID: 5,
		classID: 4,
		level: 35,
		dead: true,
		fingers: 10,
		alignment: 'good',
		seenIn: [2,3],
	},
	{
		id: 10,
		name: 'Gandalf the White',
		raceID: 5,
		classID: 4,
		level: 55,
		fingers: 10,
		alignment: 'good',
		seenIn: [4,5],
	},
	{
		id: 11,
		name: 'Sauron',
		raceID: 5,
		classID: 4,
		level: 70,
		fingers: 9,
		dead: true,
		alignment: 'evil',
		seenIn: [1,3,4,5],
	},
	{
		id: 12,
		name: 'Gollum',
		raceID: 2,
		classID: 1,
		level: 6,
		fingers: 10,
		dead: true,
		alignment: 'evil',
		seenIn: [2,3,4,5],
	},
	{
		id: 13,
		name: 'Saruman',
		raceID: 5,
		classID: 4,
		level: 45,
		fingers: 10,
		dead: true,
		alignment: 'evil',
		seenIn: [3,4,5],
	},
	{
		id: 14,
		name: 'Theoden',
		raceID: 1,
		classID: 2,
		level: 8,
		dead: true,
		fingers: 10,
		alignment: 'good',
		seenIn: [4,5],
	},
	{
		id: 15,
		name: 'Faramir',
		raceID: 1,
		classID: 3,
		level: 8,
		fingers: 10,
		alignment: 'good',
		seenIn: [4,5],
	},
	{
		id: 16,
		name: 'Eowyn',
		raceID: 1,
		classID: 2,
		level: 7,
		fingers: 10,
		alignment: 'good',
		seenIn: [4,5],
	},
	{
		id: 17,
		name: 'Eomer',
		raceID: 1,
		classID: 2,
		level: 7,
		fingers: 10,
		alignment: 'good',
		seenIn: [4,5],
	},
	{
		id: 18,
		name: 'Denethor II',
		raceID: 1,
		classID: 2,
		level: 8,
		dead: true,
		fingers: 10,
		alignment: 'good',
		seenIn: [5],
	},
	{
		id: 19,
		name: 'Wormtongue',
		raceID: 1,
		classID: 1,
		level: 4,
		dead: true,
		fingers: 10,
		alignment: 'evil',
		seenIn: [4,5],
	},
	{
		id: 20,
		name: 'Beregond',
		raceID: 1,
		classID: 2,
		level: 3,
		fingers: 10,
		alignment: 'good',
		seenIn: [5],
	},
	{
		id: 21,
		name: 'Balin',
		raceID: 3,
		classID: 2,
		level: 6,
		dead: true,
		fingers: 10,
		alignment: 'good',
		seenIn: [2],
	},
	{
		id: 22,
		name: 'Haldir',
		raceID: 4,
		classID: 3,
		level: 5,
		fingers: 10,
		alignment: 'good',
		seenIn: [3],
	},
	{
		id: 23,
		name: 'Grishnak',
		raceID: 6,
		classID: 1,
		level: 4,
		dead: true,
		fingers: 10,
		alignment: 'evil',
		seenIn: [4],
	},
	{
		id: 24,
		name: 'Ugluk',
		raceID: 6,
		classID: 2,
		level: 6,
		dead: true,
		fingers: 10,
		alignment: 'evil',
		seenIn: [4],
	},
	{
		id: 25,
		name: 'Balrog',
		raceID: 5,
		classID: 2,
		level: 35,
		dead: true,
		fingers: 10,
		alignment: 'evil',
		seenIn: [3],
	},	
]
