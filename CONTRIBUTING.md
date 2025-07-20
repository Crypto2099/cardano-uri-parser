# Contributing to cardano-uri-parser

👋 Welcome! We appreciate your interest in improving `cardano-uri-parser`.
Please follow these guidelines to help us maintain a high-quality, secure, and useful package for the Cardano community.

---

## 🚀 Ways to contribute

* 💡 Suggest features — open a [feature request](https://github.com/crypto2099/cardano-uri-parser/issues/new?template=feature_request.yml)
* 🐛 Report bugs — open a [bug report](https://github.com/crypto2099/cardano-uri-parser/issues/new?template=bug_report.yml)
* 🔧 Submit pull requests — improvements, tests, docs, refactors

---

## 🛠 Project setup

```bash
npm install
npm run build
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Check code coverage:

```bash
npm run test:coverage
```

---

## 🔀 Development workflow

Please **fork this repository** and create a feature or bugfix branch. Do **not** work directly in `main`.

Example:

```bash
git checkout -b feature/new-authority-handler
```

When ready, open a pull request from your fork’s branch to the main repository.

---

## 🏛️ Modularity rules

✅ Each **URI authority handler** must:

* Live in its own file under `src/handlers/`
* Have dedicated test coverage in `/tests`
* Add or update type definitions in `types.ts` if needed

✅ Do **not** combine unrelated changes in one PR.

✅ Keep logic small, focused, and maintainable.

✅ Use clear, consistent naming, e.g.:

* `src/handlers/newAuthority.ts`
* `newAuthority.test.ts`

---

## 📦 Before opening a pull request

✅ **Bump the version:**

```bash
npm version patch  # or minor / major
```

✅ **Update the changelog or README if needed**

✅ **Ensure tests pass and coverage ≥90%**

✅ **Add tests for any new or changed code**

✅ **Follow the pull request template checklist**

---

## 💥 Commit & PR tips

* Use clear commit messages (e.g., `fix: handle Byron-era address check`)
* One logical change per PR
* Link to related Issues or CIPs if applicable

---

## 🧪 CI & publishing

⚠️ Merging to `main` automatically triggers:

* Build + test
* Version check
* Publish to npm

**Important:** Make sure `package.json` version is bumped
before merging, or the CI will fail.

---

## 📜 License

By contributing, you agree your work will be released under the [Apache 2.0 License](./LICENSE).

---

Thank you for helping grow the Cardano developer ecosystem! ❤️
