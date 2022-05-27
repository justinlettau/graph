import { CycleError } from '../errors/cycle-error';
import { Graph } from '../graph';
import { topologicalSort } from './topological-sort';

export function isAcyclic(graph: Graph) {
  try {
    topologicalSort(graph);
  } catch (error) {
    if (error instanceof CycleError) {
      return false;
    }

    throw error;
  }

  return true;
}
