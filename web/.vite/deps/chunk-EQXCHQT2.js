import {
  MidnightBech32m,
  ShieldedCoinPublicKey,
  ShieldedEncryptionPublicKey
} from "./chunk-QSJJCSYI.js";
import {
  require_buffer
} from "./chunk-SY756SVR.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// ../node_modules/@midnight-ntwrk/midnight-js-utils/dist/index.mjs
var import_buffer = __toESM(require_buffer(), 1);
function assertDefined(value, message) {
  if (!value) {
    throw new Error(message ?? "Expected value to be defined");
  }
}
function assertUndefined(value, message) {
  if (value) {
    throw new Error(message ?? "Expected value to be null or undefined");
  }
}
var ttlOneHour = () => new Date(Date.now() + 60 * 60 * 1e3);
var HEX_STRING_REGEXP = /^(?<prefix>(0x)?)(?<byteChars>([0-9A-Fa-f]{2})*)(?<incompleteChars>.*)$/;
var parseHex = (source) => {
  const groups = HEX_STRING_REGEXP.exec(source)?.groups;
  return {
    hasPrefix: groups.prefix === "0x",
    byteChars: groups.byteChars,
    incompleteChars: groups.incompleteChars
  };
};
var toHex = (bytes) => import_buffer.Buffer.from(bytes).toString("hex");
var fromHex = (str) => import_buffer.Buffer.from(str, "hex");
var isHex = (source, byteLen) => {
  if (!source || byteLen !== void 0 && byteLen <= 0) {
    return false;
  }
  const parsedHex = parseHex(source);
  const validByteLen = byteLen ? parsedHex.byteChars.length / 2 === byteLen : parsedHex.byteChars.length > 0;
  return validByteLen && !parsedHex.incompleteChars;
};
function assertIsHex(source, byteLen) {
  if (!source) {
    throw new TypeError("Input string must have non-zero length.");
  }
  if (byteLen !== void 0 && byteLen <= 0) {
    throw new Error("Expected byte length must be greater than zero.");
  }
  const parsedHex = parseHex(source);
  if (parsedHex.incompleteChars) {
    if (parsedHex.incompleteChars.length % 2 > 0) {
      throw new TypeError(`The last byte of input string '${source}' is incomplete.`);
    }
    const invalidCharPos = parsedHex.byteChars.length + (parsedHex.hasPrefix ? 2 : 0);
    throw new TypeError(`Invalid hex-digit '${source[invalidCharPos]}' found in input string at index ${invalidCharPos}.`);
  }
  if (!parsedHex.byteChars) {
    throw new TypeError(`Input string '${source}' is not a valid hex-string.`);
  }
  if (byteLen) {
    const actualByteLen = parsedHex.byteChars.length / 2;
    if (byteLen !== actualByteLen) {
      throw new TypeError(`Expected an input string with byte length of ${byteLen}, got ${actualByteLen}.`);
    }
  }
}
var parseCoinPublicKeyToHex = (possibleBech32, zswapNetworkId) => {
  if (isHex(possibleBech32))
    return possibleBech32;
  const parsedBech32 = MidnightBech32m.parse(possibleBech32);
  const decoded = ShieldedCoinPublicKey.codec.decode(zswapNetworkId, parsedBech32);
  return import_buffer.Buffer.from(decoded.data).toString("hex");
};
var parseEncPublicKeyToHex = (possibleBech32, zswapNetworkId) => {
  if (isHex(possibleBech32))
    return possibleBech32;
  const parsedBech32 = MidnightBech32m.parse(possibleBech32);
  const decoded = ShieldedEncryptionPublicKey.codec.decode(zswapNetworkId, parsedBech32);
  return import_buffer.Buffer.from(decoded.data).toString("hex");
};
function assertIsContractAddress(contractAddress) {
  const CONTRACT_ADDRESS_BYTE_LENGTH = 32;
  assertIsHex(contractAddress, CONTRACT_ADDRESS_BYTE_LENGTH);
  const parsedHex = parseHex(contractAddress);
  if (parsedHex.hasPrefix) {
    throw new TypeError(`Unexpected '0x' prefix in contract address '${contractAddress}'`);
  }
}

export {
  assertDefined,
  assertUndefined,
  ttlOneHour,
  parseHex,
  toHex,
  fromHex,
  isHex,
  assertIsHex,
  parseCoinPublicKeyToHex,
  parseEncPublicKeyToHex,
  assertIsContractAddress
};
//# sourceMappingURL=chunk-EQXCHQT2.js.map
