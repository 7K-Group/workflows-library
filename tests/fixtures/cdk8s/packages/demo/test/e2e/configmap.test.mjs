import { test } from 'node:test';
import assert from 'node:assert';
import { execFileSync } from 'node:child_process';

// Runs inside ci-e2e-kind: a kind cluster is already up and kubectl is on PATH.
test('synthesized ConfigMap applies to the kind cluster', () => {
  execFileSync('npx', ['ts-node', 'main.ts'], { stdio: 'inherit' });
  execFileSync('kubectl', ['apply', '-f', 'dist/demo.k8s.yaml'], { stdio: 'inherit' });
  const out = execFileSync(
    'kubectl',
    ['get', 'configmap', 'library-fixture', '-o', 'jsonpath={.data.purpose}'],
    { encoding: 'utf8' },
  );
  assert.equal(out, 'e2e-fixture');
});
