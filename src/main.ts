import * as core from '@actions/core'
import * as http from '@actions/http-client'
import * as toolCache from '@actions/tool-cache'
import * as fs from 'fs'
import * as os from 'os'

const client = new http.HttpClient('setup-chalk-cli')
const TOOL_NAME = 'chalk'
const home = os.homedir()

async function run() {
  // Get user-specified version to install (defaults to "latest")
  const suppliedVersion = core.getInput('version')
  const os = process.platform
  const arch = process.arch
  const version = suppliedVersion == 'latest' ? await getLatestVersion(os, arch) : suppliedVersion
  const dir = `${home}/.config`

  const cachedPath = toolCache.find(TOOL_NAME, version)
  if (cachedPath && version != 'nightly') {
    core.addPath(cachedPath)
  } else {
    core.info(`Downloading version ${version}`)
    const path = await toolCache.downloadTool(`https://api.prod.chalk.ai/v1/install/${os}/${arch}/${version}`)
    fs.chmodSync(path, 0o755)
    const cachedPath = await toolCache.cacheFile(path, TOOL_NAME, TOOL_NAME, version, undefined)
    fs.chmodSync(cachedPath, 0o755)
    core.addPath(cachedPath)
  }
  
  if (!fs.existsSync(`${dir}`)) {
    fs.mkdirSync(`${dir}`)
  }

  fs.writeFileSync(
    `${dir}/.chalk.yml`,
    `tokens:
  default:
     name: Default Token
     clientId: ${core.getInput('client-id')}
     clientSecret: ${core.getInput('client-secret')}
     apiServer: ${core.getInput('api-host') || 'https://api.prod.chalk.ai'}
     activeEnvironment: ${core.getInput('environment')}
`,
    'utf-8',
  )

  core.info(`Writing config to: ${dir}/.chalk.yml`)
  core.info(`${TOOL_NAME} is installed`)
}

async function getLatestVersion(os: string, arch: string) {
  core.info(`Checking latest version...`)
  const versionResponse = await client.get(`https://api.prod.chalk.ai/v2/install/versions/${os}/${arch}`)
  const body = await versionResponse.readBody()
  return JSON.parse(body)['latest_version']
}

run().catch((error) => {
  if (error instanceof Error) {
    core.setFailed(error.message)
  } else {
    core.setFailed(`${error}`)
  }
})
