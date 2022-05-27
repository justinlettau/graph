import { Graph } from '../graph';
import { isAcyclic } from './is-acyclic';

describe('isAcyclic', () => {
  test('returns false if there is a cycle', () => {
    const graph = new Graph();
    graph.addEdge('a', 'b');
    graph.addEdge('b', 'c');
    graph.addEdge('c', 'a');

    const result = isAcyclic(graph);
    expect(result).toBe(false);
  });

  test('returns true if there is no cycle', () => {
    const graph = new Graph();
    graph.addEdge('a', 'b');
    graph.addEdge('b', 'c');
    graph.addEdge('c', 'd');

    const result = isAcyclic(graph);
    expect(result).toBe(true);
  });
});
