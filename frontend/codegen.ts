import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: process.env.VITE_API_URL || 'http://localhost:3000/graphql',
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
