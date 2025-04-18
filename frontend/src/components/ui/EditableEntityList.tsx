import { useState } from 'react';
import { EditableCard } from './EditableCard';
import { v4 as uuidv4 } from 'uuid';

import { FieldDescriptor } from './EditableCard';


interface EditableEntityListProps<T extends { id: string; isNew?: boolean }> {
    initialItems: T[];
    draftFields: (defaults?: Partial<T>) => T;
    fields: FieldDescriptor<T>[];
    renderView: (item: T) => React.ReactNode;
    onSave: (item: T) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    title?: string;
}

export function EditableEntityList<T extends { id: string; isNew?: boolean }>({
                                                                                  initialItems,
                                                                                  draftFields,
                                                                                  fields,
                                                                                  renderView,
                                                                                  onSave,
                                                                                  onDelete,
                                                                                  title,
                                                                              }: EditableEntityListProps<T>) {
    const [drafts, setDrafts] = useState<T[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const items = [...initialItems, ...drafts];

    const handleAdd = () => {
        const newDraft = draftFields({ id: uuidv4() });
        setDrafts((prev) => [newDraft, ...prev]);
        setEditingId(newDraft.id);
    };

    const handleChange = (updated: T) => {
        setDrafts((prev) => {
            const exists = prev.some((d) => d.id === updated.id);
            return exists ? prev.map((d) => (d.id === updated.id ? updated : d)) : [...prev, updated];
        });
    };

    const handleSave = async (item: T) => {
        await onSave(item);
        setDrafts((prev) => prev.filter((d) => d.id !== item.id));
        setEditingId(null);
    };

    const handleCancel = (id: string) => {
        setDrafts((prev) => prev.filter((d) => d.id !== id));
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Supprimer cet élément ?')) {
            await onDelete(id);
        }
    };

    return (
        <section className="relative">
            {title && (
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Ajouter
                    </button>
                </div>
            )}

            <ul className="space-y-3">
                {items.map((item) => (
                    <EditableCard<T>
                        key={item.id}
                        data={item}
                        isEditing={editingId === item.id || item.isNew}
                        onChange={handleChange}
                        onSave={() => handleSave(item)}
                        onCancel={() => item.isNew ? handleCancel(item.id) : setEditingId(null)}
                        onEdit={() => setEditingId(item.id)}
                        onDelete={() => handleDelete(item.id)}
                        fields={fields}
                        renderView={renderView}
                    />
                ))}
            </ul>
        </section>
    );
}
