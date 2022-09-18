# `cli-action`
> Sets up the Chalk CLI for tests in GitHub

## About
This action sets up the Chalk CLI, `chalk` on GitHub's hosted Actions runners.

This action can be run on `ubuntu-latest`, `windows-latest`, and `macos-latest` 
GitHub Actions runners, and will install and expose a specified version of the 
`chalk` CLI on the runner environment.

## Usage

Set up the `chalk` CLI:

```yaml
steps:
- uses: chalk-ai/cli-action@v1
  with:
    client-id: ...
    client-secret: ...
    environment: ...
```

A specific version of the `chalk` CLI can be installed:

```yaml
steps:
- uses: chalk-ai/cli-action@v1
  with:
    version: 1.1.0
    client-id: ...
    client-secret: ...
```

## Inputs
The action supports the following inputs:

- `client-id`: The Chalk Client ID from the tokens page in your settings.
- `client-secret`: The Chalk Client Secret from the tokens page in your settings.
- `environment` (optional): The Chalk environment to use.
- `version` (optional): The version of `chalk` to install, defaulting to `latest`
- `api-host` (optional): If you're using a self-hosted deployment, the API host where Chalk is hosted.

## License
Apache 2.0
