# Security Policy

## 📅 Supported Versions

We release updates and security patches for the latest major version of
`cardano-uri-parser`.

| Version | Supported |
|---------|-----------|
| 1.x.x   | ✅ Yes     |

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability in `cardano-uri-parser`:

1️⃣ **DO NOT** open a public GitHub issue.

2️⃣ Instead, email:

**Adam Dean** — adam@crypto2099.io

Please include:

- A detailed description of the vulnerability
- Steps to reproduce (if applicable)
- Any relevant logs, stack traces, or code

---

## 🔒 Security Process

Upon receiving a report, we will:

- Investigate and verify the vulnerability
- Determine the scope and impact
- Provide a fix as soon as possible
- Credit you (if desired) when the fix is published

We are committed to working with the community to ensure the safety and
integrity of this project.

---

## 🛡️ Security Release Checklist

1️⃣ **Triage vulnerability**

- [ ] Review the report privately (via email, not public issues).
- [ ] Confirm if the reported issue is valid.
- [ ] Assess severity (low, medium, high, critical).
- [ ] Determine if the vulnerability affects only this repo or other
  dependencies.

2️⃣ **Prepare patch**

- [ ] Create a private fix branch.
- [ ] Write tests covering the vulnerability.
- [ ] Verify patch with high test coverage.

3️⃣ **Coordinate release**

- [ ] Notify key dependents (if any) under embargo (optional, for critical
  vulnerabilities).
- [ ] Prepare a release changelog with **security notice** (e.g.,
  “CVE-xxxx-xxxx” if applicable).
- [ ] Bump **patch version** (e.g., `1.0.3 → 1.0.4`).

4️⃣ **Publish fix**

- [ ] Merge to `main`.
- [ ] Let GitHub Actions handle build + publish.
- [ ] Publish a **GitHub security advisory** (optional, for CVEs).

5️⃣ **Post-release**

- [ ] Thank the reporter (credit them if they wish).
- [ ] Monitor for regressions or follow-up reports.

---

🙏 Thank you for helping keep the Cardano ecosystem and developer tools secure!
