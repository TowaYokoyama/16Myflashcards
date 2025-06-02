import { atom } from "jotai";
import type { Word } from "../types/words";



const initialWords: Word[] = [
    { id: '1', term: 'Apple', definition: 'A fruit that is typically red, green, or yellow.' },
  { id: '2', term: 'Book', definition: 'A set of written or printed sheets of paper bound together.' },
  { id: '3', term: 'Cat', definition: 'A small domesticated carnivorous mammal with soft fur.' },
];

//単語リストを保持するAtom
export const wordsAtoms = atom<Word[]>(initialWords);

//CRUD操作
//単語登録モーダルが開いているかどうかを確認するAtom
export const isWordFormModalOpenAtom = atom<boolean>(false);

//新しい単語を追加するための書き込み専用atom
//set関数内でほかのatomの更新も可能
export const addWordAtom = atom(
    null, //読み取り専用の値はnull
    (get, set, newWord: Omit<Word, 'id' | 'laseLearnedAt' | 'isFavorite' >) => {
        //omit<word,'id'>は、word型からidプロパティを除外した型
        const currentWords = get(wordsAtoms);
        const newWordWithId: Word = {
            ...newWord,
            id: crypto.randomUUID(), //UUIDでユニークなIDを生成
            //lastlearnedAt: undefined, //必要に応じて初期値を設定
            //isFavorite: false //必要に応じて初期値を設定
        };
        set(wordsAtoms, [...currentWords, newWordWithId]);
        set(isWordFormModalOpenAtom, false) //単語追加後はモーダルを閉じる
        }
);

//単語を削除するための書き込み専用atom
export const deleteWordAtom = atom(
    null,
    (get,set,isToDelete) => {
        const currentWords = get(wordsAtoms);
        set(wordsAtoms, currentWords.filter(word=> word.id !== isToDelete));
    }
);

//単語を編集するための書き込み専用atom(これは次の「ステップで)
//export const editorWordAtom = atom(...)

//---ここまで追記

