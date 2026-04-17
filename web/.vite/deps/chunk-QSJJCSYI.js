import {
  EncryptionSecretKey
} from "./chunk-NKZCCWSS.js";
import {
  __commonJS,
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// ../node_modules/@subsquid/scale-codec/lib/types.js
var require_types = __commonJS({
  "../node_modules/@subsquid/scale-codec/lib/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeKind = void 0;
    var TypeKind;
    (function(TypeKind2) {
      TypeKind2[TypeKind2["Primitive"] = 0] = "Primitive";
      TypeKind2[TypeKind2["Compact"] = 1] = "Compact";
      TypeKind2[TypeKind2["Sequence"] = 2] = "Sequence";
      TypeKind2[TypeKind2["BitSequence"] = 3] = "BitSequence";
      TypeKind2[TypeKind2["Array"] = 4] = "Array";
      TypeKind2[TypeKind2["Tuple"] = 5] = "Tuple";
      TypeKind2[TypeKind2["Composite"] = 6] = "Composite";
      TypeKind2[TypeKind2["Variant"] = 7] = "Variant";
      TypeKind2[TypeKind2["Option"] = 8] = "Option";
      TypeKind2[TypeKind2["DoNotConstruct"] = 9] = "DoNotConstruct";
      TypeKind2[TypeKind2["BooleanOption"] = 10] = "BooleanOption";
      TypeKind2[TypeKind2["Bytes"] = 11] = "Bytes";
      TypeKind2[TypeKind2["BytesArray"] = 12] = "BytesArray";
      TypeKind2[TypeKind2["HexBytes"] = 13] = "HexBytes";
      TypeKind2[TypeKind2["HexBytesArray"] = 14] = "HexBytesArray";
      TypeKind2[TypeKind2["Struct"] = 15] = "Struct";
    })(TypeKind || (exports.TypeKind = TypeKind = {}));
  }
});

// browser-external:assert
var require_assert = __commonJS({
  "browser-external:assert"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "assert" has been externalized for browser compatibility. Cannot access "assert.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// ../node_modules/@subsquid/util-internal-hex/lib/hex.js
var require_hex = __commonJS({
  "../node_modules/@subsquid/util-internal-hex/lib/hex.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeHex = exports.isHex = exports.toHex = void 0;
    var assert_1 = __importDefault(require_assert());
    function toHex(data) {
      if (Buffer.isBuffer(data)) {
        return "0x" + data.toString("hex");
      } else {
        return "0x" + Buffer.from(data.buffer, data.byteOffset, data.byteLength).toString("hex");
      }
    }
    exports.toHex = toHex;
    function isHex(value) {
      return typeof value == "string" && value.length % 2 == 0 && /^0x[a-f\d]*$/i.test(value);
    }
    exports.isHex = isHex;
    function decodeHex(value) {
      (0, assert_1.default)(isHex(value));
      return Buffer.from(value.slice(2), "hex");
    }
    exports.decodeHex = decodeHex;
  }
});

// ../node_modules/@subsquid/scale-codec/lib/util.js
var require_util = __commonJS({
  "../node_modules/@subsquid/scale-codec/lib/util.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isObject = exports.unsignedIntByteLength = exports.UTF8_ENCODER = exports.UTF8_DECODER = exports.toUnsignedBigInt = exports.toSignedBigInt = exports.checkUnsignedBigInt = exports.checkUnsignedInt = exports.checkSignedBigInt = exports.checkSignedInt = exports.throwUnexpectedCase = exports.assertNotNull = void 0;
    var assert_1 = __importDefault(require_assert());
    function assertNotNull(val, msg) {
      (0, assert_1.default)(val != null, msg);
      return val;
    }
    exports.assertNotNull = assertNotNull;
    function throwUnexpectedCase(val) {
      throw new Error(val ? `Unexpected case: ${val}` : `Unexpected case`);
    }
    exports.throwUnexpectedCase = throwUnexpectedCase;
    function checkInt(val, sign, bitSize, min, max) {
      let ok = Number.isInteger(val) && min <= val && max >= val;
      if (!ok)
        throw new Error(`Invalid ${sign}${bitSize}: ${val}`);
    }
    function checkBigInt(val, sign, bitSize, min, max) {
      let ok = typeof val == "bigint" && min <= val && max >= val;
      if (!ok)
        throw new Error(`Invalid ${sign}${bitSize}: ${val}`);
    }
    function checkSignedInt(val, bitSize) {
      let min;
      let max;
      switch (bitSize) {
        case 8:
          min = -128;
          max = 127;
          break;
        case 16:
          min = -32768;
          max = 32767;
          break;
        case 32:
          min = -2147483648;
          max = 2147483647;
          break;
        default:
          throwUnexpectedCase(bitSize);
      }
      checkInt(val, "I", bitSize, min, max);
    }
    exports.checkSignedInt = checkSignedInt;
    function checkSignedBigInt(val, bitSize) {
      let min;
      let max;
      switch (bitSize) {
        case 64:
          min = -(2n ** 63n);
          max = 2n ** 63n - 1n;
          break;
        case 128:
          min = -(2n ** 127n);
          max = 2n ** 127n - 1n;
          break;
        case 256:
          min = -(2n ** 255n);
          max = 2n ** 255n - 1n;
          break;
        default:
          throwUnexpectedCase(bitSize);
      }
      checkBigInt(val, "I", bitSize, min, max);
    }
    exports.checkSignedBigInt = checkSignedBigInt;
    function checkUnsignedInt(val, bitSize) {
      let max;
      switch (bitSize) {
        case 8:
          max = 255;
          break;
        case 16:
          max = 65535;
          break;
        case 32:
          max = 4294967295;
          break;
        default:
          throwUnexpectedCase(bitSize);
      }
      checkInt(val, "U", bitSize, 0, max);
    }
    exports.checkUnsignedInt = checkUnsignedInt;
    function checkUnsignedBigInt(val, bitSize) {
      let max;
      switch (bitSize) {
        case 64:
          max = 0xffffffffffffffffn;
          break;
        case 128:
          max = 2n ** 128n - 1n;
          break;
        case 256:
          max = 2n ** 256n - 1n;
          break;
        default:
          throwUnexpectedCase(bitSize);
      }
      checkBigInt(val, "U", bitSize, 0n, max);
    }
    exports.checkUnsignedBigInt = checkUnsignedBigInt;
    function toSignedBigInt(val, bitSize) {
      (0, assert_1.default)(typeof val == "string" || typeof val == "number");
      val = BigInt(val);
      checkSignedBigInt(val, bitSize);
      return val;
    }
    exports.toSignedBigInt = toSignedBigInt;
    function toUnsignedBigInt(val, bitSize) {
      (0, assert_1.default)(typeof val == "string" || typeof val == "number");
      val = BigInt(val);
      checkUnsignedBigInt(val, bitSize);
      return val;
    }
    exports.toUnsignedBigInt = toUnsignedBigInt;
    exports.UTF8_DECODER = new TextDecoder("utf-8", {
      fatal: true,
      ignoreBOM: false
    });
    exports.UTF8_ENCODER = new TextEncoder();
    function unsignedIntByteLength(val) {
      let len = 0;
      while (val > 0n) {
        val = val >> 8n;
        len += 1;
      }
      return len;
    }
    exports.unsignedIntByteLength = unsignedIntByteLength;
    function isObject(value) {
      return value != null && typeof value == "object";
    }
    exports.isObject = isObject;
  }
});

