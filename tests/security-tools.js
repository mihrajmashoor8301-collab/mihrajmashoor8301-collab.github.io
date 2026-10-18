/**
 * Endlessus Security Tools Unit & Integration Test Suite
 * Validates encoders, decoders, subnet calculator, hash detection, common ports, and payload library.
 */

const assert = require('assert');
const path = require('path');

console.log('============================================================');
console.log('STARTING ENDLESSUS SECURITY TOOLS TEST SUITE');
console.log('============================================================\n');

const SecurityTools = require(path.join(__dirname, '..', 'security-tools.js'));
assert(SecurityTools, 'SecurityTools module must be exported');

// 1. Base64 UTF-8 Encoders & Decoders
console.log('--- 1. Base64 UTF-8 & URL-Safe Encoding ---');
{
  const testStr = 'Hello, Cybersecurity Academy! 🔐';
  const encoded = SecurityTools.encodeBase64(testStr, false);
  assert.strictEqual(typeof encoded, 'string');
  assert(encoded.length > 0);

  const decoded = SecurityTools.decodeBase64(encoded);
  assert.strictEqual(decoded, testStr, 'Decoded UTF-8 string with emoji must match original');

  // URL safe Base64 (replaces + with - and / with _, trims =)
  const urlSafeEncoded = SecurityTools.encodeBase64('test+data/with=equals', true);
  assert(!urlSafeEncoded.includes('+'), 'URL safe must not include +');
  assert(!urlSafeEncoded.includes('/'), 'URL safe must not include /');
  assert(!urlSafeEncoded.includes('='), 'URL safe must not include =');

  const urlSafeDecoded = SecurityTools.decodeBase64(urlSafeEncoded);
  assert.strictEqual(urlSafeDecoded, 'test+data/with=equals', 'URL safe decoded must match original');
  console.log('  ✓ Base64 UTF-8 and URL-safe encode/decode verified');
}

// 2. URL Encoding & Component Handling
console.log('--- 2. URL Encoding ---');
{
  const rawUrl = 'admin=true&redirect=https://endlessus.in/login?user=cadet#hash';
  const encoded = SecurityTools.encodeURL(rawUrl, true);
  assert(encoded.includes('%3A') || encoded.includes('%2F'), 'Components should be percent-encoded');

  const decoded = SecurityTools.decodeURL(encoded);
  assert.strictEqual(decoded, rawUrl, 'Decoded URL component must match original');
  console.log('  ✓ URL encode/decode verified');
}

// 3. HTML Entity Sanitization & Decoding
console.log('--- 3. HTML Entity Sanitization ---');
{
  const unsafePayload = '<script alert(1)>"test" & \'value\'</script>';
  const escaped = SecurityTools.encodeHTML(unsafePayload);
  assert(!escaped.includes('<script'), 'Raw <script tag must be encoded');
  assert(escaped.includes('&lt;script'), 'Must contain &lt;script');
  assert(escaped.includes('&quot;'), 'Must contain &quot;');
  assert(escaped.includes('&#39;'), 'Must contain &#39;');
  assert(escaped.includes('&amp;'), 'Must contain &amp;');

  const unescaped = SecurityTools.decodeHTML(escaped);
  assert.strictEqual(unescaped, unsafePayload, 'HTML decode must restore original characters');
  console.log('  ✓ HTML entity encode/decode verified');
}

// 4. Hexadecimal Encoding & Decoding
console.log('--- 4. Hexadecimal Encoding ---');
{
  const plaintext = 'admin:secret123';
  const hex = SecurityTools.encodeHex(plaintext, ' ');
  assert(hex.split(' ').every(byte => byte.length === 2 && /^[0-9a-fA-F]{2}$/.test(byte)), 'Every byte must be 2-hex chars');

  const decoded = SecurityTools.decodeHex(hex);
  assert.strictEqual(decoded, plaintext, 'Hex decode must match original');
  console.log('  ✓ Hexadecimal encode/decode verified');
}

