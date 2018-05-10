const path = require('path');

module.exports = {
  ONE_FILE_TAR: path.join(__dirname, 'one-file.tar'),
  MULTI_FILE_TAR: path.join(__dirname, 'multi-file.tar'),
  PAX_TAR: path.join(__dirname, 'pax.tar'),
  TYPES_TAR: path.join(__dirname, 'types.tar'),
  LONG_NAME_TAR: path.join(__dirname, 'long-name.tar'),
  UNICODE_BSD_TAR: path.join(__dirname, 'unicode-bsd.tar'),
  UNICODE_TAR: path.join(__dirname, 'unicode.tar'),
  NAME_IS_100_TAR: path.join(__dirname, 'name-is-100.tar'),
  INVALID_TGZ: path.join(__dirname, 'invalid.tgz'),
  SPACE_TAR_GZ: path.join(__dirname, 'space.tar'),
  GNU_LONG_PATH: path.join(__dirname, 'gnu-long-path.tar'),
  BASE_256_UID_GID: path.join(__dirname, 'base-256-uid-gid.tar'),
  LARGE_UID_GID: path.join(__dirname, 'large-uid-gid.tar'),
  BASE_256_SIZE: path.join(__dirname, 'base-256-size.tar'),
  HUGE: path.join(__dirname, 'huge.tar.gz'),
  LATIN1_TAR: path.join(__dirname, 'latin1.tar'),
  INCOMPLETE_TAR: path.join(__dirname, 'incomplete.tar')
};
