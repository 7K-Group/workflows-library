# Changelog

## [1.4.0](https://github.com/7K-Hiroba/workflows-library/compare/v1.3.0...v1.4.0) (2026-05-18)


### Features

* add ci helm library ([#53](https://github.com/7K-Hiroba/workflows-library/issues/53)) ([0533039](https://github.com/7K-Hiroba/workflows-library/commit/0533039febdedde222af63b7b5a4f0971f68b7d8))


### Bug Fixes

* upate renovate to batch all updates in one p.r. ([f26888e](https://github.com/7K-Hiroba/workflows-library/commit/f26888e40b34d9ad36fee070f371f08d2c474d01))
* upate renovate to batch all updates in one p.r. ([df3e41b](https://github.com/7K-Hiroba/workflows-library/commit/df3e41be77e64dd5f0c5801d773587fb4854cb3f))

## [1.3.0](https://github.com/7K-Hiroba/workflows-library/compare/v1.2.2...v1.3.0) (2026-05-03)


### Features

* Add renovate.json ([#36](https://github.com/7K-Hiroba/workflows-library/issues/36)) ([899ceb4](https://github.com/7K-Hiroba/workflows-library/commit/899ceb4d954abcf5f6543f6bf4c3f8597e1931a2))

## [1.2.2](https://github.com/7K-Hiroba/workflows-library/compare/v1.2.1...v1.2.2) (2026-04-30)


### Bug Fixes

* prefix artifacthub projects with hiroba- ([#34](https://github.com/7K-Hiroba/workflows-library/issues/34)) ([1605f0e](https://github.com/7K-Hiroba/workflows-library/commit/1605f0eb9db71c8b17b9a8f25a4968cc3698e7dc))

## [1.2.1](https://github.com/7K-Hiroba/workflows-library/compare/v1.2.0...v1.2.1) (2026-04-30)


### Bug Fixes

* prefix project name sent to artifacthub with 7k- ([#32](https://github.com/7K-Hiroba/workflows-library/issues/32)) ([19b4d95](https://github.com/7K-Hiroba/workflows-library/commit/19b4d95aab06550f77df5b82aa5a4ae09584eba8))

## [1.2.0](https://github.com/7K-Hiroba/workflows-library/compare/v1.1.7...v1.2.0) (2026-04-29)


### Features

* create kubeconform for flux and argocd and run kubeconform on helm ci ([#30](https://github.com/7K-Hiroba/workflows-library/issues/30)) ([ddebb1f](https://github.com/7K-Hiroba/workflows-library/commit/ddebb1f4ba01f03fb8a3159acf9f8f5978079a83))


### Bug Fixes

* lint eof bootstrap-artifacthub.yaml ([3a97eda](https://github.com/7K-Hiroba/workflows-library/commit/3a97eda49dc07c05deb77b2cf157f833906c21e2))

## [1.1.7](https://github.com/7K-Hiroba/workflows-library/compare/v1.1.6...v1.1.7) (2026-04-26)


### Bug Fixes

* simplify artifacthub bootstrap ([#28](https://github.com/7K-Hiroba/workflows-library/issues/28)) ([bdd67cb](https://github.com/7K-Hiroba/workflows-library/commit/bdd67cb18c27f02236a46c830725c2f38203d86d))

## [1.1.6](https://github.com/7K-Hiroba/workflows-library/compare/v1.1.5...v1.1.6) (2026-04-26)


### Bug Fixes

* look up AH repos via search endpoint, skip POST on duplicates ([d07d8f8](https://github.com/7K-Hiroba/workflows-library/commit/d07d8f8f9d88abb3dc1ab74b8a737ef34d563551))

## [1.1.5](https://github.com/7K-Hiroba/workflows-library/compare/v1.1.4...v1.1.5) (2026-04-26)


### Bug Fixes

* avoid jq parse error on AH repo lookup race ([#24](https://github.com/7K-Hiroba/workflows-library/issues/24)) ([49c5445](https://github.com/7K-Hiroba/workflows-library/commit/49c544552b64cba100bc085a5307719d9147d8d0))

## [1.1.4](https://github.com/7K-Hiroba/workflows-library/compare/v1.1.3...v1.1.4) (2026-04-24)


### Bug Fixes

* remove ci and release centralized workflows ([#20](https://github.com/7K-Hiroba/workflows-library/issues/20)) ([bca8b73](https://github.com/7K-Hiroba/workflows-library/commit/bca8b7327f30f7b5df68c2d13f84137730ac974d))

## [1.1.3](https://github.com/7K-Hiroba/workflows-library/compare/v1.1.2...v1.1.3) (2026-04-23)


### Bug Fixes

* update helm release process ([#18](https://github.com/7K-Hiroba/workflows-library/issues/18)) ([8ddd1c3](https://github.com/7K-Hiroba/workflows-library/commit/8ddd1c3f8097440175ab9f29fbd3e6ee86254d92))

## [1.1.2](https://github.com/7K-Hiroba/workflows-library/compare/v1.1.1...v1.1.2) (2026-04-21)


### Bug Fixes

* set release workflows usage as direct workflow references instead of local ([#14](https://github.com/7K-Hiroba/workflows-library/issues/14)) ([2b5bb1a](https://github.com/7K-Hiroba/workflows-library/commit/2b5bb1ae142a4cc20fe2cbae8e33116d6560af7a))

## [1.1.1](https://github.com/7K-Hiroba/workflows-library/compare/v1.1.0...v1.1.1) (2026-04-21)


### Bug Fixes

* bump versions and remove changelog from doc lint ([de45d4d](https://github.com/7K-Hiroba/workflows-library/commit/de45d4dbb6fbe8498b5f8fb9d9986fb78513c672))

## [1.1.0](https://github.com/7K-Hiroba/workflows-library/compare/v1.0.2...v1.1.0) (2026-04-21)


### Features

* bump helm cli version to v4 ([2b2b099](https://github.com/7K-Hiroba/workflows-library/commit/2b2b09905c7f809ae020a23b5ab57bd7d98fac01))
* bump helm version to v4 ([b2c5315](https://github.com/7K-Hiroba/workflows-library/commit/b2c5315d40f540904c5babcf6af46330771bc68a))

## [1.0.2](https://github.com/7K-Hiroba/workflows-library/compare/v1.0.1...v1.0.2) (2026-04-17)


### Bug Fixes

* update ci helm version to latest ([b5ae248](https://github.com/7K-Hiroba/workflows-library/commit/b5ae248d4909340a9194a39c3388664d142e9d0d))
* update missing permission ([51aaa5f](https://github.com/7K-Hiroba/workflows-library/commit/51aaa5f4a59b564281df1d140418c5b1ec7f91fa))

## [1.0.1](https://github.com/7K-Hiroba/workflows-library/compare/v1.0.0...v1.0.1) (2026-04-16)


### Bug Fixes

* release image not appendable in with: ([c76fb73](https://github.com/7K-Hiroba/workflows-library/commit/c76fb73b348de27b783769506ee92fef756f6b73))

## 1.0.0 (2026-04-15)


### Features

* create pr title lint action ([3c50af1](https://github.com/7K-Hiroba/workflows-library/commit/3c50af1eddeadf04d230ce1c9ea63b74365f56bc))
