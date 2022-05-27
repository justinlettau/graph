import { Graph } from '../graph';
import { tarjan } from './tarjan';

export function findCycles(graph: Graph) {
  const components = tarjan(graph);
  return components.filter((x) => x.length > 1 || graph.hasEdge(x[0], x[0]));
}
