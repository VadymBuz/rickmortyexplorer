import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  documents: ["src/**/*.{ts,tsx}", "!src/lib/graphql/generated/**"],
  ignoreNoDocuments: true,
  generates: {
    "src/lib/graphql/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        documentMode: "string",
        enumsAsTypes: true,
        useTypeImports: true,
        skipTypename: true,
      },
    },
  },
};

export default config;
