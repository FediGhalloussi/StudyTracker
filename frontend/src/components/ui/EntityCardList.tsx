import { DisplayEntity } from '../../types/ui';
import { EntityCard } from './EntityCard';

interface EntityCardListProps {
    items: DisplayEntity[];
    emptyMessage?: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export function EntityCardList({ items, emptyMessage = "Aucun élément à afficher.", onEdit, onDelete }: EntityCardListProps) {
    if (items.length === 0) {
        return <p className="text-gray-500 text-sm italic">{emptyMessage}</p>;
    }

    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <EntityCard key={item.id} entity={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </ul>
    );
}