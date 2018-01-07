import log      from './log.js'
import rAF      from './rAF.js'

export default Node

const Node = {
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
    attrs: { remove },
    output,
  }) => (
      log(key, 'view (start)'),

      output = m(
        '[style=border: 1px solid; padding: .5em; margin: .5em]',

        'Node ', key,

        ' ',

        remove && m('button', {
          innerHTML: 'x',
          onclick  : remove,
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
          onclick  : () =>
            children.push(key + '.' + (children.length + 1))
        }),
      ),

      log(key, 'view (end)'),

      output
    )
}
