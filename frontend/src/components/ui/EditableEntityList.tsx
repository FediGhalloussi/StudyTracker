import { useState } from 'react';
import { EditableCard } from './EditableCard';
import { v4 as uuidv4 } from 'uuid';
import { FieldDescriptor } from './EditableCard';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditableEntityListProps<T extends { id: string; isNew?: boolean; dueDate?: string; dueTime?: string }> {
    initialItems: T[];
    draftFields: (defaults?: Partial<T>) => T;
    fields: FieldDescriptor<T>[];
    renderView: (item: T) => React.ReactNode;
    onSave: (item: T) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    title?: string;
}

export function EditableEntityList<T extends { id: string; isNew?: boolean; dueDate?: string; dueTime?: string }>({
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

    const items: T[] = [
        ...initialItems.filter(item => !drafts.some(d => d.id === item.id)),
        ...drafts,
    ];

    // 🔁 Trie les items par date croissante
    const sortedItems = [...items].sort((a, b) => {
        const aDate = new Date(`${a.dueDate ?? ''}T${a.dueTime ?? '00:00'}`);
        const bDate = new Date(`${b.dueDate ?? ''}T${b.dueTime ?? '00:00'}`);
        return aDate.getTime() - bDate.getTime();
    });

    const handleAdd = () => {
        const newDraft = draftFields({ id: uuidv4() });
        setDrafts(prev => [newDraft, ...prev]);
        setEditingId(newDraft.id);
    };

    const handleChange = (updated: T) => {
        setDrafts(prev => {
            const withoutCurrent = prev.filter(d => d.id !== updated.id);
            return [...withoutCurrent, updated];
        });
    };

    const handleEdit = (id: string) => {
        const inDrafts = drafts.find(d => d.id === id);
        if (!inDrafts) {
            const original = initialItems.find(i => i.id === id);
            if (original) {
                setDrafts(prev => [...prev, { ...original, isNew: false }]);
            }
        }
        setEditingId(id);
    };

    const handleSave = async (item: T) => {
        await onSave(item);
        setDrafts(prev => prev.filter(d => d.id !== item.id));
        setEditingId(null);
    };

    const handleCancel = (id: string) => {
        setDrafts(prev => prev.filter(d => d.id !== id));
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
                    <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
                        {title}
                    </h2>
                    <button
                        onClick={handleAdd}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Ajouter
                    </button>
                </div>
            )}

            <ul className="space-y-3">
                <AnimatePresence>
                    {sortedItems.map((item) => (
                        <motion.li
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <EditableCard<T>
                                data={item}
                                isEditing={editingId === item.id || item.isNew}
                                onChange={handleChange}
                                onSave={() => handleSave(item)}
                                onCancel={() =>
                                    item.isNew ? handleCancel(item.id) : setEditingId(null)
                                }
                                onEdit={() => handleEdit(item.id)}
                                onDelete={() => handleDelete(item.id)}
                                fields={fields}
                                renderView={renderView}
                            />
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </section>
    );

}
