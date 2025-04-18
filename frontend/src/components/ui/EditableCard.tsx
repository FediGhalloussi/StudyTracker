import { ReactNode } from 'react';

interface FieldDescriptor<T> {
    key: keyof T;
    label: string;
    type: 'text' | 'date' | 'select';
    options?: { label: string; value: string }[]; // pour les select
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

    if (!isEditing) {
        return (
            <li className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow transition relative">
                <div>{renderView(data)}</div>
                {(onEdit || onDelete) && (
                    <div className="absolute top-2 right-2 flex gap-2">
                        {onEdit && (
                            <button onClick={onEdit} className="text-gray-500 hover:text-blue-600" title="Modifier">
                                ✏️
                            </button>
                        )}
                        {onDelete && (
                            <button onClick={onDelete} className="text-gray-500 hover:text-red-600" title="Supprimer">
                                🗑️
                            </button>
                        )}
                    </div>
                )}
            </li>
        );
    }

    return (
        <li className="bg-white border border-gray-300 p-4 rounded-lg shadow relative">
            {fields.map((field) => (
                <div key={String(field.key)} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    {field.type === 'text' && (
                        <input
                            type="text"
                            value={data[field.key] as string || ''}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    )}
                    {field.type === 'date' && (
                        <input
                            type="date"
                            value={String(data[field.key]).split('T')[0]}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    )}
                    {field.type === 'select' && field.options && (
                        <select
                            value={data[field.key] as string}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            {field.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            ))}

            <div className="flex justify-end gap-2 mt-4">
                <button onClick={onCancel} className="px-4 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300">
                    Annuler
                </button>
                <button onClick={onSave} className="px-4 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600">
                    Enregistrer
                </button>
            </div>
        </li>
    );
}