// 5. Binary 8-Bit Encoding & Decoding
console.log('--- 5. Binary 8-Bit Encoding ---');
{
  const sample = 'FLAG';
  const binary = SecurityTools.textToBinary(sample, ' ');
  const byteTokens = binary.split(' ');
  assert.strictEqual(byteTokens.length, 4, '4 ASCII characters must produce 4 bytes');
  byteTokens.forEach(b => assert.strictEqual(b.length, 8, 'Each binary byte token must be exactly 8 bits'));

  const decoded = SecurityTools.binaryToText(binary);
  assert.strictEqual(decoded, sample, 'Binary decode must match original');
  console.log('  ✓ 8-Bit Binary encode/decode verified');
}

// 6. JSON Formatter & Validator
console.log('--- 6. JSON Formatter & Validator ---');
{
  const malformed = '{ "user": "admin", "role": "root", }';
  const invalidRes = SecurityTools.validateJSON(malformed);
  assert.strictEqual(invalidRes.valid, false, 'Trailing comma JSON must be marked invalid');
  assert(invalidRes.error, 'Must report error description');

  const validRaw = '{"users":[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}],"active":true}';
  const formatted = SecurityTools.formatJSON(validRaw, 2);
  assert(formatted.includes('  "users": ['), 'Must format with 2-space indentation');
  
  const validValidate = SecurityTools.validateJSON(validRaw, 2);
  assert.strictEqual(validValidate.valid, true, 'Valid JSON must be validated');
  console.log('  ✓ JSON validator and formatter verified');
}

// 7. Text Inspector Metrics
console.log('--- 7. Text Inspector Metrics ---');
{
  const multiline = 'First line\nSecond line with 123.\nThird line.';
  const inspect = SecurityTools.inspectText(multiline);
  assert.strictEqual(inspect.lines, 3, 'Must count 3 lines');
  assert.strictEqual(inspect.words, 8, 'Must count 8 words');
  assert(inspect.chars > 0);
  assert(typeof inspect.entropy === 'number', 'Must include entropy value');
  console.log('  ✓ Text inspector metrics verified');

  // Test Shannon Entropy
  const repetitive = 'AAAAAAAAAA';
  const entRep = SecurityTools.calculateEntropy(repetitive);
  assert.strictEqual(entRep.entropy, 0, 'Uniform single-character string must have 0 entropy');
  assert.strictEqual(entRep.rating, 'Zero');

  const englishText = 'The quick brown fox jumps over the lazy dog. Cybersecurity Academy 2026.';
  const entEng = SecurityTools.calculateEntropy(englishText);
  assert(entEng.entropy > 3.5 && entEng.entropy < 5.5, `Natural English text should have moderate entropy (3.5 - 5.5), got ${entEng.entropy}`);
  assert.strictEqual(entEng.rating, 'Medium');

  const highEntropy = '8f3b2a9e1c0d4f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a';
  const entHigh = SecurityTools.calculateEntropy(highEntropy);
  assert(entHigh.entropy > 3.0, 'Hex string should exhibit healthy entropy');
  console.log('  ✓ Shannon entropy estimation (zero, medium, high) verified');

  // Test Canonical Hex Dump Generation
  const sample = 'Hello, Endlessus!\nLine 2';
  const hexDump = SecurityTools.generateHexDump(sample);
  assert(typeof hexDump === 'string');
  assert(hexDump.includes('00000000'), 'Hex dump must contain 8-digit offset 00000000');
  assert(hexDump.includes('|Hello, Endlessus|') || hexDump.includes('|Hello, Endlessus.|'), 'Hex dump must display ASCII bar');
  assert(hexDump.includes('48 65 6c 6c 6f'), 'Hex dump must display byte values for Hello');
  console.log('  ✓ Canonical hex dump generation (offsets, hex blocks, ASCII) verified');
}

