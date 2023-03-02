import { TscWatchClient } from 'tsc-watch'
import { replaceTscAliasPaths } from 'tsc-alias'

const watch = new TscWatchClient()

watch.on('success', () => {
  console.log('Compilation succeeded')
  replaceTscAliasPaths()
})

watch.on('compile_errors', () => {
  console.error('Compilation failed')
})

try {
  watch.start(
    '--onFirstSuccess',
    'node --experimental-specifier-resolution=node --watch lib/index.js',
    '--noClear',
    '--project',
    './tsconfig.json',
  )
} catch (e) {
  console.error(e)
  watch.kill()
}