// ../node_modules/@subsquid/scale-codec/lib/src.js
var require_src = __commonJS({
  "../node_modules/@subsquid/scale-codec/lib/src.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Src = void 0;
    var util_internal_hex_1 = require_hex();
    var assert_1 = __importDefault(require_assert());
    var util_1 = require_util();
    var Src2 = class {
      constructor(buf) {
        this.idx = 0;
        if (typeof buf == "string") {
          this.buf = (0, util_internal_hex_1.decodeHex)(buf);
        } else {
          this.buf = buf;
        }
      }
      byte() {
        let b = this.buf[this.idx];
        if (b === void 0) {
          throw eof();
        }
        this.idx += 1;
        return b;
      }
      i8() {
        let b = this.byte();
        return b | (b & 2 ** 7) * 33554430;
      }
      u8() {
        return this.byte();
      }
      i16() {
        let val = this.u16();
        return val | (val & 2 ** 15) * 131070;
      }
      u16() {
        let first = this.byte();
        let last = this.byte();
        return first + last * 2 ** 8;
      }
      i32() {
        return this.byte() + this.byte() * 2 ** 8 + this.byte() * 2 ** 16 + (this.byte() << 24);
      }
      u32() {
        return this.byte() + this.byte() * 2 ** 8 + this.byte() * 2 ** 16 + this.byte() * 2 ** 24;
      }
      i64() {
        let lo = this.u32();
        let hi = this.i32();
        return BigInt(lo) + (BigInt(hi) << 32n);
      }
      u64() {
        let lo = this.u32();
        let hi = this.u32();
        return BigInt(lo) + (BigInt(hi) << 32n);
      }
      i128() {
        let lo = this.u64();
        let hi = this.i64();
        return lo + (hi << 64n);
      }
      u128() {
        let lo = this.u64();
        let hi = this.u64();
        return lo + (hi << 64n);
      }
      i256() {
        let lo = this.u128();
        let hi = this.i128();
        return lo + (hi << 128n);
      }
      u256() {
        let lo = this.u128();
        let hi = this.u128();
        return lo + (hi << 128n);
      }
      compact() {
        let b = this.byte();
        let mode = b & 3;
        switch (mode) {
          case 0:
            return b >> 2;
          case 1:
            return (b >> 2) + this.byte() * 2 ** 6;
          case 2:
            return (b >> 2) + this.byte() * 2 ** 6 + this.byte() * 2 ** 14 + this.byte() * 2 ** 22;
          case 3:
            return this.bigCompact(b >> 2);
          default:
            throw new Error("Reached unreachable statement");
        }
      }
      bigCompact(len) {
        let i = this.u32();
        switch (len) {
          case 0:
            return i;
          case 1:
            return i + this.byte() * 2 ** 32;
          case 2:
            return i + this.byte() * 2 ** 32 + this.byte() * 2 ** 40;
        }
        let n = BigInt(i);
        let base = 32n;
        while (len--) {
          n += BigInt(this.byte()) << base;
          base += 8n;
        }
        return n;
      }
      compactLength() {
        let len = this.compact();
        (0, assert_1.default)(typeof len == "number");
        return len;
      }
      str() {
        let len = this.compactLength();
        let buf = this.bytes(len);
        return util_1.UTF8_DECODER.decode(buf);
      }
      bytes(len) {
        let beg = this.idx;
        let end = this.idx += len;
        if (this.buf.length < end) {
          throw eof();
        }
        return this.buf.subarray(beg, end);
      }
      skip(len) {
        this.idx += len;
      }
      bool() {
        return !!this.byte();
      }
      hasBytes() {
        return this.buf.length > this.idx;
      }
      assertEOF() {
        if (this.hasBytes()) {
          throw new Error("Unprocessed data left");
        }
      }
    };
    exports.Src = Src2;
    function eof() {
      return new Error("Unexpected EOF");
    }
  }
});

// ../node_modules/@subsquid/scale-codec/lib/sink.js
var require_sink = __commonJS({
  "../node_modules/@subsquid/scale-codec/lib/sink.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ByteSink = exports.HexSink = exports.Sink = void 0;
    var assert_1 = __importDefault(require_assert());
    var util_1 = require_util();
    var Sink = class {
      uncheckedU16(val) {
        this.write(val & 255);
        this.write(val >>> 8);
      }
      uncheckedU32(val) {
        this.write(val & 255);
        this.write(val >>> 8 & 255);
        this.write(val >>> 16 & 255);
        this.write(val >>> 24);
      }
      uncheckedU64(val) {
        this.uncheckedU32(Number(val & 0xffffffffn));
        this.uncheckedU32(Number(val >> 32n));
      }
      uncheckedU128(val) {
        this.uncheckedU64(val & 0xffffffffffffffffn);
        this.uncheckedU64(val >> 64n);
      }
      uncheckedU256(val) {
        this.uncheckedU128(val & 2n ** 128n - 1n);
        this.uncheckedU128(val >> 128n);
      }
      u8(val) {
        (0, util_1.checkUnsignedInt)(val, 8);
        this.write(val);
      }
      u16(val) {
        (0, util_1.checkUnsignedInt)(val, 16);
        this.uncheckedU16(val);
      }
      u32(val) {
        (0, util_1.checkUnsignedInt)(val, 32);
        this.uncheckedU32(val);
      }
      u64(val) {
        (0, util_1.checkUnsignedBigInt)(val, 64);
        this.uncheckedU64(val);
      }
      u128(val) {
        (0, util_1.checkUnsignedBigInt)(val, 128);
        this.uncheckedU128(val);
      }
      u256(val) {
        (0, util_1.checkUnsignedBigInt)(val, 256);
        this.uncheckedU256(val);
      }
      i8(val) {
        (0, util_1.checkSignedInt)(val, 8);
        this.write((val + 256) % 256);
      }
      i16(val) {
        (0, util_1.checkSignedInt)(val, 16);
        let base = 2 ** 16;
        val = (val + base) % base;
        this.uncheckedU16(val);
      }
      i32(val) {
        (0, util_1.checkSignedInt)(val, 32);
        let base = 2 ** 32;
        val = (val + base) % base;
        this.uncheckedU32(val);
      }
      i64(val) {
        (0, util_1.checkSignedBigInt)(val, 64);
        let base = 2n ** 64n;
        val = (val + base) % base;
        this.uncheckedU64(val);
      }
      i128(val) {
        (0, util_1.checkSignedBigInt)(val, 128);
        let base = 2n ** 128n;
        val = (val + base) % base;
        this.uncheckedU128(val);
      }
      i256(val) {
        (0, util_1.checkSignedBigInt)(val, 256);
        let base = 2n ** 256n;
        val = (val + base) % base;
        this.uncheckedU256(val);
      }
      str(val) {
        (0, assert_1.default)(typeof val == "string");
        let bytes = util_1.UTF8_ENCODER.encode(val);
        this.compact(bytes.length);
        this.bytes(bytes);
      }
      bool(val) {
        (0, assert_1.default)(typeof val == "boolean");
        this.write(Number(val));
      }
      compact(val) {
        (0, assert_1.default)((typeof val == "number" || typeof val == "bigint") && val >= 0, "invalid compact");
        if (val < 64) {
          this.write(Number(val) * 4);
        } else if (val < 2 ** 14) {
          val = Number(val);
          this.write((val & 63) * 4 + 1);
          this.write(val >>> 6);
        } else if (val < 2 ** 30) {
          val = Number(val);
          this.write((val & 63) * 4 + 2);
          this.write(val >>> 6 & 255);
          this.uncheckedU16(val >>> 14);
        } else if (val < 2n ** 536n) {
          val = BigInt(val);
          this.write((0, util_1.unsignedIntByteLength)(val) * 4 - 13);
          while (val > 0) {
            this.write(Number(val & 0xffn));
            val = val >> 8n;
          }
        } else {
          throw new Error(`${val.toString(16)} is too large for a compact`);
        }
      }
    };
    exports.Sink = Sink;
    var HexSink = class extends Sink {
      constructor() {
        super(...arguments);
        this.out = "0x";
      }
      write(byte) {
        this.out += (byte >>> 4).toString(16);
        this.out += (byte & 15).toString(16);
      }
      bytes(b) {
        if (Buffer.isBuffer(b)) {
          this.out += b.toString("hex");
        } else {
          this.out += Buffer.from(b.buffer, b.byteOffset, b.byteLength).toString("hex");
        }
      }
      toHex() {
        return this.out;
      }
    };
    exports.HexSink = HexSink;
    var ByteSink2 = class extends Sink {
      constructor() {
        super(...arguments);
        this.buf = Buffer.allocUnsafe(128);
        this.pos = 0;
      }
      alloc(size) {
        if (this.buf.length - this.pos < size) {
          let buf = Buffer.allocUnsafe(Math.max(size, this.buf.length) * 2);
          buf.set(this.buf);
          this.buf = buf;
        }
      }
      write(byte) {
        this.alloc(1);
        this.buf[this.pos] = byte;
        this.pos += 1;
      }
      bytes(b) {
        this.alloc(b.length);
        this.buf.set(b, this.pos);
        this.pos += b.length;
      }
      toBytes() {
        return this.buf.subarray(0, this.pos);
      }
    };
    exports.ByteSink = ByteSink2;
  }
});

