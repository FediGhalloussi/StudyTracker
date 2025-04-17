import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DocumentNode } from 'graphql';

interface QuickAddEntityProps {
    mutation: DocumentNode;
    refetchQueries: any[];
    label: string;
    mutationVariables?: Record<string, any>;
    onCreated: (id: string) => void;
}

const QuickAddEntity: React.FC<QuickAddEntityProps> = ({
                                                           mutation,
                                                           refetchQueries,
                                                           label,
                                                           mutationVariables = {},
                                                           onCreated,
                                                       }) => {
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const [createEntity, { loading }] = useMutation(mutation, {
        refetchQueries,
        onCompleted: (data) => {
            const newId = data?.[Object.keys(data)[0]]?.id;
            if (newId) {
                onCreated(newId);
                setValue('');
                setIsOpen(false);
            }
        },
    });

    const handleSubmit = () => {
        if (!value.trim()) return;


        const variables = {
            ...mutationVariables,
            title: value.trim(),
            name: value.trim(),
        };

        createEntity({ variables });
    };

    return (
        <div className="relative inline-block ml-2">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
            >
                +
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-60 bg-white border rounded shadow p-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Ajouter {label}</p>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            placeholder={`Nom du ${label.toLowerCase()}`}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={!value.trim()}
                            className={`text-white text-sm px-3 py-1 rounded ${
                                value.trim() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
                            }`}
                        >
                            {loading ? '...' : 'Ajouter'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuickAddEntity;
