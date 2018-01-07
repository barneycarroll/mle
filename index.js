import Node        from './Node.js'
import {log, logs} from './log.js'
import rAF         from './rAF.js'

var filter  = '';
var columns = true;
var update  = true;

m.mount(document.documentElement, {
  view    : () =>
    m('body', {
      style: `
        box-sizing: border-box;
        display:    flex;
        font:       .8em sans-serif;
        position:   fixed;
        width:      100%;
        height:     100%;
        margin:     0;
        padding:    .5em;
        top:        0;
        left:       0;
        overflow:   hidden;
        flex-direction: ${
          columns 
          ? 'column'
          : 'row'
        };
      `,
    },
      m('[style=flex: 0 1 50%; overflow-y: auto;]', {
        onbeforeupdate:  () => 
          update,

        async onupdate(){
          update = false

          await rAF()

          m.redraw()
        },

        onclick:         () => 
          update = true,
      },
        m(Node, {
          key: '1'
        }),
      ),

      m('[style=display: flex; flex: 1 1 50%; flex-direction: column]',
        m('label', {
          style: `
              display: flex; 
              padding: .5em;
              background: lightgrey;
            `,
          title: `
              eg. ' 1\.2 ' will only show logs relating to node 1.2, 
              'onremove' will only show those logs, etc
            `.replace(/(\s)+/g, '$1'),
        },
          m('span', 'Log filter (RegExp):'),

          m.trust('&nbsp;'),

          m('input[style=flex: 1 1 0]', {
            value: filter,
            oninput: e =>
              filter = e.target.value,
          }),
        ),

        m('pre', {
          style: `
            flex:       1 1 100%;
            overflow-y: auto;
            margin:     0;
            background: black;
            color:      white;
          `,
        },
          m('table',
            logs
              .map(([time, ...entries]) =>
                m('tr', {
                  style: {
                    display: filter && (entries.find(entry => (
                      new RegExp(filter.replace(/\\/g, '\\')).test(entry)
                    )) ? 'block' : 'none')
                  },

                  async oncreate({ dom }) {
                    await rAF()

                    dom.scrollIntoView({
                      behavior: 'smooth',
                      block:    'end',
                    })
                  }
                },
                  m('th[style=transition: 1.5s ease-out]', {
                    async oncreate({ dom }) {
                      dom.style.color = 'red'

                      await rAF()

                      dom.style.color = 'grey'
                    }
                  },
                    time,

                    ' '
                  ),
                  
                  entries.map(entry => 
                    m('td', entry, ' ')
                  ),
                ),
            ),
          ),
        ),

        m('[style=display: flex; padding: .5em; background: lightgrey;]',
          m('button', {
            innerHTML: 'clear',
            onclick  : () =>
              logs.splice(0, Infinity),
          }),

          m('button', {
            innerHTML: 'break',
            onclick  : () =>
              log('', '***'),
          }),

          m('button', {
            innerHTML: 'orientation',
            onclick  : () =>
              columns = !columns,
          }),

          m('button', {
            innerHTML: 'noop redraw',
            onclick  : () =>
              update = true,
          })
        ),
      ),
    ),
})