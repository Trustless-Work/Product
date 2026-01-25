---
icon: code
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# Contributor's Guide

{% hint style="info" %}
We moved issue tracking from OnlyDust to **GrantFox**:\
https://www.grantfox.xyz/
{% endhint %}

Contribute to Trustless Work repos with a clean PR flow.

Keep changes small. Keep commits clear. Target `develop`.

### Workflow

{% stepper %}
{% step %}
### Fork, clone, and sync

1. Fork the repo on GitHub.
2. Clone your fork:

```sh
git clone https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
cd REPOSITORY_NAME
```

3. Add the upstream remote:

```sh
git remote add upstream https://github.com/TrustlessWork/REPOSITORY_NAME.git
```

4. Sync `develop`:

```sh
git checkout develop
git pull upstream develop
```
{% endstep %}

{% step %}
### Create a branch

Use `main` for production. Use `develop` for ongoing work.

Create a new branch for every change:

```sh
git checkout develop
git pull upstream develop
git checkout -b feat/new-feature
```

#### Branch naming

* Features: `feat/feature-name`
* Fixes: `fix/bug-description`
* Docs: `docs/topic`
* Refactors: `refactor/area`

Examples:

* `feat/escrow-ui`
* `fix/api-timeout`
* `docs/getting-started`
* `refactor/contracts-cleanup`
{% endstep %}

{% step %}
### Make changes

Guidelines:

* Keep changes small and atomic.
* Make sure tests pass (when available).
* Follow existing lint/format rules in the repo.
{% endstep %}

{% step %}
### Commit and push

#### Commit messages

Format:

```
type: short description (<= 72 chars)
```

Examples:

* `feat: add escrow approval system`
* `fix: handle API timeout`
* `docs: update README with setup instructions`

Common types:

* `feat`: New feature
* `fix`: Bug fix
* `docs`: Documentation update
* `refactor`: Code restructuring
* `style`: Code formatting (no logic changes)
* `test`: Adding or updating tests
* `build`: Changes to build process or dependencies
* `ci`: Changes to CI/CD setup
* `chore`: Miscellaneous updates

Push:

```sh
git add .
git commit -m "feat: add escrow approval system"
git push origin feat/new-feature
```
{% endstep %}

{% step %}
### Open a PR

Open a Pull Request from your branch into `develop`.

Include:

* What changed and why.
* How you tested it.
* Screenshots for UI changes (if relevant).
{% endstep %}

{% step %}
### Review and merge

Maintainers will review your PR.

If you get feedback:

1. Push follow-up commits to the same branch.
2. Resolve conversations.
3. Wait for approval and merge.
{% endstep %}
{% endstepper %}

### Link

Use these to find work, browse repos, and ask questions.

{% columns %}
{% column %}
#### Tasks & bounties

[GrantFox](https://www.grantfox.xyz/)
{% endcolumn %}

{% column %}
#### Repos

[TrustlessWork on GitHub](https://github.com/TrustlessWork)
{% endcolumn %}

{% column %}
#### Community

[Telegram group](https://t.me/+kmr8tGegxLU0NTA5)
{% endcolumn %}
{% endcolumns %}

{% hint style="info" %}
If you’re blocked, drop a short message in Telegram with your PR link.
{% endhint %}
