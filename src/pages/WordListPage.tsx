import React from 'react';
import { useAtom, useSetAtom } // useSetAtom をインポート
from 'jotai';
import {  isWordFormModalOpenAtom, deleteWordAtom, wordsAtoms } from '../atoms/wordAtoms'; // atomをインポート
import WordCard from '../components/WordCard';
import WordFormModal from '../components/WordFormModal'; // モーダルコンポーネントをインポート
import { PlusCircle } from 'lucide-react';

const WordListPage: React.FC = () => {
  const [words] = useAtom(wordsAtoms);
  const setIsWordFormModalOpen = useSetAtom(isWordFormModalOpenAtom); // モーダルを開くため
  const deleteWord = useSetAtom(deleteWordAtom); // 単語削除用

  const handleAddNewWord = () => {
    setIsWordFormModalOpen(true); // モーダルを開く
  };

  const handleEditWord = (id: string) => {
    console.log('Edit word:', id);
    // TODO: 単語編集モーダルを開く処理 (編集用モーダルも同様にisEditModalOpenAtomなどを作る)
    alert(`編集機能は未実装です (ID: ${id})`);
  };

  const handleDeleteWord = (id: string) => {
    if (window.confirm('本当にこの単語を削除しますか？')) {
      deleteWord(id);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-700">単語帳</h1>
        <button
          onClick={handleAddNewWord} // ここでモーダルを開く関数を呼ぶ
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
        >
          <PlusCircle size={18} className="mr-2" />
          新しい単語を追加
        </button>
      </header>

      {/* TODO: 検索バーやフィルターをここに追加 */}

      {words.length === 0 ? (
        // (単語がない場合の表示は変更なし)
        <div className="text-center text-gray-500 py-10">
          {/* ... (内容は省略) ... */}
          <h3 className="mt-2 text-sm font-medium text-gray-900">単語がありません</h3>
          <p className="mt-1 text-sm text-gray-500">最初の単語を追加しましょう。</p>
          <div className="mt-6">
            <button
              onClick={handleAddNewWord}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle size={18} className="-ml-1 mr-2" />
              新しい単語を追加
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {words.map((word:any) => (
            <WordCard
              key={word.id}
              word={word}
              onEdit={handleEditWord}
              onDelete={handleDeleteWord} // 削除関数を渡す
            />
          ))}
        </div>
      )}
      {/* モーダルコンポーネントをここに追加 */}
      <WordFormModal />
    </div>
  );
};

export default WordListPage;