// ../node_modules/@subsquid/scale-codec/lib/types-codec.js
var require_types_codec = __commonJS({
  "../node_modules/@subsquid/scale-codec/lib/types-codec.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toCodecTypes = exports.getCodecType = void 0;
    var assert_1 = __importDefault(require_assert());
    var types_1 = require_types();
    var util_1 = require_util();
    function getCodecType(types, ti) {
      let def = types[ti];
      switch (def.kind) {
        case types_1.TypeKind.Compact: {
          let compact = types[def.type];
          (0, assert_1.default)(compact.kind == types_1.TypeKind.Primitive);
          (0, assert_1.default)(compact.primitive[0] == "U");
          return { kind: types_1.TypeKind.Compact, integer: compact.primitive };
        }
        case types_1.TypeKind.Composite:
          if (def.fields.length == 0 || def.fields[0].name == null) {
            return {
              kind: types_1.TypeKind.Tuple,
              tuple: def.fields.map((f) => {
                (0, assert_1.default)(f.name == null);
                return f.type;
              })
            };
          } else {
            return {
              kind: types_1.TypeKind.Struct,
              fields: def.fields.map((f) => {
                let name = (0, util_1.assertNotNull)(f.name);
                return { name, type: f.type };
              })
            };
          }
        case types_1.TypeKind.Variant: {
          let variants = def.variants.filter((v) => v != null);
          let variantsByName = {};
          let uniqueIndexes = new Set(variants.map((v) => v.index));
          if (uniqueIndexes.size != variants.length) {
            throw new Error(`Variant type ${ti} has duplicate case indexes`);
          }
          let len = variants.reduce((len2, v) => Math.max(len2, v.index), 0) + 1;
          let placedVariants = new Array(len);
          variants.forEach((v) => {
            let cv;
            if (v.fields[0]?.name == null) {
              switch (v.fields.length) {
                case 0:
                  cv = { kind: "empty", name: v.name, index: v.index };
                  break;
                case 1:
                  cv = { kind: "value", name: v.name, index: v.index, type: v.fields[0].type };
                  break;
                default:
                  cv = {
                    kind: "tuple",
                    name: v.name,
                    index: v.index,
                    def: {
                      kind: types_1.TypeKind.Tuple,
                      tuple: v.fields.map((f) => {
                        (0, assert_1.default)(f.name == null);
                        return f.type;
                      })
                    }
                  };
              }
            } else {
              cv = {
                kind: "struct",
                name: v.name,
                index: v.index,
                def: {
                  kind: types_1.TypeKind.Struct,
                  fields: v.fields.map((f) => {
                    let name = (0, util_1.assertNotNull)(f.name);
                    return { name, type: f.type };
                  })
                }
              };
            }
            placedVariants[v.index] = cv;
            variantsByName[cv.name] = cv;
          });
          return {
            kind: types_1.TypeKind.Variant,
            variants: placedVariants,
            variantsByName
          };
        }
        default:
          return def;
      }
    }
    exports.getCodecType = getCodecType;
    function toCodecTypes(types) {
      let codecTypes = new Array(types.length);
      for (let i = 0; i < types.length; i++) {
        codecTypes[i] = getCodecType(types, i);
      }
      return codecTypes;
    }
    exports.toCodecTypes = toCodecTypes;
  }
});

