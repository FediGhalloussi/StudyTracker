import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'import.meta.env.VITE_API_URL',
    documents: 'src/graphql/**/*.{ts,graphql}',
    generates: {
        'src/generated/graphql.ts': {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
        },
    },
    config: {
        exposeDocument: true
    }
};

export default config;
