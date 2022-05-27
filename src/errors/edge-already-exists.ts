export class EdgeAlreadyExistError extends Error {
  constructor() {
    super('Edge already exists in the graph');
  }
}
