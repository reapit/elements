import { object } from '../object'
import { parse } from '../parse'
import { string } from '../string'

test('', () => {
  const schema = object<{ name: string }>({
    name: string(),
  })
  const data = parse(schema, 'hello')
  expect(data).toEqual('hello')
})
