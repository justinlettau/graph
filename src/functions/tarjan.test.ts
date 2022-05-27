import { Graph } from '../graph';
import { tarjan } from './tarjan';

describe('tarjan', () => {
  test('returns empty array for empty graph', () => {
    const graph = new Graph();

    const result = tarjan(graph);
    expect(result).toEqual([]);
  });

  test('returns strongly connected components', () => {
    const graph = new Graph();
    graph.addEdge('a', 'b');
    graph.addEdge('a', 'e');
    graph.addEdge('b', 'f');
    graph.addEdge('c', 'b');
    graph.addEdge('c', 'd');
    graph.addEdge('c', 'g');
    graph.addEdge('d', 'g');
    graph.addEdge('e', 'a');
    graph.addEdge('e', 'f');
    graph.addEdge('f', 'c');
    graph.addEdge('f', 'g');
    graph.addEdge('g', 'h');
    graph.addEdge('h', 'd');

    const result = tarjan(graph);
    expect(result).toEqual([
      ['h', 'g', 'd'],
      ['c', 'f', 'b'],
      ['e', 'a'],
    ]);
  });
});
