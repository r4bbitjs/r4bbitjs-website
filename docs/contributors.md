---
id: contributors
description: The rules for contributing to r4bbit library
---

# How to Contribute?

R4bbit is an open-source project and we are always looking for contributors. It's written and maintained by R4bbit core team members.

## Open Development

All work on r4bbit happens directly on GitHub. Both core team members and external contributors send pull requests which go through the same review process.

## Semantic Versioning

r4bbit follows semantic versioning. We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance. Learn more about our commitment to stability and incremental migration in our versioning policy.

Every significant change is documented in the changelog file.

## Branch Organization

Submit all changes to the dev branch.

Code that lands in dev must be compatible with the latest stable release. It may contain additional features, but no breaking changes. We should be able to release a new minor version from the tip of main at any time.

## Bugs

### Where to Find Known Issues

We are using GitHub Issues for our public bugs. We keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new task, try to make sure your problem doesn’t already exist.

### Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case. A modified version of one of our simple [examples applications](https://github.com/r4bbitjs/r4bbitjs/tree/dev/examples) would help with reducing time spent to replicate the error.

## How to Get in Touch

There is an active community of r4bbit users on the [Discord](https://discord.gg/cZUhj8Mx) chat platform in case you need help with React.

## Proposing a Change

If you intend to change the public API, or make any non-trivial changes to the implementation, we recommend filing an issue. This lets us reach an agreement on your proposal before you put significant effort into it.

If you’re only fixing a bug, it’s fine to submit a pull request right away but we still recommend to file an issue detailing what you’re fixing. This is helpful in case we don’t accept that specific fix but want to keep track of the issue.

## Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

To help you get your feet wet and get you familiar with our contribution process, we have a list of good first issues that contain bugs that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take it over but you should still leave a comment.

## Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation.

Before submitting a pull request, please make sure the following is done:

1. Fork the [r4bbit repository](https://github.com/r4bbitjs/r4bbitjs) and create your branch from dev.
2. Run `pnpm install` in the repository root.
3. If you’ve fixed a bug or added code that should be tested, add tests!
4. Ensure the integration and unit tests passes, for that make sure a local RabbitMQ is running and execute `pnpm test`
5. Format your code with eslint `pnpm lint`.

## License

By contributing to r4bbit, you agree that your contributions will be licensed under its MIT license.

## How to contribute to this documentation

**Note:** We use `pnpm`

#### TL;DR: start developing a new feature

```sh
git clone git@github.com:r4bbitjs/r4bbitjs.github.io.git
git checkout -b my-new-feature
cp .env.example .env
pnpm i
pnpm start
```

#### Full guide:

1. Clone [the repository](https://github.com/r4bbitjs/r4bbitjs.github.io)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Create `.env` file by cloning `.env.example` - you can use the default values
4. Insatall dependencies: `pnpm i`
5. Run the development server: `pnpm start`
6. Commit your changes (`git commit -am 'Add some feature'`)
7. Create a new Pull Request and wait for the review of one of the maintainers
