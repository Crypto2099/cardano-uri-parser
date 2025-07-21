# Cardano URI Parser

A modular, type-safe Cardano URI parser supporting:

✅ [CIP-13] (`payment` + `stake` URIs)
✅ [CIP-99] (`claim` URIs)
✅ [CIP-107] (`transaction` + `block` URIs)
✅ [CIP-134] (`address` URIs)
✅ [CIP-PR1058] (`browse` URIs)

---

## 📊 Build & Status

[![CI & Publish](https://github.com/crypto2099/cardano-uri-parser/actions/workflows/ci-publish.yml/badge.svg)](https://github.com/crypto2099/cardano-uri-parser/actions/workflows/ci-publish.yml)
[![npm version](https://img.shields.io/npm/v/cardano-uri-parser.svg)](https://www.npmjs.com/package/cardano-uri-parser)
[![License](https://img.shields.io/github/license/crypto2099/cardano-uri-parser.svg)](./LICENSE)

--- 

## 🚀 Supported CIPs

The **`cardano-uri-parser`** library currently supports:

| CIP/Authority             | Description                                                                                    |
|---------------------------|------------------------------------------------------------------------------------------------|
| [CIP-13] (`payment`)      | Basic Cardano payment URIs (address + amount)                                                  |
| [CIP-13] (`stake`)        | Stake pool delegation URIs                                                                     |
| [CIP-99] (`claim`)        | Token claim URIs with faucet references                                                        |
| [CIP-107] (`block`)       | Block URIs by hash or height                                                                   |
| [CIP-107] (`transaction`) | Transaction URIs by hash, with optional output index or metadata references                    |
| [CIP-134] (`address`)     | Shelley, Byron (Daedalus, Icarus), mainnet/testnet address URIs with optional stake references |
| [CIP-PR1058] (`browse`)   | Deep-linking to external dApps (with full URL reconstruction)                                  |

---

## 📦 Installation

```
npm install cardano-uri-parser
```

---

## ✨ Features

* Modular handlers per authority (`payment`, `claim`, `stake`, `browse`,
  `block`, `transaction`, `address`)
* Type-safe TypeScript definitions
* **Network + era inference:** Byron (`DdzFF`, `Ae2`), Shelley (`addr1`,
  `stake1`), Testnet (`addr_test1`)
* Clean `parse()` (throws on error) and `safeParse()` (returns `null`) APIs
* Apache 2.0 licensed

---

## 🔗 Relevant CIPs

* 🪙 **CIP-13**: Cardano Payment and Staking URIs
  [https://cips.cardano.org/cips/cip13/](https://cips.cardano.org/cips/cip13/)
* 💧 **CIP-99**: Claim Token URIs (faucet, voucher, airdrop)
  [https://cips.cardano.org/cips/cip99/](https://cips.cardano.org/cips/cip99/)
* ⛓ **CIP-107**: Block and Transaction URIs
  [https://cips.cardano.org/cips/cip107/](https://cips.cardano.org/cips/cip107/)
* 🏷 **CIP-134**: Address URIs (including Byron, Shelley, testnet, and stake
  references)  
  [https://cips.cardano.org/cips/cip134/](https://cips.cardano.org/cips/cip134/)
* 🌐 **Proposed #1058**: Browse authority deep-links (upcoming CIP)
  [https://github.com/cardano-foundation/CIPs/pull/1058](https://github.com/cardano-foundation/CIPs/pull/1058)

---

## 💡 Use Cases

✅ Deep link mobile users directly into:

* dApp pages inside their Cardano wallet
* faucet claims for test tokens or airdrops
* staking delegation flows
* transaction explorers (block, tx, metadata lookup)
* address viewers (including Byron + Shelley, mainnet + testnet)

✅ Generate QR codes for:

* events and conferences
* point-of-sale terminals
* airdrop or promotion campaigns

✅ Validate incoming URIs inside wallet apps

---

## 🚀 Quick Example

```typescript
import {parse, safeParse} from "cardano-uri-parser";

// CIP Pull Request #1058 App Browse URI example
try {
    const result = parse("web+cardano://browse/https/fi.sundae.app/exchange?param=val");
    console.log("Parsed:", result);
} catch (err) {
    console.error("Invalid URI:", err);
}

// CIP-99 Claim URI Example using safeParse
const safeResult = safeParse("web+cardano://claim/v1?faucet_url=https%3A%2F%2Ffaucet.io&code=abc123");

if (safeResult) {
    console.log("Parsed safely:", safeResult);
} else {
    console.log("Invalid or unsupported URI");
}

// CIP-107 Transaction URI Example
try {
    const txResult = parse("web+cardano://transaction/7704a68404facf7126fa356f1b09f0e4c552aeef454cd0daba4208f3a64372e9#1");
    console.log("Parsed transaction:", txResult);
} catch (err) {
    console.error("Invalid URI:", err);
}

// CIP-107 Block URI Example with safeParse (results or returns null)
const safeBlockResult = safeParse('web+cardano://block?height=12345678');

if (safeBlockResult) {
    consol.log("Parsed safely:", safeResult);
} else {
    console.log("Invalid or unsupported URI");
}
```

---

## ⚙️ Development

```bash
npm install
npm run build
npm run test
```

---

## 📜 License

Apache 2.0 © 2025 Adam Dean ([crypto2099](https://github.com/crypto2099))

---

## 🌎 Links

* 📦
  npm: [https://www.npmjs.com/package/cardano-uri-parser](https://www.npmjs.com/package/cardano-uri-parser)
* 🛠
  GitHub: [https://github.com/crypto2099/cardano-uri-parser](https://github.com/crypto2099/cardano-uri-parser)

---

### 📜 References

* [CIP-13] — Cardano payment URIs
* [CIP-99] — Claim token URIs
* [CIP-107] — Block and transaction URIs
* [CIP-134] — Address URIs
* [CIP-PR843] — (Upcoming) Enhanced payments

[CIP-13]:https://cips.cardano.org/cips/cip13/

[CIP-99]:https://cips.cardano.org/cips/cip99/

[CIP-107]:https://cips.cardano.org/cips/cip107/

[CIP-134]:https://cips.cardano.org/cips/cip134/

[CIP-PR843]:https://github.com/cardano-foundation/CIPs/pull/843

[CIP-PR1058]:https://github.com/cardano-foundation/CIPs/pull/1058