// ../node_modules/@subsquid/scale-codec/lib/codec.js
var require_codec = __commonJS({
  "../node_modules/@subsquid/scale-codec/lib/codec.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Codec = void 0;
    var util_internal_hex_1 = require_hex();
    var assert_1 = __importDefault(require_assert());
    var sink_1 = require_sink();
    var src_1 = require_src();
    var types_1 = require_types();
    var types_codec_1 = require_types_codec();
    var util_1 = require_util();
    var Codec = class {
      constructor(types) {
        this.types = (0, types_codec_1.toCodecTypes)(types);
      }
      decodeBinary(type, data) {
        let src = new src_1.Src(data);
        let val = this.decode(type, src);
        src.assertEOF();
        return val;
      }
      encodeToHex(type, val) {
        let sink = new sink_1.HexSink();
        this.encode(type, val, sink);
        return sink.toHex();
      }
      encodeToBinary(type, val) {
        let sink = new sink_1.ByteSink();
        this.encode(type, val, sink);
        return sink.toBytes();
      }
      decode(type, src) {
        let def = this.types[type];
        switch (def.kind) {
          case types_1.TypeKind.Primitive:
            return decodePrimitive(def.primitive, src);
          case types_1.TypeKind.Compact:
            return decodeCompact(def, src);
          case types_1.TypeKind.BitSequence:
            return decodeBitSequence(src);
          case types_1.TypeKind.Array:
            return this.decodeArray(def, src);
          case types_1.TypeKind.Sequence:
            return this.decodeSequence(def, src);
          case types_1.TypeKind.Tuple:
            return this.decodeTuple(def, src);
          case types_1.TypeKind.Struct:
            return this.decodeStruct(def, src);
          case types_1.TypeKind.Variant:
            return this.decodeVariant(def, src);
          case types_1.TypeKind.Option:
            return this.decodeOption(def, src);
          case types_1.TypeKind.BooleanOption:
            return decodeBooleanOption(src);
          case types_1.TypeKind.Bytes:
            return decodeBytes(src);
          case types_1.TypeKind.BytesArray:
            return src.bytes(def.len);
          case types_1.TypeKind.HexBytes:
            return (0, util_internal_hex_1.toHex)(decodeBytes(src));
          case types_1.TypeKind.HexBytesArray:
            return (0, util_internal_hex_1.toHex)(src.bytes(def.len));
          case types_1.TypeKind.DoNotConstruct:
            (0, util_1.throwUnexpectedCase)("DoNotConstruct type reached");
          default:
            (0, util_1.throwUnexpectedCase)(def.kind);
        }
      }
      decodeArray(def, src) {
        let { len, type } = def;
        let result = new Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = this.decode(type, src);
        }
        return result;
      }
      decodeSequence(def, src) {
        let len = src.compactLength();
        let result = new Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = this.decode(def.type, src);
        }
        return result;
      }
      decodeTuple(def, src) {
        if (def.tuple.length == 0)
          return null;
        let result = new Array(def.tuple.length);
        for (let i = 0; i < def.tuple.length; i++) {
          result[i] = this.decode(def.tuple[i], src);
        }
        return result;
      }
      decodeStruct(def, src) {
        let result = {};
        for (let i = 0; i < def.fields.length; i++) {
          let f = def.fields[i];
          result[f.name] = this.decode(f.type, src);
        }
        return result;
      }
      decodeVariant(def, src) {
        let idx = src.u8();
        let variant = def.variants[idx];
        if (variant == null)
          (0, util_1.throwUnexpectedCase)(`unknown variant index: ${idx}`);
        switch (variant.kind) {
          case "empty":
            return {
              __kind: variant.name
            };
          case "tuple":
            return {
              __kind: variant.name,
              value: this.decodeTuple(variant.def, src)
            };
          case "value":
            return {
              __kind: variant.name,
              value: this.decode(variant.type, src)
            };
          case "struct": {
            let value = this.decodeStruct(variant.def, src);
            value.__kind = variant.name;
            return value;
          }
          default:
            (0, util_1.throwUnexpectedCase)();
        }
      }
      decodeOption(def, src) {
        let byte = src.u8();
        switch (byte) {
          case 0:
            return void 0;
          case 1:
            return this.decode(def.type, src);
          default:
            (0, util_1.throwUnexpectedCase)(byte.toString());
        }
      }
      encode(type, val, sink) {
        let def = this.types[type];
        switch (def.kind) {
          case types_1.TypeKind.Primitive:
            encodePrimitive(def.primitive, val, sink);
            break;
          case types_1.TypeKind.Compact:
            sink.compact(val);
            break;
          case types_1.TypeKind.BitSequence:
            encodeBitSequence(val, sink);
            break;
          case types_1.TypeKind.Array:
            this.encodeArray(def, val, sink);
            break;
          case types_1.TypeKind.Sequence:
            this.encodeSequence(def, val, sink);
            break;
          case types_1.TypeKind.Tuple:
            this.encodeTuple(def, val, sink);
            break;
          case types_1.TypeKind.Struct:
            this.encodeStruct(def, val, sink);
            break;
          case types_1.TypeKind.Variant:
            this.encodeVariant(def, val, sink);
            break;
          case types_1.TypeKind.BytesArray:
            encodeBytesArray(def, val, sink);
            break;
          case types_1.TypeKind.HexBytesArray:
            encodeBytesArray(def, (0, util_internal_hex_1.decodeHex)(val), sink);
            break;
          case types_1.TypeKind.Bytes:
            encodeBytes(val, sink);
            break;
          case types_1.TypeKind.HexBytes:
            encodeBytes((0, util_internal_hex_1.decodeHex)(val), sink);
            break;
          case types_1.TypeKind.BooleanOption:
            encodeBooleanOption(val, sink);
            break;
          case types_1.TypeKind.Option:
            this.encodeOption(def, val, sink);
            break;
          default:
            (0, util_1.throwUnexpectedCase)(def.kind);
        }
      }
      encodeArray(def, val, sink) {
        (0, assert_1.default)(Array.isArray(val) && val.length == def.len);
        for (let i = 0; i < val.length; i++) {
          this.encode(def.type, val[i], sink);
        }
      }
      encodeSequence(def, val, sink) {
        (0, assert_1.default)(Array.isArray(val));
        sink.compact(val.length);
        for (let i = 0; i < val.length; i++) {
          this.encode(def.type, val[i], sink);
        }
      }
      encodeTuple(def, val, sink) {
        if (def.tuple.length == 0) {
          (0, assert_1.default)(val == null);
          return;
        }
        (0, assert_1.default)(Array.isArray(val) && def.tuple.length == val.length);
        for (let i = 0; i < val.length; i++) {
          this.encode(def.tuple[i], val[i], sink);
        }
      }
      encodeStruct(def, val, sink) {
        for (let i = 0; i < def.fields.length; i++) {
          let f = def.fields[i];
          this.encode(f.type, val[f.name], sink);
        }
      }
      encodeVariant(def, val, sink) {
        (0, assert_1.default)(typeof val?.__kind == "string", "not a variant type value");
        let variant = def.variantsByName[val.__kind];
        if (variant == null)
          throw new Error(`Unknown variant: ${val.__kind}`);
        sink.u8(variant.index);
        switch (variant.kind) {
          case "empty":
            break;
          case "value":
            this.encode(variant.type, val.value, sink);
            break;
          case "tuple":
            this.encodeTuple(variant.def, val.value, sink);
            break;
          case "struct":
            this.encodeStruct(variant.def, val, sink);
            break;
          default:
            (0, util_1.throwUnexpectedCase)();
        }
      }
      encodeOption(def, val, sink) {
        if (val === void 0) {
          sink.u8(0);
        } else {
          sink.u8(1);
          this.encode(def.type, val, sink);
        }
      }
    };
    exports.Codec = Codec;
    function decodeBytes(src) {
      let len = src.compactLength();
      return src.bytes(len);
    }
    function encodeBytes(val, sink) {
      (0, assert_1.default)(val instanceof Uint8Array);
      sink.compact(val.length);
      sink.bytes(val);
    }
    function encodeBytesArray(def, val, sink) {
      (0, assert_1.default)(val instanceof Uint8Array && val.length == def.len);
      sink.bytes(val);
    }
    function decodeBitSequence(src) {
      let bitLength = src.compactLength();
      let byteLength = Math.ceil(bitLength / 8);
      let bytes = src.bytes(byteLength);
      return {
        bytes,
        bitLength
      };
    }
    function encodeBitSequence(val, sink) {
      (0, assert_1.default)(val && typeof val == "object" && Number.isInteger(val.bitLength) && val.bytes instanceof Uint8Array);
      let bits = val;
      (0, assert_1.default)(Math.ceil(bits.bitLength / 8) == bits.bytes.length);
      sink.compact(bits.bitLength);
      sink.bytes(bits.bytes);
    }
    function decodeBooleanOption(src) {
      let byte = src.u8();
      switch (byte) {
        case 0:
          return null;
        case 1:
          return true;
        case 2:
          return false;
        default:
          (0, util_1.throwUnexpectedCase)(byte.toString());
      }
    }
    function encodeBooleanOption(val, sink) {
      if (val == null) {
        sink.u8(0);
      } else {
        (0, assert_1.default)(typeof val == "boolean");
        sink.u8(val ? 1 : 2);
      }
    }
    function decodeCompact(type, src) {
      let n = src.compact();
      switch (type.integer) {
        case "U8":
        case "U16":
        case "U32":
          return n;
        default:
          return BigInt(n);
      }
    }
    function decodePrimitive(type, src) {
      switch (type) {
        case "I8":
          return src.i8();
        case "U8":
          return src.u8();
        case "I16":
          return src.i16();
        case "U16":
          return src.u16();
        case "I32":
          return src.i32();
        case "U32":
          return src.u32();
        case "I64":
          return src.i64();
        case "U64":
          return src.u64();
        case "I128":
          return src.i128();
        case "U128":
          return src.u128();
        case "I256":
          return src.i256();
        case "U256":
          return src.u256();
        case "Bool":
          return src.bool();
        case "Str":
          return src.str();
        default:
          (0, util_1.throwUnexpectedCase)(type);
      }
    }
    function encodePrimitive(type, val, sink) {
      switch (type) {
        case "I8":
          sink.i8(val);
          break;
        case "U8":
          sink.u8(val);
          break;
        case "I16":
          sink.i16(val);
          break;
        case "U16":
          sink.u16(val);
          break;
        case "I32":
          sink.i32(val);
          break;
        case "U32":
          sink.u32(val);
          break;
        case "I64":
          sink.i64(val);
          break;
        case "U64":
          sink.u64(val);
          break;
        case "I128":
          sink.i128(val);
          break;
        case "U128":
          sink.u128(val);
          break;
        case "I256":
          sink.i256(val);
          break;
        case "U256":
          sink.u256(val);
          break;
        case "Bool":
          sink.bool(val);
          break;
        case "Str":
          sink.str(val);
          break;
        default:
          (0, util_1.throwUnexpectedCase)(type);
      }
    }
  }
});

