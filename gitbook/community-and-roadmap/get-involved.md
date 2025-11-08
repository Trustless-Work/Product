# Contributor's Guide

{% hint style="info" %}
We recently moved from Only Dust to GrantFox: \
[https://www.grantfox.xyz/](https://www.grantfox.xyz/)
{% endhint %}

Welcome to the Trustless Work open-source community! 🚀 We appreciate your interest in contributing and helping us build **Escrow Infrastructure for the New Economy**. This guide will walk you through the process of contributing effectively.

Once assigned a task, please follow these guidelines:&#x20;

***

### 🔹 1. Getting Started

#### **Fork & Clone the Repository**

1. **Fork** the repository on GitHub.
2.  **Clone** your forked repository to your local machine:

    ```sh
    git clone https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
    cd REPOSITORY_NAME
    ```
3.  **Set the upstream remote** to sync with the main repo:

    ```sh
    git remote add upstream https://github.com/TrustlessWork/REPOSITORY_NAME.git
    ```
4.  Ensure you're on the latest version of `develop`:

    ```sh
    git checkout develop
    git pull upstream develop
    ```

***

### 🔹 2. Branching Strategy

We follow a **structured branching model** to keep contributions organized.

#### **Main Branches**

* `main` → The **production-ready** branch (DO NOT push here directly).
* `develop` → The **active development** branch where features are merged.

#### **Feature & Fix Branches**

Create a branch based on the type of change:

* **Features:** `feat/feature-name`
  * Example: `feat/escrow-ui`
* **Bug Fixes:** `fix/bug-description`
  * Example: `fix/api-response-error`
* **Documentation:** `docs/update-name`
  * Example: `docs/getting-started-guide`
* **Refactoring:** `refactor/code-improvement`
  * Example: `refactor/clean-smart-contracts`

#### **Create a New Branch**

Always create a new branch before making changes:

```sh
   git checkout develop
   git pull upstream develop  # Sync with the latest code
   git checkout -b feat/new-feature
```

***

### 🔹 3. Making Contributions

#### **Coding Standards**

✅ Keep changes **small and atomic**.\
✅ Follow **commit message guidelines** (see below).\
✅ Ensure **tests pass** before submitting a PR.\
✅ Format code using our **linting and formatting rules**.

#### **Commit Message Guidelines**

Use a **clear and concise** commit message format:

```
type: short description (less than 72 characters)
```

Examples:

* `feat: add escrow approval system`
* `fix: resolve API timeout issue`
* `docs: update README with setup instructions`

Types:

* `feat`: New feature
* `fix`: Bug fix
* `docs`: Documentation update
* `refactor`: Code restructuring
* `style`: Code formatting (no logic changes)
* `test`: Adding or updating tests
* `build`: Changes to build process or dependencies
* `ci`: Changes to CI/CD setup
* `chore`: Miscellaneous updates

***

### 🔹 4. Pushing Changes & Creating a PR

#### **Push Your Changes**

```sh
   git add .
   git commit -m "feat: add escrow approval system"
   git push origin feat/new-feature
```

#### **Create a Pull Request (PR)**

1. Go to the **original repo** on GitHub.
2. Click **New Pull Request**.
3. Select `develop` as the **base branch** and your feature branch as the **compare branch**.
4. Provide a **clear description** of the changes.
5. Submit for review!

***

### 🔹 5. Code Review & Merging Process

✅ **Maintainers** will review the PR and provide feedback.\
✅ If requested, **make changes** and push updates to your PR.\
✅ Once approved, **the PR is merged into `develop`**.\
✅ After testing, `develop` is merged into `main` for production.

***

### 🔹 6. Additional Resources

📖 [**Trustless Work GitHub**](https://github.com/TrustlessWork) – Browse our repositories.\
💬 [**Join our Telegram**](https://t.me/+kmr8tGegxLU0NTA5) – Connect with other contributors.

Happy coding! 🎉
