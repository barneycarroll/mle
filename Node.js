import log      from './log.js'
import rAF      from './rAF.js'

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

  oninit({ key, state }) {
    log(key, 'oninit')

    state.subnodes = []
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
    tag,
    state: { subnodes },
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
          onclick: remove,
        }),

        m('hr'),

        subnodes.map((key, i) =>
          m(tag, {
            key,
            remove: () =>
              subnodes.splice(i, 1),
          })
        ),

        m('button', {
          innerHTML: '+',
          onclick: () =>
            subnodes.push(key + '.' + (subnodes.length + 1))
        }),
      ),

      log(key, 'view (end)'),

      output
    )
}