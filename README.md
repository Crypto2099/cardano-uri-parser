# Cardano URI Parser

A modular, type-safe Cardano URI parser supporting:

✅ [CIP-13](https://cips.cardano.org/cips/cip13/) (payment URIs)
✅ [CIP-99](https://cips.cardano.org/cips/cip99/) (`claim` URIs)
✅ `stake` authority URIs
✅ `browse` authority URIs (deep-linking to dApps with full URL reconstruction)

---

## 📦 Installation

```
npm install cardano-uri-parser
```

---

## ✨ Features

* Modular handlers per authority (`payment`, `claim`, `stake`, `browse`)
* Type-safe TypeScript definitions
* Network + era inference (Byron, Shelley; mainnet, testnet)
* Clean `parse()` (throws on error) and `safeParse()` (returns `null`) APIs
* Apache 2.0 licensed

---

## 🔗 Relevant CIPs

* 🪙 **CIP-13**: Cardano Payment and Staking URIs
  [https://cips.cardano.org/cips/cip13/](https://cips.cardano.org/cips/cip13/)

* 💧 **CIP-99**: Claim Token URIs (faucet, voucher, airdrop)
  [https://cips.cardano.org/cips/cip99/](https://cips.cardano.org/cips/cip99/)

* 🌐 **Proposed**: Browse authority deep-links (upcoming CIP)
  [https://github.com/cardano-foundation/CIPs/pull/1058](https://github.com/cardano-foundation/CIPs/pull/1058)

---

## 💡 Use Cases

✅ Deep link mobile users directly into:

* dApp pages inside their Cardano wallet
* faucet claims for test tokens or airdrops
* staking delegation flows

✅ Generate QR codes for:

* events and conferences
* point-of-sale terminals
* airdrop or promotion campaigns

✅ Validate incoming URIs inside wallet apps

---

## 🚀 Quick Example

```typescript
import { parse, safeParse } from 'cardano-uri-parser';

try {
  const result = parse('web+cardano://browse/https/fi.sundae.app/exchange?param=val');
  console.log('Parsed:', result);
} catch (err) {
  console.error('Invalid URI:', err);
}

const safeResult = safeParse('web+cardano://claim/v1?faucet_url=https%3A%2F%2Ffaucet.io&code=abc123');

if (safeResult) {
  console.log('Parsed safely:', safeResult);
} else {
  console.log('Invalid or unsupported URI');
}
```

---

## ⚙️ Development

```bash
npm install
npm run build
npm run test
npm run test:watch
npm run test:coverage
```

---

## 📜 License

Apache 2.0
© 2024 Adam Dean ([crypto2099](https://github.com/crypto2099))

---

## 🌎 Links

* 📦 npm: [https://www.npmjs.com/package/cardano-uri-parser](https://www.npmjs.com/package/cardano-uri-parser)
* 🛠 GitHub: [https://github.com/crypto2099/cardano-uri-parser](https://github.com/crypto2099/cardano-uri-parser)
