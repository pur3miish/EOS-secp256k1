import { deepStrictEqual } from 'assert'
import generate_eos_signature from '../src/generate_eos_signature.js'

export default tests => {
  tests.add('generate eos signature', async () => {
    // prettier-ignore
    const hex = new Uint8Array([
      0x2c,0xf2,0x4d,0xba,0x5f,0xb0,0xa3,0x0e,
      0x26,0xe8,0x3b,0x2a,0xc5,0xb9,0xe2,0x9e,
      0x1b,0x16,0x1e,0x5c,0x1f,0xa7,0x42,0x5e,
      0x73,0x04,0x33,0x62,0x93,0x8b,0x98,0x24
    ])

    deepStrictEqual(
      await generate_eos_signature({
        hex,
        wif_private_key: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
      }),
      'SIG_K1_JxMNpqjtD1bdwUASSncg3DNE3Vy9GWMjFUhFQ6QqwN8Dypfhsk7EN47cJ8BD43iXeNBSQ5u8A1Z4TYzeNeDnyvCoNWyyNJ'
    )
  })
}
