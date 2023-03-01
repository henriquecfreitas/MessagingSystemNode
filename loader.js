export { getFormat, transformSource } from "ts-node/esm"

import { resolve as resolveTs } from "ts-node/esm"
import configPaths from "tsconfig-paths"

const { absoluteBaseUrl, paths } = configPaths.loadConfig()
const matchPath = configPaths.createMatchPath(absoluteBaseUrl, paths)

export function resolve(specifier, context, defaultResolver) {
  const mappedSpecifier = matchPath(specifier)
  if (mappedSpecifier) {
    specifier = `${mappedSpecifier}.js`
  }
  return resolveTs(specifier, context, defaultResolver);
}
