module.exports = {
  jellyfin: {
    output: {
      mode: "single",
      workspace: "api",
      target: "api.ts",
      schemas: "model",
      client: "react-query",
      prettier: true,
      mock: false,
      override: {
        mutator: {
          path: "../../../api/apiInstance.ts",
          name: "apiInstance",
        },
      },
    },
    query: {
      useQuery: true,
      useInfinite: true,
      useInfiniteQueryParam: "limit",
    },
    input: {
      target: "./jellyfin-openapi.json",
    },
  },
};
