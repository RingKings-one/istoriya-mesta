import fs from 'node:fs/promises';

const reportPath = process.argv[2] ?? '/tmp/npm-audit.json';
const raw = await fs.readFile(reportPath, 'utf8');
let report;
try { report = JSON.parse(raw); }
catch { console.log('npm audit did not return JSON.'); process.exit(0); }
const vulnerabilities = Object.entries(report.vulnerabilities ?? {});
const totals = report.metadata?.vulnerabilities ?? {};
console.log(`npm audit totals: ${JSON.stringify(totals)}`);
for (const [name, item] of vulnerabilities) {
  const fix = item.fixAvailable === true ? 'fix available' : item.fixAvailable === false ? 'no automatic fix' : item.fixAvailable?.name ? `fix: ${item.fixAvailable.name}@${item.fixAvailable.version}` : 'fix availability unknown';
  console.log(`- ${name}: ${item.severity}; direct=${item.isDirect}; range=${item.range}; ${fix}; nodes=${(item.nodes ?? []).join(', ')}`);
  for (const via of item.via ?? []) if (typeof via === 'object') console.log(`  advisory: ${via.title} | ${via.url} | affected: ${via.range}`);
}
