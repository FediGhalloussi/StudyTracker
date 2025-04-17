import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {DocumentNode} from 'graphql';
import EntitySelectWithQuickAdd from "./SelectWithQuickAdd.tsx";

interface FieldDefinition {
    name: string;
    label: string;
    type: 'text' | 'date' | 'datetime-local' | 'number' | 'entity-select';
    required?: boolean;
    options?: { value: string; label: string }[];
    mutation?: DocumentNode;
    refetchQueries?: any[];
    addLabel?: string;
    mutationVariables?: Record<string, any>;
    onChange?: (val: any) => void;
}

interface AddEntityFormProps {
    mutation: DocumentNode;
    refetchQueries: any[];
    onClose?: () => void;
    submitLabel?: string;
    isPopover?: boolean;
    fields: FieldDefinition[];
}

const AddEntityForm: React.FC<AddEntityFormProps> = ({
                                                         mutation,
                                                         refetchQueries,
                                                         onClose,
                                                         submitLabel = 'Ajouter',
                                                         isPopover = false,
                                                         fields,
                                                     }) => {
    const defaultValues: Record<string, any> = {
        status: 'TODO',
        dueAt: new Date().toISOString().slice(0, 16),
        duration: 60,
        scheduledAt: new Date().toISOString().slice(0, 16),
        date: new Date().toISOString().slice(0, 16),
        color: '#3B82F6',
        icon: '📘',
        examPassed: false,
        name: 'Title',
        title: 'Title',
        type: 'ASSIGNMENT'
    };

    const [formState, setFormState] = useState<Record<string, any>>(defaultValues);
    const [createEntity, {loading, error}] = useMutation(mutation, {
        refetchQueries,
        onCompleted: () => {
            setFormState(defaultValues);
            if (onClose)
                onClose();
        },
    });

    const handleChange = (name: string, value: any) => {
        setFormState(prev => ({...prev, [name]: value}));
    };

    const isValid = (field: FieldDefinition) => {
        const value = formState[field.name];
        return field.required ? value !== undefined && value !== '' : true;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const transformedData = {...formState};

        fields.forEach((field) => {
            if ((field.type === 'date' || field.type === 'datetime-local') && formState[field.name]) {
                transformedData[field.name] = new Date(formState[field.name]).toISOString();
            }
        });

        createEntity({variables: transformedData});
    };

    const renderField = (field: FieldDefinition) => {
        if (field.type === 'entity-select') {   // If select with add button
            const newMutationVariables = {
                ...defaultValues,
                ...field.mutationVariables,
            };
            return (
                <div key={field.name} className="transition-all duration-300 ease-in-out">
                    <EntitySelectWithQuickAdd
                        label={field.label}
                        options={field.options || []}
                        value={formState[field.name] || ''}
                        onChange={(val) => {
                            handleChange(field.name, val);
                            field.onChange?.(val);
                        }}
                        mutation={field.mutation!}
                        refetchQueries={field.refetchQueries!}
                        addLabel={field.addLabel!}
                        mutationVariables={newMutationVariables}
                    />
                </div>
            );
        }

        return (
            <div key={field.name} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                    type={field.type}
                    className={`w-full border rounded-md shadow-sm px-3 py-2 focus:outline-none transition-all
            ${isValid(field)
                        ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        : 'border-red-400 focus:ring-red-500 focus:border-red-500'}`}
                    value={formState[field.name] || ''}
                    onChange={(e) => handleChange(field.name, field.type === 'number' ? +e.target.value : e.target.value)}
                    required={field.required}
                />
                {field.required && (
                    <span className="absolute top-9 right-3 text-sm">
            {isValid(field) ? '✅' : '❌'}
          </span>
                )}
            </div>
        );
    };

    const formContent = (
        <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(renderField)}
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onClose} className="text-gray-600 hover:underline">
                    Annuler
                </button>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
                >
                    {loading ? 'Ajout en cours...' : submitLabel}
                </button>
            </div>
        </form>
    );

    return isPopover ? (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-10">
            {formContent}
        </div>
    ) : formContent;
};

export default AddEntityForm;