// 8. IPv4 & CIDR Subnet Calculator
console.log('--- 8. IPv4 Subnet Calculator ---');
{
  // Test Class C /24
  const res24 = SecurityTools.calculateSubnet('192.168.1.100', '24');
  assert.strictEqual(res24.netmask, '255.255.255.0');
  assert.strictEqual(res24.wildcard, '0.0.0.255');
  assert.strictEqual(res24.networkAddress, '192.168.1.0');
  assert.strictEqual(res24.broadcastAddress, '192.168.1.255');
  assert.strictEqual(res24.firstUsable, '192.168.1.1');
  assert.strictEqual(res24.lastUsable, '192.168.1.254');
  assert.strictEqual(res24.usableHosts, 254);
  assert.strictEqual(res24.isPrivate, true, '192.168.x.x must be RFC 1918 Private');
  assert(res24.rfc1918Scope.includes('Class C'), '192.168.x.x must include Class C');

  // Test Point-to-Point /30
  const res30 = SecurityTools.calculateSubnet('10.10.10.5', '30');
  assert.strictEqual(res30.netmask, '255.255.255.252');
  assert.strictEqual(res30.networkAddress, '10.10.10.4');
  assert.strictEqual(res30.broadcastAddress, '10.10.10.7');
  assert.strictEqual(res30.firstUsable, '10.10.10.5');
  assert.strictEqual(res30.lastUsable, '10.10.10.6');
  assert.strictEqual(res30.usableHosts, 2);
  assert(res30.rfc1918Scope.includes('Class A'), '10.x.x.x must include Class A');

  // Test Host /32
  const res32 = SecurityTools.calculateSubnet('8.8.8.8', '32');
  assert.strictEqual(res32.netmask, '255.255.255.255');
  assert.strictEqual(res32.usableHosts, 1);
  assert.strictEqual(res32.isPrivate, false, '8.8.8.8 is Public Google DNS');

  // Test Invalid inputs
  assert.throws(() => SecurityTools.calculateSubnet('999.1.1.1', '24'), /Invalid IPv4/);
  assert.throws(() => SecurityTools.calculateSubnet('192.168.1.1', '33'), /CIDR/);
  console.log('  ✓ Subnet calculations (/24, /30, /32, private/public) verified');
}

// 9. Hash Identification
console.log('--- 9. Hash Identification ---');
{
  const md5Result = SecurityTools.identifyHashCandidates('d41d8cd98f00b204e9800998ecf8427e');
  assert(Array.isArray(md5Result.candidates), 'Result must contain candidates array');
  assert(md5Result.candidates.some(c => c.name.includes('MD5')), '32-char hex must identify MD5');

  const sha256Result = SecurityTools.identifyHashCandidates('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  assert(sha256Result.candidates.some(c => c.name.includes('SHA-256')), '64-char hex must identify SHA-256');

  const bcryptResult = SecurityTools.identifyHashCandidates('$2a$12$R9h/cIPz0gi.URNNXRkh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW');
  assert(bcryptResult.candidates.some(c => c.name.includes('bcrypt')), 'Bcrypt hash format must identify bcrypt');
  console.log('  ✓ Hash identification heuristics verified');
}

// 10. Common Ports Reference & Payload Library
console.log('--- 10. Common Ports & Payloads ---');
{
  assert(Array.isArray(SecurityTools.COMMON_PORTS), 'COMMON_PORTS must be an array');
  assert(SecurityTools.COMMON_PORTS.length >= 25, 'Expected at least 25 common port definitions');

  const sshPort = SecurityTools.COMMON_PORTS.find(p => p.port === 22);
  assert(sshPort && sshPort.service === 'SSH' && (sshPort.proto === 'TCP' || sshPort.protocol === 'TCP'));

  const dnsPort = SecurityTools.COMMON_PORTS.find(p => p.port === 53);
  assert(dnsPort && dnsPort.service === 'DNS');

  assert(Array.isArray(SecurityTools.EDUCATIONAL_PAYLOADS), 'EDUCATIONAL_PAYLOADS must be an array');
  assert(SecurityTools.EDUCATIONAL_PAYLOADS.length >= 15, 'Expected at least 15 curated educational payloads');

  SecurityTools.EDUCATIONAL_PAYLOADS.forEach(p => {
    assert(p.id, 'Payload must have id');
    assert(p.name, 'Payload must have name');
    assert(p.category, 'Payload must have category');
    assert(p.payload, 'Payload must have payload string');
    assert(p.mitigation, 'Payload must have mitigation');
    assert(p.roomLink, 'Payload must link to roomLink');
  });
  console.log(`  ✓ Verified ${SecurityTools.COMMON_PORTS.length} ports and ${SecurityTools.EDUCATIONAL_PAYLOADS.length} security payloads`);
}

console.log('\n============================================================');
console.log('ALL SECURITY TOOLS UNIT & INTEGRATION TESTS PASSED!');
console.log('============================================================');
