import kanjiJson from '$lib/assets/kanji.min.json';

export type KanjiData = Record<string, KanjiInfo>;
export type KanjiInfo = {
	strokes: number;
	grade: number;
	freq: number;
	jlpt_old: number;
	jlpt_new: number;
	meanings: string[];
	readings_on: string[];
	readings_kun: string[];
	wk_level: number;
	wk_meanings: string[];
	wk_readings_on: string[];
	wk_readings_kun: string[];
	wk_radicals: string[];
};

export const kanjiData: KanjiData = kanjiJson;
