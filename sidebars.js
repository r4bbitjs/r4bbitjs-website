module.exports = {
  tutorialsSidebar: [
    {
      type: 'doc',
      label: 'Getting Started',
      id: 'getting-started'
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'doc',
          id: 'guides/server-client',
        },
        {
          type: 'doc',
          id: 'guides/rpc',
        },
      ],
    },
    {
      type: 'category',
      label: 'Api Reference',
      items: [
        {
          type: 'doc',
          id: 'api-reference/client',
        },
        {
          type: 'doc',
          id: 'api-reference/server',
        },
      ],
    },
  ] 
};