// ../node_modules/@subsquid/util-internal-json/lib/json.js
var require_json = __commonJS({
  "../node_modules/@subsquid/util-internal-json/lib/json.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toJSON = void 0;
    var util_internal_hex_1 = require_hex();
    function toJSON(val) {
      let json;
      switch (typeof val) {
        case "bigint":
          return val.toString();
        case "object":
          if (val == null)
            return null;
          if (val instanceof Uint8Array) {
            return (0, util_internal_hex_1.toHex)(val);
          } else if (val instanceof Date) {
            return val.toISOString();
          } else if (typeof val.toJSON == "function" && (json = val.toJSON()) !== val) {
            return toJSON(json);
          } else if (val instanceof Error) {
            json = {};
            if (val.stack) {
              json.stack = val.stack;
            } else {
              json.stack = val.toString();
            }
            json = toJsonObject(val, json);
            return json;
          } else if (val instanceof Map) {
            let entries = [];
            for (let [k, v] of val.entries()) {
              entries.push({ k, v });
            }
            return toJSON({ map: entries });
          } else if (val instanceof Set) {
            return toJSON({ set: [...val] });
          } else if (Array.isArray(val)) {
            return toJsonArray(val);
          } else {
            return toJsonObject(val);
          }
        default:
          return val;
      }
    }
    exports.toJSON = toJSON;
    function toJsonArray(val) {
      let arr = new Array(val.length);
      for (let i = 0; i < val.length; i++) {
        arr[i] = toJSON(val[i]);
      }
      return arr;
    }
    function toJsonObject(val, result) {
      result = result || {};
      for (let key in val) {
        result[key] = toJSON(val[key]);
      }
      return result;
    }
  }
});

// ../node_modules/@subsquid/scale-codec/lib/codec-json.js
var require_codec_json = __commonJS({
  "../node_modules/@subsquid/scale-codec/lib/codec-json.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeBinaryArray = exports.JsonCodec = void 0;
    var util_internal_hex_1 = require_hex();
    var util_internal_json_1 = require_json();
    var assert_1 = __importDefault(require_assert());
    var types_1 = require_types();
    var types_codec_1 = require_types_codec();
    var util_1 = require_util();
    var JsonCodec = class {
      static encode(val) {
        return (0, util_internal_json_1.toJSON)(val);
      }
      constructor(types) {
        this.types = (0, types_codec_1.toCodecTypes)(types);
      }
      decode(type, val) {
        let def = this.types[type];
        switch (def.kind) {
          case types_1.TypeKind.Primitive:
            return decodePrimitive(def.primitive, val);
          case types_1.TypeKind.Compact:
            return decodePrimitive(def.integer, val);
          case types_1.TypeKind.BitSequence:
            return (0, util_internal_hex_1.decodeHex)(val);
          case types_1.TypeKind.Array:
            return this.decodeArray(def, val);
          case types_1.TypeKind.Sequence:
            return this.decodeSequence(def, val);
          case types_1.TypeKind.Tuple:
            return this.decodeTuple(def, val);
          case types_1.TypeKind.Struct:
            return this.decodeStruct(def, val);
          case types_1.TypeKind.Variant:
            return this.decodeVariant(def, val);
          case types_1.TypeKind.Option:
            return this.decodeOption(def, val);
          case types_1.TypeKind.BooleanOption:
            return decodeBooleanOption(val);
          case types_1.TypeKind.Bytes:
            return (0, util_internal_hex_1.decodeHex)(val);
          case types_1.TypeKind.BytesArray:
            return decodeBinaryArray(def.len, val);
          case types_1.TypeKind.HexBytes:
          case types_1.TypeKind.HexBytesArray:
            (0, assert_1.default)((0, util_internal_hex_1.isHex)(val));
            return val;
          case types_1.TypeKind.DoNotConstruct:
            (0, util_1.throwUnexpectedCase)("DoNotConstruct type reached");
          default:
            (0, util_1.throwUnexpectedCase)();
        }
      }
      decodeArray(def, val) {
        let { len, type } = def;
        (0, assert_1.default)(Array.isArray(val));
        (0, assert_1.default)(val.length == len);
        let result = new Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = this.decode(type, val[i]);
        }
        return result;
      }
      decodeSequence(def, val) {
        (0, assert_1.default)(Array.isArray(val));
        let result = new Array(val.length);
        for (let i = 0; i < val.length; i++) {
          result[i] = this.decode(def.type, val[i]);
        }
        return result;
      }
      decodeTuple(def, value) {
        let items = def.tuple;
        if (items.length == 0) {
          (0, assert_1.default)(value == null || Array.isArray(value) && value.length == 0);
          return null;
        } else {
          (0, assert_1.default)(Array.isArray(value));
          (0, assert_1.default)(value.length == items.length);
          let result = new Array(items.length);
          for (let i = 0; i < items.length; i++) {
            result[i] = this.decode(items[i], value[i]);
          }
          return result;
        }
      }
      decodeStruct(def, value) {
        (0, assert_1.default)((0, util_1.isObject)(value));
        let result = {};
        for (let i = 0; i < def.fields.length; i++) {
          let f = def.fields[i];
          result[f.name] = this.decode(f.type, value[f.name]);
        }
        return result;
      }
      decodeVariant(def, val) {
        (0, assert_1.default)((0, util_1.isObject)(val));
        (0, assert_1.default)(typeof val.__kind == "string");
        let variant = def.variantsByName[val.__kind];
        if (variant == null)
          throw new Error(`Unknown variant ${val.__kind}`);
        switch (variant.kind) {
          case "empty":
            return {
              __kind: val.__kind
            };
          case "value":
            return {
              __kind: val.__kind,
              value: this.decode(variant.type, val.value)
            };
          case "tuple":
            return {
              __kind: val.__kind,
              value: this.decodeTuple(variant.def, val.value)
            };
          case "struct": {
            let s = this.decodeStruct(variant.def, val);
            s.__kind = val.__kind;
            return s;
          }
          default:
            (0, util_1.throwUnexpectedCase)(variant.kind);
        }
      }
      decodeOption(def, value) {
        return value == null ? void 0 : this.decode(def.type, value);
      }
    };
    exports.JsonCodec = JsonCodec;
    function decodePrimitive(type, value) {
      switch (type) {
        case "I8":
          (0, util_1.checkSignedInt)(value, 8);
          return value;
        case "I16":
          (0, util_1.checkSignedInt)(value, 16);
          return value;
        case "I32":
          (0, util_1.checkSignedInt)(value, 32);
          return value;
        case "I64":
          return (0, util_1.toSignedBigInt)(value, 64);
        case "I128":
          return (0, util_1.toSignedBigInt)(value, 128);
        case "I256":
          return (0, util_1.toSignedBigInt)(value, 256);
        case "U8":
          (0, util_1.checkUnsignedInt)(value, 8);
          return value;
        case "U16":
          (0, util_1.checkUnsignedInt)(value, 16);
          return value;
        case "U32":
          (0, util_1.checkUnsignedInt)(value, 32);
          return value;
        case "U64":
          return (0, util_1.toUnsignedBigInt)(value, 64);
        case "U128":
          return (0, util_1.toUnsignedBigInt)(value, 128);
        case "U256":
          return (0, util_1.toUnsignedBigInt)(value, 256);
        case "Bool":
          (0, assert_1.default)(typeof value == "boolean");
          return value;
        case "Str":
          (0, assert_1.default)(typeof value == "string");
          return value;
        default:
          (0, util_1.throwUnexpectedCase)(type);
      }
    }
    function decodeBooleanOption(value) {
      if (value == null)
        return void 0;
      (0, assert_1.default)(typeof value == "boolean");
      return value;
    }
    function decodeBinaryArray(len, value) {
      let buf = (0, util_internal_hex_1.decodeHex)(value);
      (0, assert_1.default)(buf.length == len);
      return buf;
    }
    exports.decodeBinaryArray = decodeBinaryArray;
  }
});

