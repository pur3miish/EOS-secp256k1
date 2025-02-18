import { deepStrictEqual } from "assert";
import sha256 from "isomorphic-secp256k1-js/sha256.js";

import legacy_to_private_key from "../src/keys/legacy_to_private_key";
import private_key_to_wif from "../src/keys/private_key_to_wif";
import sign from "../src/sign";
import sign_txn from "../src/sign";
import sign_packed_txn from "../src/sign_packed_txn";

it("test sign", async () => {
  const txn = Uint8Array.from([
    201, 144, 10, 60, 10, 246, 220, 228, 85, 27, 162, 73, 106, 240, 88, 79, 157,
    232, 216, 136, 3, 147, 89, 15, 177, 237, 241, 81, 136, 194, 29, 5,
  ]);

  await sign({
    hash: txn,
    wif_private_key: "PVT_K1_MQqJDpAxdoNLLbv3XF9F3vSVzRThY4Uj6MQuNCJzYtee6QzY9",
  });
});

const hash = await sha256(
  new Uint8Array([
    0x2c, 0xf2, 0x4d, 0xba, 0x5f, 0xb0, 0xa3, 0x0e, 0x26, 0xe8, 0x3b, 0x2a,
    0xc5, 0xb9, 0xe2, 0x9e, 0x1b, 0x16, 0x1e, 0x5c, 0x1f, 0xa7, 0x42, 0x5e,
    0x73, 0x04, 0x33, 0x62, 0x93, 0x8b, 0x98, 0x24,
  ])
);

const wif_private_key = await private_key_to_wif(
  legacy_to_private_key("5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3")
);

describe("Antelope k1 signature tests", () => {
  it("sign empty arrary", async () => {
    const sig0 = await sign_txn({
      hash: await sha256(Uint8Array.from([255])),
      wif_private_key,
    });

    deepStrictEqual(
      sig0,
      "SIG_K1_KkdPezk36k4k6jaPHUuvux7ZFvnp5gXSazvUHWRBpJ15Wyys5gEXm56QrzwtyWfd4Abe13DHS7Z1b7kfKxJScT5q9C237S",
      "hash string signature example"
    );
  });

  it("sign_packed_transaction", async () => {
    const x = await sign_packed_txn({
      transaction_header: "deb555655ee3d7020892000000",
      transaction_body:
        "000100a6823403ea3055000000572d3ccdcd0100118d474144a3ba00000000a8ed32322100118d474144a3ba309d69484144a3bae80300000000000004454f53000000000000",
      chain_id:
        "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",
      wif_private_key:
        "PVT_K1_2bfGi9rYsXQSXXTvJbDAPhHLQUojjaNLomdm3cEJ1XTzMqUt3V",
    });

    deepStrictEqual(
      x,
      "SIG_K1_K6eKz25ymDHuxoGHDeKyaajPaoL7dUaVKnXRGVgBgsBgQGcMpxmeDKRF46shV3zqgovBhrgTBP6Z3L5S8rxaHjW1amPj2C",
      "testing sign_packed_txn"
    );
  });

  it("sign_txn tests", async () => {
    deepStrictEqual(
      await sign_txn({ hash, wif_private_key }),
      "SIG_K1_JxMNpqjtD1bdwUASSncg3DNE3Vy9GWMjFUhFQ6QqwN8Dypfhsk7EN47cJ8BD43iXeNBSQ5u8A1Z4TYzeNeDnyvCoNWyyNJ",
      "Expected signature 1."
    );
  });

  it("sign_txn tests - 2", async () => {
    deepStrictEqual(
      await sign_txn({
        hash: await sha256(Uint8Array.from([23, 23, 123, 244])),
        wif_private_key,
      }),
      "SIG_K1_Kdy8vw8s887hzEQjGaoFWnMSC3wsWZpTTz7jvGTQqBAjenJExwpYZ4XgjtnUT56aoxoijSW5K8LJaq86wpTZyH5Az2pbH5",
      "Expected signature 2."
    );
  });

  it("sign txns", async () => {
    deepStrictEqual(
      await sign_txn({
        hash: await sha256(
          Uint8Array.from(
            Buffer.from(
              "8a34ec7df1b8cd06ff4a8abbaa7cc50300823350cadc59ab296cb00d104d2b8ffb6f9061f41a6466f09b000000000110e77d792a77b39e000050d0e4e952320110e77d792a77b39e00000000a8ed32322100000000a868a45a2c000000000000000103706f6f03706f6f0101320001013200000000000000000000000000000000000000000000000000000000000000000000",
              "hex"
            )
          )
        ),
        wif_private_key: await private_key_to_wif(
          await legacy_to_private_key(
            "5K7xR2C8mBzMo4aMPJyBPp7Njc3XvszeJSfTApa51rc2d54rrd3"
          )
        ),
      }),
      "SIG_K1_KmBMyLdQ2DUwkCvwvTmEUG9bG6KooaqBWYoBUBbhkYyzYSaxpA2HkmwKrouRdunPmQNFie8U4JWDqxNohxmSiUFrtbTKkK"
    );
  });
});

it("sign_txn tests - 2", async () => {
  deepStrictEqual(
    await sign_txn({
      hash: await sha256(
        Uint8Array.from([2, 33, 65, 233, 23, 23, 123, 244, 23, 23, 123, 244])
      ),
      wif_private_key,
    }),
    "SIG_K1_K9mUb6kLZN8a9BELwbkdPvwb7W68vfEYUTjVDSSTXsfqVtRh2EfT9rUQKHDwCh2c5ee3rrbS4KVkRsLQyqGYhMJqXY4d81"
  );
});
