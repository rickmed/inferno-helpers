'use strict'

const TAG_NAMES = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'u', 'ul', 'video']

let methods = {}

function getClasses (sel) {
    return sel
        .filter( (el) => el.startsWith('.') )
        .map( (el) => el.replace('.', ''))
        .join(' ')
}

function getId (sel) {
    let val = sel.find( (el) => el.startsWith('#') )
    if (val) return val.slice(1)
}

TAG_NAMES.forEach((val) =>
    methods[val] = (...args) => {

        let vNode = { tag: val }

        let selector = args
            .filter( (e) => typeof e === 'string' )
            .map ( (e) => e.trim())
            .find( (e) => /^(\.|#)/.test(e) )

        if (selector) {
            let select = selector.split(/([\.#]?[^\s#.]+)/ )
            var className = getClasses(select)
            var id = getId(select)
        }
        if (className || id ) vNode.attrs = {}
        if (className) vNode.attrs.className = className
        if (id && vNode) vNode.attrs.id = id

        let attrbs = args.find( (e) =>
            Object.prototype.toString.apply(e) === '[object Object]' &&
            !e.hasOwnProperty('tag')
        )
        if (attrbs) Object.assign(vNode.attrs, attrbs)

        let children = args
            .filter( (e) => e !== selector && e !== attrbs )
            .reduce( (a, b) => a.concat(b), [])
        if (children.length > 0) vNode.children = children

        return vNode
    }
)

module.exports = methods
