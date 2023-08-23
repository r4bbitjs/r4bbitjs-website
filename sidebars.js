module.exports = {
  tutorialsSidebar: [
    {
      type: "doc",
      label: "Getting Started",
      id: "getting-started",
    },
    {
      type: "category",
      label: "Guides",
      items: [
        {
          type: "doc",
          id: "guides/server-client",
        },
        {
          type: "doc",
          id: "guides/rpc",
        },
        {
          type: "doc",
          id: "guides/multiple-rpc",
        },
      ],
    },
    {
      type: "category",
      label: "Advanced Guides",
      items: [
        {
          type: "doc",
          id: "advanced-guides/logger",
        },
        {
          type: "doc",
          id: "advanced-guides/request-tracer",
        },
      ],
    },
    {
      type: "category",
      label: "Api Reference",
      items: [
        {
          type: "doc",
          id: "api-reference/client",
        },
        {
          type: "doc",
          id: "api-reference/server",
        },
        {
          type: "doc",
          id: "api-reference/setupR4bbit",
        },
      ],
    },
  ],
};
