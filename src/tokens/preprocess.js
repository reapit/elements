import path from 'node:path'
import url from 'node:url'
import fs from 'node:fs/promises'
import util from 'node:util'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Recursively sort object keys alphabetically
 * @param {Object} obj - The object to sort
 * @returns {Object} - A new object with sorted keys
 */
function sortObjectKeys(obj) {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj
  }

  return Object.fromEntries(
    Object.keys(obj)
      .sort()
      .map((key) => [key, sortObjectKeys(obj[key])]),
  )
}

/**
 * Sort keys in a JSON file alphabetically
 * @param {string} filePath - Path to the JSON file to sort
 */
async function sortJsonFile(filePath) {
  try {
    // Read and parse the JSON file
    const jsonContent = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(jsonContent)

    // Sort the keys
    const sortedData = sortObjectKeys(data)

    // Write the sorted data back to the file
    const output = JSON.stringify(sortedData, null, 2) + '\n'
    await fs.writeFile(filePath, output)

    console.log(util.styleText(['green', 'bold'], `✔︎ ${path.basename(filePath)}`))
  } catch (error) {
    throw new Error(`Error pre-processing ${filePath}:`, { cause: error })
  }
}

async function main() {
  try {
    const allFiles = await fs.readdir(__dirname)
    const tokenFiles = allFiles.filter((file) => file.endsWith('.tokens.json'))

    console.log('pre-processing')

    if (tokenFiles.length === 0) {
      console.log(util.styleText(['blue', 'bold'], '🤔 No token files found to preprocess.'))
      return
    }

    const processingPromises = tokenFiles.map((fileName) => {
      const filePath = path.join(__dirname, fileName)
      return sortJsonFile(filePath)
    })

    await Promise.all(processingPromises)
  } catch (error) {
    console.error(util.styleText(['red', 'bold'], '❌ Pre-processing failed', error))
    process.exit(1)
  }
}

main()
