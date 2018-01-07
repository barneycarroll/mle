import log      from './log.js'
import rAF      from './rAF.js'
import {update} from './index.js'

export default {
  ...[
    {},
    'onbeforeupdate',
    'onupdate',
    'onbeforeremove',
    'onremove',
  ].reduce((node, method) => ({
    ...node,
    [method]({ key }) {
      log(key, method)
    }
  })),

  oninit({ key }) {
    log(key, 'oninit')

    this.children = []
  },

  async oncreate({ key, dom }) {
    log(key, 'oncreate')

    await rAF()

    dom.scrollIntoView({
      behavior: 'smooth',
    })
  },

  view: ({
    key,
    state: { children },
    attrs: { remove, ...attrs },
    output,
  }) => (
      log(key, 'view (start)'),

      output = m(
        'div[style=border: 1px solid; padding: .5em; margin: .5em]',

        'Node ', key,

        ' ',

        remove && m('button', {
          innerHTML: 'x',
          onclick  : () => (
            update = true,
            remove
          ),
        }),

        m('hr'),

        children.map((key, i) =>
          m(Node, {
            key, 
            remove : () =>
              children.splice(i, 1),
          })
        ),

        m('button', {
          innerHTML: '+',
          onclick  : () => (
            update = true,
            children.push(key + '.' + (children.length + 1))
          )
        }),
      ),

      log(key, 'view (end)'),

      output
    )
}
