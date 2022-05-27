import { Graph } from '../graph';

interface Entry {
  isOnStack: boolean;
  low: number;
  index: number;
}

export function tarjan(graph: Graph) {
  const visited: Record<string, Entry> = {};
  const stack: string[] = [];
  const results: string[][] = [];
  let index = 0;

  function dfs(nodeId: string) {
    const entry = (visited[nodeId] = {
      isOnStack: true,
      low: index,
      index: index++,
    });

    stack.push(nodeId);

    const edges = graph.getEdges(nodeId);

    for (const { targetId } of edges) {
      if (!visited[targetId]) {
        dfs(targetId);
      }

      if (entry.isOnStack) {
        entry.low = Math.min(entry.low, visited[targetId].low);
      }
    }

    if (entry.low === entry.index) {
      const component: string[] = [];
      let id: string | undefined;

      while (id !== nodeId) {
        id = stack.pop() as string;
        visited[id].isOnStack = false;
        component.push(id);
      }

      results.push(component);
    }
  }

  for (const nodeId of graph.getNodes()) {
    if (!visited[nodeId]) {
      dfs(nodeId);
    }
  }

  return results;
}
