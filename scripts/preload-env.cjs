/**
 * Preload patch: fixes @next/env ESM/CJS interop issue when running seed
 * outside Next.js context (Node.js v22+ with tsx).
 */
;(async () => {
  const moduleNs = await import('module')
  const Module = moduleNs.default ?? moduleNs
  const originalLoad = Module._load
  Module._load = function (request, parent, isMain) {
    const result = originalLoad.call(this, request, parent, isMain)
    if (request === '@next/env' && result && !result.default) {
      result.default = result
    }
    return result
  }

  const dotenvNs = await import('dotenv')
  const dotenv = dotenvNs.default ?? dotenvNs
  dotenv.config()
})()
