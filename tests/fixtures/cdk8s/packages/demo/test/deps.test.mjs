import { test } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';

test('demo package declares cdk8s and constructs deps', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.ok(pkg.dependencies.cdk8s, 'cdk8s dependency missing');
  assert.ok(pkg.dependencies.constructs, 'constructs dependency missing');
});
