const test = require('ava').test;

const { createReadStream, readFile } = require('fs');

const readFilePromise = fname => {
  return new Promise((resolve, reject) => {
    readFile(fname, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const tarChecksum = require('../index');
const fixtures = require('./fixtures/index');

test('With promise', async t => {
  let tgz = await readFilePromise(fixtures.MULTI_FILE_TAR);
  let checksum = await tarChecksum(tgz);
  t.is(checksum.length, 64);
  t.snapshot(checksum);
});

test('With promise streaming', async t => {
  let tgz = createReadStream(fixtures.MULTI_FILE_TAR);
  let checksum = await tarChecksum(tgz);
  t.is(checksum.length, 64);
  t.snapshot(checksum);
});

test('Long file names', async t => {
  let tgz = createReadStream(fixtures.LONG_NAME_TAR);
  let checksum = await tarChecksum(tgz);
  t.is(checksum.length, 64);
  t.snapshot(checksum);
});

test('Latin1 tar', async t => {
  let tgz = createReadStream(fixtures.LATIN1_TAR);
  let checksum = await tarChecksum(tgz);
  t.is(checksum.length, 64);
  t.snapshot(checksum);
});

test('Unicode tar', async t => {
  let tgz = createReadStream(fixtures.UNICODE_TAR);
  let checksum = await tarChecksum(tgz);
  t.is(checksum.length, 64);
  t.snapshot(checksum);
});

test('One file tar', async t => {
  let tgz = createReadStream(fixtures.LATIN1_TAR);
  let checksum = await tarChecksum(tgz);
  t.is(checksum.length, 64);
  t.snapshot(checksum);
});

test('Invalid tar throws err', async t => {
  let tgz = createReadStream(fixtures.INCOMPLETE_TAR);
  let err = await tarChecksum(tgz).catch(e => e);
  t.is(err.message, 'Unexpected end of data');
});
