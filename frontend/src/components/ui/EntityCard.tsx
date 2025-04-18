import { DisplayEntity } from '../../types/ui';
import { Pencil, Trash } from 'lucide-react';

interface EntityCardProps {
    entity: DisplayEntity;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const EntityCard = ({ entity, onEdit, onDelete }: EntityCardProps) => {
    return (
        <li className="relative bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow transition">
            {(onEdit || onDelete) && (
                <div className="absolute top-2 right-2 flex gap-2">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(entity.id)}
                            className="text-gray-500 hover:text-blue-600"
                            title="Modifier"
                        >
                            <Pencil size={16} />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(entity.id)}
                            className="text-gray-500 hover:text-red-600"
                            title="Supprimer"
                        >
                            <Trash size={16} />
                        </button>
                    )}
                </div>
            )}

            <h3 className="text-md font-bold text-gray-900">{entity.title}</h3>
            {entity.subtitle && <p className="text-sm text-gray-600">{entity.subtitle}</p>}
            {entity.details?.map((line, idx) => (
                <p key={idx} className="text-sm text-gray-500">{line}</p>
            ))}
            {entity.status && (
                <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {entity.status}
                </span>
            )}
        </li>
    );
};