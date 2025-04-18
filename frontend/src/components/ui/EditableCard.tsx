import { ReactNode, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
    CalendarDays,
    Clock,
    FileText,
    BookOpen,
    Pencil,
    Trash2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type FieldType =
    | 'text'
    | 'date'
    | 'time'
    | 'number'
    | 'select'
    | 'datetime-local'
    | 'entity-select';

export interface FieldDescriptor<T> {
    key: keyof T;
    label: string;
    type: FieldType;
    required?: boolean;
    options?: { value: string; label: string }[];
    mutation?: any;
    refetchQueries?: any[];
    addLabel?: string;
    variableName?: string;
    visible?: (data: T) => boolean;
}

interface EditableCardProps<T> {
    data: T;
    fields: FieldDescriptor<T>[];
    isEditing: boolean;
    onChange: (updated: T) => void;
    onSave: () => void;
    onCancel: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function EditableCard<T extends { id: string }>({
                                                           data,
                                                           fields,
                                                           isEditing,
                                                           onChange,
                                                           onSave,
                                                           onCancel,
                                                           onEdit,
                                                           onDelete,
                                                       }: EditableCardProps<T>) {
    const [newItemLabels, setNewItemLabels] = useState<Record<string, string>>({});
    const mutationHooks = fields.map((field) =>
        field.mutation
            ? useMutation(field.mutation, { refetchQueries: field.refetchQueries })
            : [() => {}, {}]
    );

    const handleChange = (key: keyof T, value: any) => {
        onChange({ ...data, [key]: value });
    };

    const isValid = () => {
        return fields
            .filter((f) => f.visible?.(data) ?? true)
            .every((field) => {
                if (!field.required) return true;
                const value = data[field.key];
                return value !== undefined && value !== null && String(value).trim() !== '';
            });
    };

    const getIcon = (type: FieldType | string) => {
        if (type === 'date') return <CalendarDays className="w-4 h-4" />;
        if (type === 'time') return <Clock className="w-4 h-4" />;
        if (type === 'text' || type === 'number') return <FileText className="w-4 h-4" />;
        if (type === 'entity-select' || type === 'select') return <BookOpen className="w-4 h-4" />;
        return null;
    };

    return (
        <li className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-6 rounded-2xl shadow-md transition-all relative group">
            <AnimatePresence>
                {(onEdit || onDelete) && !isEditing && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute top-4 right-4 flex gap-2"
                    >
                        {onEdit && (
                            <button
                                onClick={onEdit}
                                className="text-zinc-500 hover:text-blue-500 transition"
                                title="Modifier"
                            >
                                <Pencil className="w-5 h-5" />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={onDelete}
                                className="text-zinc-500 hover:text-red-500 transition"
                                title="Supprimer"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {isEditing ? (
                <div className="grid sm:grid-cols-2 gap-4">
                    {fields
                        .filter((f) => f.visible?.(data) ?? true)
                        .map((field, index) => {
                            const value = data[field.key];
                            const hasError =
                                field.required && (!value || String(value).trim() === '');
                            const [createEntity] = mutationHooks[index];
                            const newItemLabel = newItemLabels[field.key as string] || '';

                            const handleCreateEntity = async () => {
                                if (!field.mutation || !field.variableName) return;
                                const res = await createEntity({
                                    variables: { [field.variableName]: newItemLabel },
                                });
                                const newId = Object.values(res.data)[0].id;
                                handleChange(field.key, newId);
                                setNewItemLabels((prev) => ({
                                    ...prev,
                                    [field.key as string]: '',
                                }));
                            };

                            return (
                                <div key={String(field.key)} className="flex flex-col gap-1">
                                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </label>

                                    {['text', 'time', 'datetime-local', 'number'].includes(field.type) && (
                                        <input
                                            type={field.type}
                                            value={(value as string) || ''}
                                            onChange={(e) => handleChange(field.key, e.target.value)}
                                            className={`px-3 py-2 text-sm rounded-lg border shadow-sm transition focus:outline-none focus:ring-2 
                        ${
                                                hasError
                                                    ? 'border-red-500 focus:ring-red-400'
                                                    : 'border-zinc-300 focus:ring-blue-400'
                                            }
                        dark:bg-zinc-800 dark:border-zinc-600 dark:text-white`}
                                        />
                                    )}

                                    {field.type === 'date' && (
                                        <input
                                            type="date"
                                            value={String(value).split('T')[0]}
                                            onChange={(e) => handleChange(field.key, e.target.value)}
                                            className={`px-3 py-2 text-sm rounded-lg border shadow-sm transition focus:outline-none focus:ring-2 
                        ${
                                                hasError
                                                    ? 'border-red-500 focus:ring-red-400'
                                                    : 'border-zinc-300 focus:ring-blue-400'
                                            }
                        dark:bg-zinc-800 dark:border-zinc-600 dark:text-white`}
                                        />
                                    )}

                                    {field.type === 'select' && field.options && (
                                        <select
                                            value={(value as string) || ''}
                                            onChange={(e) => handleChange(field.key, e.target.value)}
                                            className={`px-3 py-2 text-sm rounded-lg border shadow-sm transition focus:outline-none focus:ring-2 
                        ${
                                                hasError
                                                    ? 'border-red-500 focus:ring-red-400'
                                                    : 'border-zinc-300 focus:ring-blue-400'
                                            }
                        dark:bg-zinc-800 dark:border-zinc-600 dark:text-white`}
                                        >
                                            <option value="">-- Sélectionner --</option>
                                            {field.options.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}

                                    {field.type === 'entity-select' && (
                                        <>
                                            <select
                                                value={(value as string) || ''}
                                                onChange={(e) => handleChange(field.key, e.target.value)}
                                                className={`px-3 py-2 text-sm rounded-lg border shadow-sm transition focus:outline-none focus:ring-2 
                          ${
                                                    hasError
                                                        ? 'border-red-500 focus:ring-red-400'
                                                        : 'border-zinc-300 focus:ring-blue-400'
                                                }
                          dark:bg-zinc-800 dark:border-zinc-600 dark:text-white`}
                                            >
                                                <option value="">-- Sélectionner --</option>
                                                {field.options?.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>

                                            {field.mutation && (
                                                <div className="flex items-center gap-2 mt-2">
                                                    <input
                                                        type="text"
                                                        placeholder={field.addLabel}
                                                        value={newItemLabel}
                                                        onChange={(e) =>
                                                            setNewItemLabels((prev) => ({
                                                                ...prev,
                                                                [field.key as string]: e.target.value,
                                                            }))
                                                        }
                                                        className="flex-1 px-3 py-2 text-sm border rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-green-400
                              dark:bg-zinc-800 dark:border-zinc-600 dark:text-white"
                                                    />
                                                    <button
                                                        onClick={handleCreateEntity}
                                                        className="px-3 py-2 text-sm font-medium bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {hasError && (
                                        <p className="text-xs text-red-500 mt-1">Ce champ est requis.</p>
                                    )}
                                </div>
                            );
                        })}

                    <div className="sm:col-span-2 flex justify-end gap-2 mt-6">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-800 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600 transition"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={onSave}
                            disabled={!isValid()}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                                isValid()
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                            }`}
                        >
                            Enregistrer
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                    {fields.filter(f => f.visible?.(data) ?? true).map((field) => {
                        const rawValue = data[field.key];
                        const display =
                            field.options?.find(opt => opt.value === rawValue)?.label ??
                            (String(rawValue) || '—');

                        return (
                            <div key={String(field.key)} className="flex items-center gap-3">
                                <div className="flex-shrink-0 text-zinc-500 dark:text-zinc-400">
                                    {getIcon(field.type)}
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-zinc-400 dark:text-zinc-500">{field.label}</div>
                                    <div className="text-sm font-medium text-zinc-800 dark:text-white">{display}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </li>
    );
}
