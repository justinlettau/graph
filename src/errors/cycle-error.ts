export class CycleError extends Error {
  constructor() {
    super('Cycle detected in the graph');
  }
}
