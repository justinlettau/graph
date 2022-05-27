import { Graph } from '../graph';
import { findCycles } from './find-cycles';

describe('findCycles', () => {
  test('returns empty array for empty graph', () => {
    const graph = new Graph();

    const result = findCycles(graph);
    expect(result).toEqual([]);
  });

  test('returns empty array if no cycles', () => {
    const graph = new Graph();
    graph.addEdge('a', 'b');
    graph.addEdge('b', 'c');
    graph.addEdge('c', 'd');

    const result = findCycles(graph);
    expect(result).toEqual([]);
  });

  test('returns a result for each cycle found', () => {
    const graph = new Graph();
    graph.addEdge('a', 'b');
    graph.addEdge('b', 'c');
    graph.addEdge('c', 'a');
    graph.addEdge('c', 'd');
    graph.addEdge('e', 'e');

    const result = findCycles(graph);
    expect(result).toEqual([['c', 'b', 'a'], ['e']]);
  });
});
