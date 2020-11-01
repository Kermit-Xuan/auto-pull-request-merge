# Gotenks Merge(Auto Pull Request merge)
[![CI](https://github.com/KeisukeYamashita/gotenks/workflows/build-test/badge.svg)](https://github.com/KeisukeYamashita/gotenks/actions?query=workflow%3Abuild-test)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Gotenks%20Merge%20Pull%20Request-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=)](https://github.com/marketplace/actions/gotenks-merge)

<p align="center">
  <img src="https://media.giphy.com/media/TbYgHMnICI1A4/giphy.gif" style="width:70%;margin:20px 0px;">
<p align="center">

A GitHub Action that merges a pull request automatically by the latest commit check status.

Other GitHub Actions that do merge automatically are like merging based on some user input.
**This GitHub Actions is designed to merge automatically when a pull request comes in.**

This action extract the number from a pull request which has triggered this by default. You don't need to specify the pull request number by `${{ github.event.pull_request.number }}`.

## Usage

```yml
      - name: Create Comment
        uses: KeisukeYamashita/gotenks-merge@v1
```

### Trigger by `pull_request` event with custom check

This is just an example to show one way in which this action can be used.

```yml
on: pull_request
jobs:
  auto-merge:
    - name: Merge
      uses: KeisukeYamashita/gotenks-merge@v1
      with:
        intervalSeconds: 10
        timeoutSeconds: 30
```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `labels` | Label that the target pull request should have | - |
| `intervalSeconds` | Seconds between the check | `0.1` | 
| `repostiory` | The GitHub repository containing the pull request | Current repository | 
| `pullRequestNumber` | The number of the pull request. | `github.event.pull_request.number` |
| `sha` | SHA of the commit. | `github.event.pull_request.head.number` |
| `timeoutSeconds` | Seconds to timeout this action | `60`
| `token` | `GITHUB_TOKEN` or a `repo` scoped [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). | `GITHUB_TOKEN` |

### Action outputs

Nothing.

### Disclaimer
#### GitHub API rate limit consumption

When a Pull Request is created, this GitHub Actions polls the commit status of the Pull Request and if it's ready to merge, it will merge it. You can set the interval by `intervalSeconds`, but depending on the user's input, you may be subject to an inordinate number of API calls. Be careful when setting this up.

#### GitHub Actions charge and quota

GitHub Actions are charged by runtime, and quotas are set for some users on free plans and other plans.
This action checks for other statuses to pass, so it can take a lot of time to run.
By default, it is set to time out after 1 minute, but you can change by `timeoutSeconds` if you need to.

## License

[MIT](LICENSE)
