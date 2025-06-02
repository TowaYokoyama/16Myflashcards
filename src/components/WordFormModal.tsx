import { useAtom, useSetAtom } from "jotai"
import { addWordAtom, isWordFormModalOpenAtom } from "../atoms/wordAtoms";
import { useState, type FormEvent } from "react";
import { X } from "lucide-react";




const WordFormModal:React.FC = () => {
    const [isOpen, setIsOpen] = useAtom(isWordFormModalOpenAtom);
    const addNewWord = useSetAtom(addWordAtom); //書き込み専用atomなのでuseSetAtomを使用

    const [term,setTerm] = useState('');
    const [definition,setDefinition] = useState('');
    const [tags,setTags] = useState(''); //タグは、カンマ区切りの文字列として入力

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        if(!term.trim || !definition.trim()) {
            //簡単なバリデーション
            alert('単語の意味を入力してください');
            return;
        }
        addNewWord({
            term,
            definition,
            tags: tags.split(',').map(tag=> tag.trim()).filter(tag => tag !== ''), //カンマで分割し、空のタグを除去
        });
        //フォームをリセット
        setTerm('');
        setDefinition('');
        setTags('');
        //isOWordFormModalopenAtomは　addWordAtom内でfalseに設定される
};
       if(!isOpen){
        return null; //モーダルが閉じていれば何もレンダリングしない
       }



       return (
        //オーバーレイ
        <div className="fixed inset-0 bg-[#0a18207a] bg-opacity-50 flex justify-center items-center p-4 z-50 transition-opacity duration-300  ease-in-out">
            {/*モーダル本体 */}
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-100">
                <div className="flex justify-between items-center mb-4">
                    <button 
                    onClick={()=> setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="閉じる"
                    >
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="term" className="block text-sm fonmt-medium text-gray-700 mb-1">
                            単語(表面)
                        </label>
                        <input 
                        type="text"
                        id="term"
                        value="term"
                        onChange={(e)=> setTerm(e.target.value)}
                        className="w-full px-3 py-2 boprder-gray-300 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        />
                        
                    </div>
                     <div className="mb-6">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              タグ (カンマ区切り)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="例: fruit, food, english"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              登録する
            </button>
          </div>

                </form>
            </div>
        </div>
       )

};
export default WordFormModal;