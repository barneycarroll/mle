export const logs = [['']]

export const log  = (...stuff) => {
  logs.push([Date.now(), ...stuff])
}

export default log