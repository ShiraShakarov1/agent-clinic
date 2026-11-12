/**
 * Integration test script for Agent Clinic API
 * Run with: npx tsx tests/api-test.ts
 */

import { app } from '../src/index.js';

async function test() {
  console.log('=== Agent Clinic API Integration Tests ===\n');

  // Test health
  console.log('1. Health Check');
  const healthRes = await app.request('/api/health');
  const health = await healthRes.json();
  console.log('   Status:', healthRes.status, health);
  console.log('   ' + (healthRes.status === 200 && health.status === 'ok' ? 'PASS' : 'FAIL'));
  console.log();

  // Test list agents
  console.log('2. List Agents');
  const agentsRes = await app.request('/api/agents');
  const agents = await agentsRes.json();
  console.log('   Status:', agentsRes.status, 'Count:', agents.count);
  console.log('   ' + (agentsRes.status === 200 && agents.count === 4 ? 'PASS' : 'FAIL'));
  console.log();

  // Test create agent
  console.log('3. Create Agent');
  const createRes = await app.request('/api/agents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'TestAgent', type: 'tester', status: 'active' }),
  });
  const created = await createRes.json();
  console.log('   Status:', createRes.status, created);
  console.log('   ' + (createRes.status === 201 && created.data?.name === 'TestAgent' ? 'PASS' : 'FAIL'));
  console.log();

  // Test get single agent
  console.log('4. Get Agent by ID');
  const getId = created.data?.id;
  const getRes = await app.request(`/api/agents/${getId}`);
  const gotten = await getRes.json();
  console.log('   Status:', getRes.status, gotten);
  console.log('   ' + (getRes.status === 200 && gotten.data?.name === 'TestAgent' ? 'PASS' : 'FAIL'));
  console.log();

  // Test update agent
  console.log('5. Update Agent');
  const updateRes = await app.request(`/api/agents/${getId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'UpdatedName' }),
  });
  const updated = await updateRes.json();
  console.log('   Status:', updateRes.status, updated);
  console.log('   ' + (updateRes.status === 200 && updated.data?.name === 'UpdatedName' ? 'PASS' : 'FAIL'));
  console.log();

  // Test 404
  console.log('6. 404 Handler');
  const notFoundRes = await app.request('/api/nonexistent');
  console.log('   Status:', notFoundRes.status);
  console.log('   ' + (notFoundRes.status === 404 ? 'PASS' : 'FAIL'));
  console.log();

  // Test delete agent
  console.log('7. Delete Agent');
  const deleteRes = await app.request(`/api/agents/${getId}`, {
    method: 'DELETE',
  });
  console.log('   Status:', deleteRes.status);
  console.log('   ' + (deleteRes.status === 200 ? 'PASS' : 'FAIL'));
  console.log();

  // Test list ailments
  console.log('8. List Ailments');
  const ailmentsRes = await app.request('/api/ailments');
  const ailments = await ailmentsRes.json();
  console.log('   Status:', ailmentsRes.status, 'Count:', ailments.count);
  console.log('   ' + (ailmentsRes.status === 200 && ailments.count === 4 ? 'PASS' : 'FAIL'));
  console.log();

  // Test root page
  console.log('9. Root Page');
  const rootRes = await app.request('/');
  console.log('   Status:', rootRes.status);
  console.log('   ' + (rootRes.status === 200 ? 'PASS' : 'FAIL'));
  console.log();

  console.log('=== All tests completed ===');
}

test().catch(console.error);