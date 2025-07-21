# Changelog

All notable changes to this project will be documented in this file.

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

* *(Describe new features, enhancements, or modules)*

### Changed

* *(Describe changes to existing functionality)*

### Fixed

* *(Describe bug fixes or stability improvements)*

---

## [1.1.0] - 2025-07-21

### Added

* New modular handlers for:
  * Supporting CIP-107 `transaction` and `block` authorities
  * Supporting CIP-134 `addr` authority
  * Supporting CIP PR843 `pay` authority

## Changed

* Changed `default` handler to use newer address validation

### Fixed

* Cleaned up some existing tests to provide more edge and corner-case support
* Addressed all outstanding code coverage issues and raised code coverage to 99%

## [1.0.4] - 2025-07-20

### Added

* Initial public release of `cardano-uri-parser`.
* Modular handlers for:

    * CIP-13 (payment + stake URIs)
    * CIP-99 (claim URIs)
    * browse authority URIs with full URL reconstruction.
* Byron and Shelley address detection with mainnet/testnet inference.
* High-coverage test suite (\~98%).
* GitHub Actions CI with auto-publish and version check.
* CONTRIBUTING guide, issue templates, and feature request template.
