import { number } from '../number'
import { string } from '../string'
import { urlSearchParams } from '../url-search-params'

test('accepts a custom message', () => {
  const schema = urlSearchParams({ a: string() }, 'Custom error message')
  expect(schema.message).toBe('Custom error message')
})

test('keeps a record of the parameters', () => {
  const schema = urlSearchParams({ a: string() }, 'Custom error message')
  expect(schema.parameters).toBeDefined()
})

describe('validate', () => {
  test('search param values are parsed according to their defined schemas', () => {
    const schema = urlSearchParams({ a: string(), c: string() })
    const value = new URLSearchParams('a=b&c=d')
    expect(schema['~standard'].validate(value)).toMatchInlineSnapshot(`
      {
        "value": {
          "a": "b",
          "c": "d",
        },
      }
    `)
  })

  test("search params not defined in the schema's input are excluded from the result", () => {
    const schema = urlSearchParams({ a: string() })
    const value = new URLSearchParams('a=b&c=d')
    expect(schema['~standard'].validate(value)).toMatchInlineSnapshot(`
      {
        "value": {
          "a": "b",
        },
      }
    `)
  })

  test("result value only includes search params defined in the schema's input", () => {
    const schema = urlSearchParams({ a: string() })
    const value = new URLSearchParams('a=b&c=d')
    expect(schema['~standard'].validate(value)).toMatchInlineSnapshot(`
      {
        "value": {
          "a": "b",
        },
      }
    `)
  })

  test('returns "Invalid type" issue when parsing a non-URLSearchParams value', () => {
    const schema = urlSearchParams({ a: string() })
    expect(schema['~standard'].validate(1)).toMatchInlineSnapshot(`
      {
        "issues": [
          {
            "message": "Invalid type",
          },
        ],
      }
    `)
  })

  test('returns an issue with the custom message when parsing a non-URLSearchParams value', () => {
    const schema = urlSearchParams({ a: string() }, 'You gave me the wrong type of value')
    expect(schema['~standard'].validate(1)).toMatchInlineSnapshot(`
      {
        "issues": [
          {
            "message": "You gave me the wrong type of value",
          },
        ],
      }
    `)
  })

  test('returns issues encounted when parsing individual params', () => {
    const schema = urlSearchParams({ a: number() })
    // NOTE: The "123" value is a string, not a number. The `number()` schema expects a number,
    // hence we expect an issue to be returned.
    const value = new URLSearchParams('a=123')
    expect(schema['~standard'].validate(value)).toMatchInlineSnapshot(`
      {
        "issues": [
          {
            "message": "Invalid type",
            "path": [
              "a",
            ],
          },
        ],
      }
    `)
  })
})
