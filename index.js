'use strict';

const crypto = require('crypto');
const stream = require('stream');

const gunzip = require('gunzip-maybe');
const tar = require('tar-stream');

const DEFAULT_ALG = 'sha256';

const hash = (data, alg = DEFAULT_ALG) => {
  return crypto.createHash(alg).update(data).digest('hex');
};

const createHashStream = (alg = DEFAULT_ALG) => {
  const hStream = crypto.createHash(alg);
  hStream.setEncoding('hex');
  return hStream;
};

const generateChecksum = (tarball, callback) => {
  const files = [];
  const extract = tar.extract();

  extract.on('entry', (header, data, cb) => {
    data.on('end', () => {
      hStream.end();
      files.push({
        name: header.name,
        hash: hStream.read()
      });
      cb();
    });

    const hStream = createHashStream();
    data.pipe(hStream);
  });

  extract.on('finish', () => {
    const results = files
      .sort((fileA, fileB) => {
        return fileA.pathname > fileB.pathname ? 1 : -1;
      })
      .reduce((checksum, file) => {
        return hash(checksum + (hash(file.name) + hash(file.hash)));
      }, '');

    return callback(null, results);
  });

  extract.on('error', err => {
    return callback(err);
  });

  if (tarball instanceof stream.Readable) {
    tarball.pipe(gunzip()).pipe(extract);
  } else {
    const passthru = new stream.PassThrough();
    passthru.end(tarball);
    passthru.pipe(gunzip()).pipe(extract);
  }
};

/**
 *
 * @param {Buffer|ReadableStream} tarball
 * @param {Function} [callback]
 */
module.exports = (tarball, callback) => {
  if (typeof callback === 'function') {
    generateChecksum(tarball, callback);
  }
  return new Promise((resolve, reject) => {
    generateChecksum(tarball, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
