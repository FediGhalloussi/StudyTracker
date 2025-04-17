interface Props {
    message: string;
}

const ErrorDisplay: React.FC<Props> = ({ message }) => (
    <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md shadow text-sm font-medium my-4">
        ❌ Erreur : {message}
    </div>
);

export default ErrorDisplay;
