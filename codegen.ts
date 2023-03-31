import { CodegenConfig } from '@graphql-codegen/cli';

const defaultConfig = {
  declarationKind: 'interface',
  skipTypename: false,
  avoidOptionals: true,
  scalars: {
    ID: 'number',
    UUID: 'number',
    Long: 'number',
    IsoDateTime: 'string',
    LocalDateTime: 'string',
    Date: 'string',
    Base64: 'string',
    Double: 'number',
    Unknown: 'unknown',
    BigDecimal: 'number',
  },
};
const defaultPlugins = ['typescript', 'typescript-operations', 'typescript-graphql-request'];
const defaultSchemaConfig = { commentDescriptions: true };

const config: CodegenConfig = {
  generates: {
    'src/app/graphql/sdk.ts': {
      schema: { 'src/app/graphql/schema.graphql': defaultSchemaConfig },
      documents: 'src/app/graphql/**/*.graphql',
      plugins: defaultPlugins,
      config: { ...defaultConfig },
    },
  },
};
export default config;
