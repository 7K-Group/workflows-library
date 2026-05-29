# Changelog

## [1.8.0](https://github.com/7K-Hiroba/workflows-library/compare/v1.7.7...v1.8.0) (2026-05-29)


### Features

* create dedicated workflow for helm-docs ci ([#73](https://github.com/7K-Hiroba/workflows-library/issues/73)) ([cf90569](https://github.com/7K-Hiroba/workflows-library/commit/cf905696bf051b1d08ede1520b0cade32472c84d))

## [1.7.7](https://github.com/7K-Hiroba/workflows-library/compare/v1.7.6...v1.7.7) (2026-05-29)


### Bug Fixes

* use rebase to prevent merge conflicts in helm-docs ([19d5ef7](https://github.com/7K-Hiroba/workflows-library/commit/19d5ef7c87e2346bc2de7ec509e38b8fce130208))

## [1.7.6](https://github.com/7K-Hiroba/workflows-library/compare/v1.7.5...v1.7.6) (2026-05-29)


### Bug Fixes

* target head ref in helm-docs action ([4596cb2](https://github.com/7K-Hiroba/workflows-library/commit/4596cb29696b3cf97d1b5873e0a21385f4f1ce3d))

## [1.7.5](https://github.com/7K-Hiroba/workflows-library/compare/v1.7.4...v1.7.5) (2026-05-29)


### Bug Fixes

* helm-docs not pushing on pull-request trigger ([2296b40](https://github.com/7K-Hiroba/workflows-library/commit/2296b40972f96fe45a44383b10591fcb204b22f2))

## [1.7.4](https://github.com/7K-Hiroba/workflows-library/compare/v1.7.3...v1.7.4) (2026-05-29)


### Bug Fixes

* hardcode workflows-lib reference ([32b905c](https://github.com/7K-Hiroba/workflows-library/commit/32b905c51195a7742d9bc6f7777f3f4a2e88adbc))

## [1.7.3](https://github.com/7K-Hiroba/workflows-library/compare/v1.7.2...v1.7.3) (2026-05-29)


### Bug Fixes

* fix composite action not callable ([9cce325](https://github.com/7K-Hiroba/workflows-library/commit/9cce325b546ba16f6fca6fe34f6d4cca55c8f69c))

## [1.7.2](https://github.com/7K-Hiroba/workflows-library/compare/v1.7.1...v1.7.2) (2026-05-29)


### Bug Fixes

* run checkout outside helm-docs composite action ([0bf205c](https://github.com/7K-Hiroba/workflows-library/commit/0bf205cd9c47f3f9653b65f8883ef27d4efc0462))

## [1.7.1](https://github.com/7K-Hiroba/workflows-library/compare/v1.7.0...v1.7.1) (2026-05-29)


### Bug Fixes

* add missing helm docs composite action ([dd4a905](https://github.com/7K-Hiroba/workflows-library/commit/dd4a9057ace81c4ddbba5d444e334570d062c2b1))

## [1.7.0](https://github.com/7K-Hiroba/workflows-library/compare/v1.6.2...v1.7.0) (2026-05-29)


### Features

* generalize helm-docs to compose action ([8a97a80](https://github.com/7K-Hiroba/workflows-library/commit/8a97a8010b8fc17d867475272e4df2a21c1eb7c1))

## [1.6.2](https://github.com/7K-Hiroba/workflows-library/compare/v1.6.1...v1.6.2) (2026-05-27)


### Bug Fixes

* remove ci blocker for helm-docs ([406f2e3](https://github.com/7K-Hiroba/workflows-library/commit/406f2e3d78c9b9cce581ce8860fa4b95652de8cf))

## [1.6.1](https://github.com/7K-Hiroba/workflows-library/compare/v1.6.0...v1.6.1) (2026-05-27)


### Bug Fixes

* move helm-docs gen to automatic and run before release for proper version pin ([f90f4f3](https://github.com/7K-Hiroba/workflows-library/commit/f90f4f3b25d06aeb56a21b9093e5d9e5a7ecbdd1))

## [1.6.0](https://github.com/7K-Hiroba/workflows-library/compare/v1.5.4...v1.6.0) (2026-05-27)


### Features

* add snapshot empty use case on helm test ([128630a](https://github.com/7K-Hiroba/workflows-library/commit/128630ab7946f83bcdc48227715c218e6b63aed9))

## [1.5.4](https://github.com/7K-Hiroba/workflows-library/compare/v1.5.3...v1.5.4) (2026-05-26)


### Bug Fixes

* add regex cosign for reusable workflow usage ([af22d6e](https://github.com/7K-Hiroba/workflows-library/commit/af22d6e644893a4a3ed57768ce45475a0830c688))

## [1.5.3](https://github.com/7K-Hiroba/workflows-library/compare/v1.5.2...v1.5.3) (2026-05-26)


### Bug Fixes

* use job_workflow_ref in certificate identity ([ce7d41b](https://github.com/7K-Hiroba/workflows-library/commit/ce7d41b1d69a4021c820f126cf4ac81f80ab31a9))

## [1.5.2](https://github.com/7K-Hiroba/workflows-library/compare/v1.5.1...v1.5.2) (2026-05-25)


### Bug Fixes

* add external certificate identity ([c30c8d1](https://github.com/7K-Hiroba/workflows-library/commit/c30c8d1700a0f0bd1db6d3eafcefc8e896a6a375))

## [1.5.1](https://github.com/7K-Hiroba/workflows-library/compare/v1.5.0...v1.5.1) (2026-05-24)


### Bug Fixes

* surface helm push errors instead of swallowing them ([#55](https://github.com/7K-Hiroba/workflows-library/issues/55)) ([147d4ad](https://github.com/7K-Hiroba/workflows-library/commit/147d4ad57faf58e4396db4d06df1962ac8c0ac71))

## [1.5.0](https://github.com/7K-Hiroba/workflows-library/compare/v1.4.0...v1.5.0) (2026-05-21)


### Features

* run helm-docs on ci helm to dynamically update readme ([eee6857](https://github.com/7K-Hiroba/workflows-library/commit/eee6857b7c7062f6734e7ee68754ff6df9232100))

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
