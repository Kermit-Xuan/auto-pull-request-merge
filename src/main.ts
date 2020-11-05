import * as core from '@actions/core'
import {Inputs, Merger} from './merger'
import {inspect} from 'util'

async function run(): Promise<void> {
  try {
    const [owner, repo] = core.getInput('repository').split('/')

    const inputs: Inputs = {
      comment: core.getInput('comment'),
      intervalSeconds: Number(core.getInput('intervalSeconds')) * 1000,
      labels:
        core.getInput('labels') === ''
          ? []
          : core.getInput('labels').split(','),
      owner,
      repo,
      pullRequestNumber: Number(core.getInput('pullRequestNumber')),
      sha: core.getInput('sha'),
      token: core.getInput('token'),
      timeoutSeconds: Number(core.getInput('timeoutSeconds'))
    }

    core.debug(`Inputs: ${inspect(inputs)}`)

    const merger = new Merger(inputs)
    await merger.merge()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
