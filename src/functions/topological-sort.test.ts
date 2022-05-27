import { CycleError } from '../errors/cycle-error';
import { Graph } from '../graph';
import { topologicalSort } from './topological-sort';

describe('topologicalSort', () => {
  test('returns empty array for empty graph', () => {
    const graph = new Graph();

    const result = topologicalSort(graph);
    expect(result).toEqual([]);
  });

  test('returns nodes sorted in a valid sequence', () => {
    const graph = new Graph();
    graph.addEdge('h', 'j');
    graph.addEdge('h', 'i');
    graph.addEdge('j', 'm');
    graph.addEdge('j', 'l');
    graph.addEdge('i', 'l');
    graph.addEdge('e', 'a');
    graph.addEdge('a', 'd');
    graph.addEdge('d', 'h');
    graph.addEdge('d', 'g');
    graph.addEdge('g', 'i');
    graph.addEdge('e', 'd');
    graph.addEdge('e', 'f');
    graph.addEdge('f', 'k');
    graph.addEdge('k', 'j');
    graph.addEdge('f', 'j');
    graph.addEdge('c', 'b');
    graph.addEdge('b', 'd');
    graph.addEdge('c', 'a');

    const result = topologicalSort(graph);
    expect(result).toEqual([
      'c',
      'b',
      'e',
      'f',
      'k',
      'a',
      'd',
      'g',
      'h',
      'i',
      'j',
      'l',
      'm',
    ]);
  });

  test('throws CycleError if there is a cycle', () => {
    const graph = new Graph();
    graph.addEdge('a', 'b');
    graph.addEdge('b', 'c');
    graph.addEdge('c', 'a');

    expect(() => topologicalSort(graph)).toThrowError(CycleError);
  });
});
