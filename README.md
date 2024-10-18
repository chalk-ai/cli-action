# `cli-action`
> Sets up the Chalk CLI for tests in GitHub

## About
This action sets up the Chalk CLI, `chalk` on GitHub's hosted Actions runners.

This action can be run on `ubuntu-latest`, `windows-latest`, and `macos-latest` 
GitHub Actions runners, and will install and expose a specified version of the 
`chalk` CLI on the runner environment.

## Deploying to a branch

Set up the `chalk` CLI and use it to deploy to a branch:

```yaml
steps:
- uses: chalk-ai/cli-action@v1
  with:
    client-id: token-dlkanvoinohnaon4oindoivn
    client-secret: ts-5901039nlbm3n537el367b9025dc305

- name: Deploy to branch
  run: chalk apply --branch ${{ github.head_ref || github.ref_name }}
```

A specific version of the `chalk` CLI can be installed:

```yaml
steps:
- uses: chalk-ai/cli-action@v1
  with:
    version: 1.1.0
    client-id: token-dlkanvoinohnaon4oindoivn
    client-secret: ts-5901039nlbm3n537el367b9025dc305

- name: Deploy to branch
  run: chalk apply --branch ${{ github.head_ref || github.ref_name }}
```

## Compatibility

`cli-action@v2` has no `chalk` version constraints.

`cli-action@v3` requires `chalk >= 1.24.18`, which permits `chalk login` to accept no environment flags.

## Inputs
The action supports the following inputs:

- `client-id`: The Chalk Client ID from the tokens page in your settings.
- `client-secret`: The Chalk Client Secret from the tokens page in your settings.
- `version` (optional): The version of `chalk` to install, defaulting to `latest`.
- `api-host` (optional): If you're using a self-hosted deployment, the API host where Chalk is hosted.
- `environment` (optional): The Chalk environment to use. Your token is typically scoped to a single environment, and you won't need to use this parameter.

## License
Apache 2.0
