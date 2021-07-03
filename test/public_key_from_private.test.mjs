import { deepStrictEqual } from 'assert'
import public_key_from_private from '../public/public_key_from_private.js'

export default tests => {
  tests.add('public_key_from_private', async () => {
    const public_key = await public_key_from_private(
      '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
    )

    deepStrictEqual(
      public_key,
      'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'
    )
  })
}
