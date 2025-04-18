import { ReactNode, useState } from 'react';
import { useMutation } from '@apollo/client';

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
    renderView: (data: T) => ReactNode;
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
                                                           renderView,
                                                           onEdit,
                                                           onDelete,
                                                       }: EditableCardProps<T>) {
    const handleChange = (key: keyof T, value: any) => {
        onChange({ ...data, [key]: value });
    };

    const isValid = (): boolean => {
        return fields
            .filter(f => f.visible?.(data) ?? true)
            .every(field => {
                if (!field.required) return true;
                const value = data[field.key];
                return value !== undefined && value !== null && String(value).trim() !== '';
            });
    };

    if (!isEditing) {
        return (
            <li className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow transition relative">
                <div>{renderView(data)}</div>
                {(onEdit || onDelete) && (
                    <div className="absolute top-2 right-2 flex gap-2">
                        {onEdit && (
                            <button onClick={onEdit} className="text-gray-500 hover:text-blue-600" title="Modifier">✏️</button>
                        )}
                        {onDelete && (
                            <button onClick={onDelete} className="text-gray-500 hover:text-red-600" title="Supprimer">🗑️</button>
                        )}
                    </div>
                )}
            </li>
        );
    }

    return (
        <li className="bg-white border border-gray-300 p-4 rounded-lg shadow relative">
            {fields.filter(f => f.visible?.(data) ?? true).map((field) => {
                const value = data[field.key];
                const hasError = field.required && (!value || String(value).trim() === '');

                const [newItemLabel, setNewItemLabel] = useState('');
                const [createEntity] = field.mutation
                    ? useMutation(field.mutation, { refetchQueries: field.refetchQueries })
                    : [() => {}];

                const handleCreateEntity = async () => {
                    if (!field.mutation || !field.variableName) return;
                    const res = await createEntity({ variables: { [field.variableName]: newItemLabel } });
                    const newId = Object.values(res.data)[0].id;
                    handleChange(field.key, newId);
                    setNewItemLabel('');
                };

                return (
                    <div key={String(field.key)} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}{field.required && <span className="text-red-500">*</span>}
                        </label>

                        {['text', 'time', 'datetime-local', 'number'].includes(field.type) && (
                            <input
                                type={field.type}
                                value={value as string || ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className={`w-full p-2 border rounded ${hasError ? 'border-red-500' : ''}`}
                            />
                        )}

                        {field.type === 'date' && (
                            <input
                                type="date"
                                value={String(value).split('T')[0]}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className={`w-full p-2 border rounded ${hasError ? 'border-red-500' : ''}`}
                            />
                        )}

                        {field.type === 'select' && field.options && (
                            <select
                                value={value as string || ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className={`w-full p-2 border rounded ${hasError ? 'border-red-500' : ''}`}
                            >
                                <option value="">-- Sélectionner --</option>
                                {field.options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        )}

                        {field.type === 'entity-select' && (
                            <>
                                <select
                                    value={value as string || ''}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    className={`w-full p-2 border rounded ${hasError ? 'border-red-500' : ''}`}
                                >
                                    <option value="">-- Sélectionner --</option>
                                    {field.options?.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {field.mutation && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <input
                                            type="text"
                                            placeholder={field.addLabel}
                                            value={newItemLabel}
                                            onChange={(e) => setNewItemLabel(e.target.value)}
                                            className="flex-1 p-2 border rounded"
                                        />
                                        <button
                                            onClick={handleCreateEntity}
                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
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

            <div className="flex justify-end gap-2 mt-4">
                <button onClick={onCancel} className="px-4 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300">
                    Annuler
                </button>
                <button
                    onClick={onSave}
                    disabled={!isValid()}
                    className={`px-4 py-1 text-sm rounded text-white ${
                        isValid() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                    Enregistrer
                </button>
            </div>
        </li>
    );
}
