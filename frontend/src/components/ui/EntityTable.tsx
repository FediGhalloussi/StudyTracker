import { ReactNode } from 'react';

interface EntityTableProps<T> {
    headers: string[];
    data: T[];
    rowRenderer: (item: T) => ReactNode;
}

const EntityTable = <T extends { id: string | number }>({
                                                                   headers,
                                                                   data,
                                                                   rowRenderer,
                                                               }: EntityTableProps<T>) => {
    return (
        <table className="w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
                {headers.map((header, idx) => (
                    <th key={idx} className="p-4 text-left text-sm font-medium text-gray-700">
                        {header}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                    {rowRenderer(item)}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default EntityTable;
