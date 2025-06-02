import { Edit, Trash2 } from "lucide-react";
import type { Word } from "../types/words";

interface WordCardProps {

    word:Word;
    onEdit:(id:string) => void;
    onDelete:(id:string) => void;
}

const WordCard: React.FC<WordCardProps> = ({word, onEdit,onDelete}) => {
    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-3 bg-white shadow-sm hovere:shadow-md transition-shadow duration-200">
            <div className="flex justify-between item-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
                {word.term}
            </h3>
            <div className="flex space-x-2">
                <button 
                onClick={()=> onEdit(word.id)}
                className="text-blue-500 hover:text-blue-700 transiton-colors duration-150"
                aria-label={`Edit ${word.term}`} //アクセシビリティ向上のため
                >
                    <Edit size={18} />
                </button>
                <button 
                onClick={()=> onDelete(word.id)}
                className="text-red-500 hovet:text-tred-700 transition-colors duration-150"
                aria-label={`Delete ${word.term}`}
                >
                    <Trash2 size={18} />
                </button>
            </div>
            </div>
            <p className="text-gray-600 text-sm">{word.definition}</p>
            {/*今後、タグや最終学習日なども表示できます */}
            {word.tags && word.tags.length > 0 && (
                <div className="mt-2">
                    {word.tags.map((tag)=> (
                        <span 
                        key={tag}
                        className="inline-block bg-gray-100 text-gray-700 text-sm font-medium mr-2 px-2 py-0.5 rouded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                    </div>
            )} 
        </div>
    );
};

export default WordCard;