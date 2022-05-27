import { CycleError } from '../errors/cycle-error';
import { Graph } from '../graph';

export function topologicalSort(graph: Graph) {
  const visited = new Set<string>();
  const stack = new Set<string>();
  const result: string[] = [];

  function dfs(nodeId: string) {
    if (stack.has(nodeId)) {
      throw new CycleError();
    }

    if (visited.has(nodeId)) {
      return;
    }

    const edges = graph.getEdges(nodeId);
    visited.add(nodeId);
    stack.add(nodeId);

    for (const { targetId } of edges) {
      dfs(targetId);
    }

    stack.delete(nodeId);
    result.unshift(nodeId);
  }

  for (const nodeId of graph.getNodes()) {
    dfs(nodeId);
  }

  return result;
}
