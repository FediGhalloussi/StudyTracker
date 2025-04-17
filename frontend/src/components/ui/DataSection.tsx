import React, { ReactNode } from 'react';
import Spinner from './Spinner';
import ErrorDisplay from './ErrorDisplay';

interface DataSectionProps {
    title: string;
    loading: boolean;
    error?: { message: string } | null;
    children: ReactNode;
}

const DataSection: React.FC<DataSectionProps> = ({ title, loading, error, children }) => {
    if (loading) return (
        <div className="text-center">
            <Spinner />
            <p className="text-sm text-gray-500 mt-2">Chargement de {title}...</p>
        </div>
    );

    if (error) return <ErrorDisplay message={error.message} />;

    return <section>{children}</section>;
};

export default DataSection;
