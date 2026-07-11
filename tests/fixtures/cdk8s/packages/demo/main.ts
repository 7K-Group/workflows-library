import { Construct } from 'constructs';
import { App, Chart, ApiObject } from 'cdk8s';

class DemoChart extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new ApiObject(this, 'configmap', {
      apiVersion: 'v1',
      kind: 'ConfigMap',
      metadata: { name: 'library-fixture' },
      data: { purpose: 'e2e-fixture' },
    });
  }
}

const app = new App();
new DemoChart(app, 'demo');
app.synth();