// ../node_modules/@subsquid/scale-codec/lib/index.js
var require_lib = __commonJS({
  "../node_modules/@subsquid/scale-codec/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_types(), exports);
    __exportStar(require_src(), exports);
    __exportStar(require_sink(), exports);
    __exportStar(require_codec(), exports);
    __exportStar(require_codec_json(), exports);
  }
});

// ../node_modules/@scure/base/index.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes(b) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
}
function isArrayOf(isString, arr) {
  if (!Array.isArray(arr))
    return false;
  if (arr.length === 0)
    return true;
  if (isString) {
    return arr.every((item) => typeof item === "string");
  } else {
    return arr.every((item) => Number.isSafeInteger(item));
  }
}
function afn(input) {
  if (typeof input !== "function")
    throw new Error("function expected");
  return true;
}
function astr(label, input) {
  if (typeof input !== "string")
    throw new Error(`${label}: string expected`);
  return true;
}
function anumber(n) {
  if (!Number.isSafeInteger(n))
    throw new Error(`invalid integer: ${n}`);
}
function aArr(input) {
  if (!Array.isArray(input))
    throw new Error("array expected");
}
function astrArr(label, input) {
  if (!isArrayOf(true, input))
    throw new Error(`${label}: array of strings expected`);
}
function anumArr(label, input) {
  if (!isArrayOf(false, input))
    throw new Error(`${label}: array of numbers expected`);
}
function chain(...args) {
  const id = (a) => a;
  const wrap = (a, b) => (c) => a(b(c));
  const encode = args.map((x) => x.encode).reduceRight(wrap, id);
  const decode = args.map((x) => x.decode).reduce(wrap, id);
  return { encode, decode };
}
function alphabet(letters) {
  const lettersA = typeof letters === "string" ? letters.split("") : letters;
  const len = lettersA.length;
  astrArr("alphabet", lettersA);
  const indexes = new Map(lettersA.map((l, i) => [l, i]));
  return {
    encode: (digits) => {
      aArr(digits);
      return digits.map((i) => {
        if (!Number.isSafeInteger(i) || i < 0 || i >= len)
          throw new Error(`alphabet.encode: digit index outside alphabet "${i}". Allowed: ${letters}`);
        return lettersA[i];
      });
    },
    decode: (input) => {
      aArr(input);
      return input.map((letter) => {
        astr("alphabet.decode", letter);
        const i = indexes.get(letter);
        if (i === void 0)
          throw new Error(`Unknown letter: "${letter}". Allowed: ${letters}`);
        return i;
      });
    }
  };
}
function join(separator = "") {
  astr("join", separator);
  return {
    encode: (from) => {
      astrArr("join.decode", from);
      return from.join(separator);
    },
    decode: (to) => {
      astr("join.decode", to);
      return to.split(separator);
    }
  };
}
function padding(bits, chr = "=") {
  anumber(bits);
  astr("padding", chr);
  return {
    encode(data) {
      astrArr("padding.encode", data);
      while (data.length * bits % 8)
        data.push(chr);
      return data;
    },
    decode(input) {
      astrArr("padding.decode", input);
      let end = input.length;
      if (end * bits % 8)
        throw new Error("padding: invalid, string should have whole number of bytes");
      for (; end > 0 && input[end - 1] === chr; end--) {
        const last = end - 1;
        const byte = last * bits;
        if (byte % 8 === 0)
          throw new Error("padding: invalid, string has too much padding");
      }
      return input.slice(0, end);
    }
  };
}
function normalize(fn) {
  afn(fn);
  return { encode: (from) => from, decode: (to) => fn(to) };
}
function convertRadix(data, from, to) {
  if (from < 2)
    throw new Error(`convertRadix: invalid from=${from}, base cannot be less than 2`);
  if (to < 2)
    throw new Error(`convertRadix: invalid to=${to}, base cannot be less than 2`);
  aArr(data);
  if (!data.length)
    return [];
  let pos = 0;
  const res = [];
  const digits = Array.from(data, (d) => {
    anumber(d);
    if (d < 0 || d >= from)
      throw new Error(`invalid integer: ${d}`);
    return d;
  });
  const dlen = digits.length;
  while (true) {
    let carry = 0;
    let done = true;
    for (let i = pos; i < dlen; i++) {
      const digit = digits[i];
      const fromCarry = from * carry;
      const digitBase = fromCarry + digit;
      if (!Number.isSafeInteger(digitBase) || fromCarry / from !== carry || digitBase - digit !== fromCarry) {
        throw new Error("convertRadix: carry overflow");
      }
      const div = digitBase / to;
      carry = digitBase % to;
      const rounded = Math.floor(div);
      digits[i] = rounded;
      if (!Number.isSafeInteger(rounded) || rounded * to + carry !== digitBase)
        throw new Error("convertRadix: carry overflow");
      if (!done)
        continue;
      else if (!rounded)
        pos = i;
      else
        done = false;
    }
    res.push(carry);
    if (done)
      break;
  }
  for (let i = 0; i < data.length - 1 && data[i] === 0; i++)
    res.push(0);
  return res.reverse();
}
var gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
var radix2carry = (from, to) => from + (to - gcd(from, to));
var powers = (() => {
  let res = [];
  for (let i = 0; i < 40; i++)
    res.push(2 ** i);
  return res;
})();
function convertRadix2(data, from, to, padding2) {
  aArr(data);
  if (from <= 0 || from > 32)
    throw new Error(`convertRadix2: wrong from=${from}`);
  if (to <= 0 || to > 32)
    throw new Error(`convertRadix2: wrong to=${to}`);
  if (radix2carry(from, to) > 32) {
    throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${radix2carry(from, to)}`);
  }
  let carry = 0;
  let pos = 0;
  const max = powers[from];
  const mask = powers[to] - 1;
  const res = [];
  for (const n of data) {
    anumber(n);
    if (n >= max)
      throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
    carry = carry << from | n;
    if (pos + from > 32)
      throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
    pos += from;
    for (; pos >= to; pos -= to)
      res.push((carry >> pos - to & mask) >>> 0);
    const pow = powers[pos];
    if (pow === void 0)
      throw new Error("invalid carry");
    carry &= pow - 1;
  }
  carry = carry << to - pos & mask;
  if (!padding2 && pos >= from)
    throw new Error("Excess padding");
  if (!padding2 && carry > 0)
    throw new Error(`Non-zero padding: ${carry}`);
  if (padding2 && pos > 0)
    res.push(carry >>> 0);
  return res;
}
function radix(num) {
  anumber(num);
  const _256 = 2 ** 8;
  return {
    encode: (bytes) => {
      if (!isBytes(bytes))
        throw new Error("radix.encode input should be Uint8Array");
      return convertRadix(Array.from(bytes), _256, num);
    },
    decode: (digits) => {
      anumArr("radix.decode", digits);
      return Uint8Array.from(convertRadix(digits, num, _256));
    }
  };
}
function radix2(bits, revPadding = false) {
  anumber(bits);
  if (bits <= 0 || bits > 32)
    throw new Error("radix2: bits should be in (0..32]");
  if (radix2carry(8, bits) > 32 || radix2carry(bits, 8) > 32)
    throw new Error("radix2: carry overflow");
  return {
    encode: (bytes) => {
      if (!isBytes(bytes))
        throw new Error("radix2.encode input should be Uint8Array");
      return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
    },
    decode: (digits) => {
      anumArr("radix2.decode", digits);
      return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
    }
  };
}
function unsafeWrapper(fn) {
  afn(fn);
  return function(...args) {
    try {
      return fn.apply(null, args);
    } catch (e) {
    }
  };
}
var base16 = chain(radix2(4), alphabet("0123456789ABCDEF"), join(""));
var base32 = chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), padding(5), join(""));
var base32nopad = chain(radix2(5), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), join(""));
var base32hex = chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), padding(5), join(""));
var base32hexnopad = chain(radix2(5), alphabet("0123456789ABCDEFGHIJKLMNOPQRSTUV"), join(""));
var base32crockford = chain(radix2(5), alphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), join(""), normalize((s) => s.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
var hasBase64Builtin = (() => typeof Uint8Array.from([]).toBase64 === "function" && typeof Uint8Array.fromBase64 === "function")();
var decodeBase64Builtin = (s, isUrl) => {
  astr("base64", s);
  const re = isUrl ? /^[A-Za-z0-9=_-]+$/ : /^[A-Za-z0-9=+/]+$/;
  const alphabet2 = isUrl ? "base64url" : "base64";
  if (s.length > 0 && !re.test(s))
    throw new Error("invalid base64");
  return Uint8Array.fromBase64(s, { alphabet: alphabet2, lastChunkHandling: "strict" });
};
var base64 = hasBase64Builtin ? {
  encode(b) {
    abytes(b);
    return b.toBase64();
  },
  decode(s) {
    return decodeBase64Builtin(s, false);
  }
} : chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), padding(6), join(""));
var base64nopad = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), join(""));
var base64url = hasBase64Builtin ? {
  encode(b) {
    abytes(b);
    return b.toBase64({ alphabet: "base64url" });
  },
  decode(s) {
    return decodeBase64Builtin(s, true);
  }
} : chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), padding(6), join(""));
var base64urlnopad = chain(radix2(6), alphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), join(""));
var genBase58 = (abc) => chain(radix(58), alphabet(abc), join(""));
var base58 = genBase58("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
var base58flickr = genBase58("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");
var base58xrp = genBase58("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
var BECH_ALPHABET = chain(alphabet("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), join(""));
var POLYMOD_GENERATORS = [996825010, 642813549, 513874426, 1027748829, 705979059];
function bech32Polymod(pre) {
  const b = pre >> 25;
  let chk = (pre & 33554431) << 5;
  for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
    if ((b >> i & 1) === 1)
      chk ^= POLYMOD_GENERATORS[i];
  }
  return chk;
}
function bechChecksum(prefix, words, encodingConst = 1) {
  const len = prefix.length;
  let chk = 1;
  for (let i = 0; i < len; i++) {
    const c = prefix.charCodeAt(i);
    if (c < 33 || c > 126)
      throw new Error(`Invalid prefix (${prefix})`);
    chk = bech32Polymod(chk) ^ c >> 5;
  }
  chk = bech32Polymod(chk);
  for (let i = 0; i < len; i++)
    chk = bech32Polymod(chk) ^ prefix.charCodeAt(i) & 31;
  for (let v of words)
    chk = bech32Polymod(chk) ^ v;
  for (let i = 0; i < 6; i++)
    chk = bech32Polymod(chk);
  chk ^= encodingConst;
  return BECH_ALPHABET.encode(convertRadix2([chk % powers[30]], 30, 5, false));
}
function genBech32(encoding) {
  const ENCODING_CONST = encoding === "bech32" ? 1 : 734539939;
  const _words = radix2(5);
  const fromWords = _words.decode;
  const toWords = _words.encode;
  const fromWordsUnsafe = unsafeWrapper(fromWords);
  function encode(prefix, words, limit = 90) {
    astr("bech32.encode prefix", prefix);
    if (isBytes(words))
      words = Array.from(words);
    anumArr("bech32.encode", words);
    const plen = prefix.length;
    if (plen === 0)
      throw new TypeError(`Invalid prefix length ${plen}`);
    const actualLength = plen + 7 + words.length;
    if (limit !== false && actualLength > limit)
      throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
    const lowered = prefix.toLowerCase();
    const sum = bechChecksum(lowered, words, ENCODING_CONST);
    return `${lowered}1${BECH_ALPHABET.encode(words)}${sum}`;
  }
  function decode(str, limit = 90) {
    astr("bech32.decode input", str);
    const slen = str.length;
    if (slen < 8 || limit !== false && slen > limit)
      throw new TypeError(`invalid string length: ${slen} (${str}). Expected (8..${limit})`);
    const lowered = str.toLowerCase();
    if (str !== lowered && str !== str.toUpperCase())
      throw new Error(`String must be lowercase or uppercase`);
    const sepIndex = lowered.lastIndexOf("1");
    if (sepIndex === 0 || sepIndex === -1)
      throw new Error(`Letter "1" must be present between prefix and data only`);
    const prefix = lowered.slice(0, sepIndex);
    const data = lowered.slice(sepIndex + 1);
    if (data.length < 6)
      throw new Error("Data must be at least 6 characters long");
    const words = BECH_ALPHABET.decode(data).slice(0, -6);
    const sum = bechChecksum(prefix, words, ENCODING_CONST);
    if (!data.endsWith(sum))
      throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
    return { prefix, words };
  }
  const decodeUnsafe = unsafeWrapper(decode);
  function decodeToBytes(str) {
    const { prefix, words } = decode(str, false);
    return { prefix, words, bytes: fromWords(words) };
  }
  function encodeFromBytes(prefix, bytes) {
    return encode(prefix, toWords(bytes));
  }
  return {
    encode,
    decode,
    encodeFromBytes,
    decodeToBytes,
    decodeUnsafe,
    fromWords,
    fromWordsUnsafe,
    toWords
  };
}
var bech32 = genBech32("bech32");
var bech32m = genBech32("bech32m");
var hasHexBuiltin = (() => typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function")();
var hexBuiltin = {
  encode(data) {
    abytes(data);
    return data.toHex();
  },
  decode(s) {
    astr("hex", s);
    return Uint8Array.fromHex(s);
  }
};
var hex = hasHexBuiltin ? hexBuiltin : chain(radix2(4), alphabet("0123456789abcdef"), join(""), normalize((s) => {
  if (typeof s !== "string" || s.length % 2 !== 0)
    throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
  return s.toLowerCase();
}));

// ../node_modules/@midnight-ntwrk/wallet-sdk-address-format/dist/index.js
var subsquidScale = __toESM(require_lib());
var mainnet = /* @__PURE__ */ Symbol("Mainnet");
var NetworkId = {
  toString: (networkId) => {
    return networkId === mainnet ? "mainnet" : networkId;
  }
};
var BLSScalar = {
  bytes: 32,
  modulus: BigInt("0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001")
};
var ScaleBigInt = {
  encode: (data) => {
    const sink = new subsquidScale.ByteSink();
    sink.compact(data);
    return Buffer.from(sink.toBytes());
  },
  decode: (repr) => {
    const src = new subsquidScale.Src(repr);
    const res = src.compact();
    src.assertEOF();
    return BigInt(res);
  }
};
var Bech32mSymbol = /* @__PURE__ */ Symbol("MidnightBech32m");
var MidnightBech32m = class _MidnightBech32m {
  static prefix = "mn";
  static encode(networkId, item) {
    return item[Bech32mSymbol].encode(networkId, item);
  }
  static validateSegment(segmentName, segment) {
    const result = /^[A-Za-z1-9-]+$/.test(segment);
    if (!result) {
      throw new Error(`Segment ${segmentName}: ${segment} contains disallowed characters. Allowed characters are only numbers, latin letters and a hyphen`);
    }
  }
  static parse(bech32string) {
    const bech32parsed = bech32m.decodeToBytes(bech32string);
    const [prefix, type, network = mainnet] = bech32parsed.prefix.split("_");
    if (prefix != _MidnightBech32m.prefix) {
      throw new Error(`Expected prefix ${_MidnightBech32m.prefix}`);
    }
    _MidnightBech32m.validateSegment("type", type);
    if (network != mainnet) {
      _MidnightBech32m.validateSegment("network", network);
    }
    return new _MidnightBech32m(type, network, Buffer.from(bech32parsed.bytes));
  }
  type;
  network;
  data;
  constructor(type, network, data) {
    this.data = data;
    this.network = network;
    this.type = type;
    _MidnightBech32m.validateSegment("type", type);
    if (network != mainnet) {
      _MidnightBech32m.validateSegment("network", network);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  decode(tclass, networkId) {
    return tclass[Bech32mSymbol].decode(networkId, this);
  }
  asString() {
    const networkSegment = this.network == mainnet ? "" : `_${this.network}`;
    return bech32m.encode(`${_MidnightBech32m.prefix}_${this.type}${networkSegment}`, bech32m.toWords(this.data), false);
  }
  toString() {
    return this.asString();
  }
};
var Bech32mCodec = class _Bech32mCodec {
  type;
  dataToBytes;
  dataFromBytes;
  constructor(type, dataToBytes, dataFromBytes) {
    this.dataFromBytes = dataFromBytes;
    this.dataToBytes = dataToBytes;
    this.type = type;
  }
  encode(networkId, data) {
    const context = _Bech32mCodec.createContext(networkId);
    return new MidnightBech32m(this.type, context.networkId, this.dataToBytes(data));
  }
  decode(networkId, repr) {
    const context = _Bech32mCodec.createContext(networkId);
    if (repr.type != this.type) {
      throw new Error(`Expected type ${this.type}, got ${repr.type}`);
    }
    if (context.networkId != repr.network) {
      throw new Error(`Expected ${NetworkId.toString(context.networkId)} address, got ${NetworkId.toString(repr.network)} one`);
    }
    return this.dataFromBytes(repr.data);
  }
  static createContext(networkId) {
    if (networkId === "mainnet") {
      return { networkId: mainnet };
    } else {
      return { networkId };
    }
  }
};
var ShieldedAddress = class _ShieldedAddress {
  static codec = new Bech32mCodec("shield-addr", (addr) => Buffer.concat([addr.coinPublicKey.data, addr.encryptionPublicKey.data]), (bytes) => {
    const coinPublicKey = new ShieldedCoinPublicKey(bytes.subarray(0, ShieldedCoinPublicKey.keyLength));
    const encryptionPublicKey = new ShieldedEncryptionPublicKey(bytes.subarray(ShieldedCoinPublicKey.keyLength));
    return new _ShieldedAddress(coinPublicKey, encryptionPublicKey);
  });
  static [Bech32mSymbol] = _ShieldedAddress.codec;
  [Bech32mSymbol] = _ShieldedAddress.codec;
  coinPublicKey;
  encryptionPublicKey;
  constructor(coinPublicKey, encryptionPublicKey) {
    this.encryptionPublicKey = encryptionPublicKey;
    this.coinPublicKey = coinPublicKey;
  }
  coinPublicKeyString() {
    return this.coinPublicKey.data.toString("hex");
  }
  encryptionPublicKeyString() {
    return this.encryptionPublicKey.data.toString("hex");
  }
  equals(other) {
    return this.coinPublicKey.equals(other.coinPublicKey) && this.encryptionPublicKey.equals(other.encryptionPublicKey);
  }
};
var ShieldedEncryptionSecretKey = class _ShieldedEncryptionSecretKey {
  static codec = new Bech32mCodec("shield-esk", (esk) => Buffer.from(esk.zswap.yesIKnowTheSecurityImplicationsOfThis_serialize()), (repr) => new _ShieldedEncryptionSecretKey(EncryptionSecretKey.deserialize(repr)));
  // There are some bits in serialization of field elements and elliptic curve points, that are hard to replicate
  // Thus using zswap implementation directly for serialization purposes
  zswap;
  constructor(zswap) {
    this.zswap = zswap;
  }
};
var ShieldedCoinPublicKey = class _ShieldedCoinPublicKey {
  static keyLength = 32;
  static codec = new Bech32mCodec("shield-cpk", (cpk) => cpk.data, (repr) => new _ShieldedCoinPublicKey(repr));
  static fromHexString(hexString) {
    return new _ShieldedCoinPublicKey(Buffer.from(hexString, "hex"));
  }
  data;
  constructor(data) {
    this.data = data;
    if (data.length != _ShieldedCoinPublicKey.keyLength) {
      throw new Error("Coin public key needs to be 32 bytes long");
    }
  }
  toHexString() {
    return this.data.toString("hex");
  }
  equals(other) {
    const otherKey = typeof other === "string" ? _ShieldedCoinPublicKey.fromHexString(other) : other;
    return otherKey.data.equals(this.data);
  }
};
var ShieldedEncryptionPublicKey = class _ShieldedEncryptionPublicKey {
  static keyLength = 32;
  static codec = new Bech32mCodec("shield-epk", (cpk) => cpk.data, (repr) => new _ShieldedEncryptionPublicKey(repr));
  static fromHexString(hexString) {
    return new _ShieldedEncryptionPublicKey(Buffer.from(hexString, "hex"));
  }
  data;
  constructor(data) {
    this.data = data;
  }
  toHexString() {
    return this.data.toString("hex");
  }
  equals(other) {
    const otherKey = typeof other === "string" ? _ShieldedEncryptionPublicKey.fromHexString(other) : other;
    return otherKey.data.equals(this.data);
  }
};
var UnshieldedAddress = class _UnshieldedAddress {
  data;
  static keyLength = 32;
  static codec = new Bech32mCodec("addr", (addr) => addr.data, (repr) => new _UnshieldedAddress(repr));
  static [Bech32mSymbol] = _UnshieldedAddress.codec;
  [Bech32mSymbol] = _UnshieldedAddress.codec;
  constructor(data) {
    if (data.length != _UnshieldedAddress.keyLength) {
      throw new Error("Unshielded address needs to be 32 bytes long");
    }
    this.data = data;
  }
  get hexString() {
    return this.data.toString("hex");
  }
  equals(other) {
    const otherAddress = typeof other === "string" ? new _UnshieldedAddress(Buffer.from(other, "hex")) : other;
    return otherAddress.data.equals(this.data);
  }
};
var DustAddress = class _DustAddress {
  data;
  static codec = new Bech32mCodec("dust", (daddr) => daddr.serialize(), (repr) => new _DustAddress(ScaleBigInt.decode(repr)));
  static [Bech32mSymbol] = _DustAddress.codec;
  [Bech32mSymbol] = _DustAddress.codec;
  static encodePublicKey = (networkId, publicKey) => {
    return _DustAddress.codec.encode(networkId, new _DustAddress(publicKey)).asString();
  };
  constructor(data) {
    if (data >= BLSScalar.modulus) {
      throw new Error("Dust address is too large");
    }
    this.data = data;
  }
  serialize() {
    return ScaleBigInt.encode(this.data);
  }
  equals(other) {
    const otherAddress = typeof other === "bigint" ? other : other.data;
    return otherAddress === this.data;
  }
};

export {
  mainnet,
  BLSScalar,
  ScaleBigInt,
  Bech32mSymbol,
  MidnightBech32m,
  Bech32mCodec,
  ShieldedAddress,
  ShieldedEncryptionSecretKey,
  ShieldedCoinPublicKey,
  ShieldedEncryptionPublicKey,
  UnshieldedAddress,
  DustAddress
};
//# sourceMappingURL=chunk-QSJJCSYI.js.map
