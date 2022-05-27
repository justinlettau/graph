export class NodeAlreadyExistError extends Error {
  constructor() {
    super('Node already exists in the graph');
  }
}
