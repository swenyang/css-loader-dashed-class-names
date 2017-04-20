const path = require('path')
const loaderUtils = require('loader-utils')

function toDashed(str) {
    return str.replace(/([A-Z])/g, (match, nondigits, offset, string) =>
        (offset === 0 ? match[0].toLowerCase() : `-${match[0].toLowerCase()}`))
}

function dashedCssClassName(loaderContext, localIdentName, localName, options) {
    const op = options
    if (!op.context) {
        op.context = loaderContext.options
            && typeof loaderContext.options.context === 'string' ?
            loaderContext.options.context : loaderContext.context
    }
    const request = path.relative(options.context, loaderContext.resourcePath)
    op.content = `${op.hashPrefix}${request}+${localName}`

    const local = toDashed(localName)
    const name = toDashed(loaderUtils.interpolateName(loaderContext, '[name]', options))
    let ret = localIdentName.replace(/\[local\]/gi, local)
    ret = ret.replace(/\[name\]/gi, name)
    ret = loaderUtils.interpolateName(loaderContext, ret, options)
    return ret.replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-').replace(/^((-?[0-9])|--)/, '_$1')
}

module.exports = {
    dashedCssClassName,
}
