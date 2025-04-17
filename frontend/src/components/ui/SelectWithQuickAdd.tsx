import React from 'react';
import QuickAddEntity from './QuickAddEntity';
import {DocumentNode} from 'graphql';

interface Option {
    value: string;
    label: string;
}

interface EntitySelectWithQuickAddProps {
    label: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    mutation: DocumentNode;
    refetchQueries: any[];
    addLabel: string;
    mutationVariables?: Record<string, any>;
}


const EntitySelectWithQuickAdd: React.FC<EntitySelectWithQuickAddProps> = ({
                                                                               label,
                                                                               options,
                                                                               value,
                                                                               onChange,
                                                                               mutation,
                                                                               refetchQueries,
                                                                               addLabel,
                                                                               mutationVariables = {},
                                                                           }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="flex items-center">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">-- Choisir --</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                {mutation && (
                    <QuickAddEntity
                        mutation={mutation}
                        refetchQueries={refetchQueries}
                        label={addLabel}
                        mutationVariables={mutationVariables}
                        onCreated={onChange}
                    />
                )}

            </div>
        </div>
    );
};

export default EntitySelectWithQuickAdd;
