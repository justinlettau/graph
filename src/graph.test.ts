import { EdgeAlreadyExistError } from './errors/edge-already-exists';
import { NodeAlreadyExistError } from './errors/node-already-exists';
import { Graph } from './graph';

describe('Graph', () => {
  describe('constructor', () => {
    test('initializes empty graph', () => {
      const graph = new Graph();

      expect(graph.getNodes()).toEqual([]);
    });
  });

  describe('getNodes', () => {
    test('returns empty array when graph is empty', () => {
      const graph = new Graph();

      const result = graph.getNodes();
      expect(result).toEqual([]);
    });

    test('returns all node ids', () => {
      const graph = new Graph();
      graph.addNode('a');
      graph.addNode('b');
      graph.addNode('c');

      const result = graph.getNodes();
      expect(result).toEqual(['a', 'b', 'c']);
    });
  });

  describe('hasNode', () => {
    test('return false is node does not exist', () => {
      const graph = new Graph();
      graph.addNode('a');

      const result = graph.hasNode('z');
      expect(result).toBe(false);
    });

    test('return true is node exists', () => {
      const graph = new Graph();
      graph.addNode('a');

      const result = graph.hasNode('a');
      expect(result).toBe(true);
    });
  });

  describe('getNodeAttributes', () => {
    test('returns null if node does not exist', () => {
      const graph = new Graph();
      graph.addNode('a');

      const result = graph.getNodeAttributes('z');
      expect(result).toBeNull();
    });

    test('returns null if node has no attributes', () => {
      const graph = new Graph();
      graph.addNode('a');

      const result = graph.getNodeAttributes('a');
      expect(result).toBeNull();
    });

    test('returns attributes', () => {
      const graph = new Graph();
      graph.addNode('a', { hello: 'world' });

      const result = graph.getNodeAttributes('a');
      expect(result).toEqual({ hello: 'world' });
    });
  });

  describe('addNode', () => {
    test('adds node when node does not exist', () => {
      const graph = new Graph();
      graph.addNode('a');
      graph.addNode('b');
      graph.addNode('c');

      const result = graph.getNodes();
      expect(result.length).toBe(3);
    });

    test('throws NodeAlreadyExistError when node already exits', () => {
      const graph = new Graph();
      graph.addNode('a');

      expect(() => graph.addNode('a')).toThrowError(NodeAlreadyExistError);
    });
  });

  describe('removeNode', () => {
    test('removes the node', () => {
      const graph = new Graph();
      graph.addNode('a');
      graph.addNode('b');
      graph.removeNode('a');

      const result = graph.getNodes();
      expect(result).toEqual(['b']);
    });

    test('does nothing if node does not exist', () => {
      const graph = new Graph();
      graph.addNode('a');
      graph.addNode('b');
      graph.removeNode('z');

      const result = graph.getNodes();
      expect(result).toEqual(['a', 'b']);
    });
  });

  describe('hasEdge', () => {
    test('returns true if edge exists', () => {
      const graph = new Graph();
      graph.addEdge('a', 'b');

      const result = graph.hasEdge('a', 'b');
      expect(result).toBe(true);
    });

    test('returns false if edge does not exist', () => {
      const graph = new Graph();
      graph.addEdge('a', 'b');

      const result = graph.hasEdge('a', 'z');
      expect(result).toBe(false);
    });
  });

  describe('getEdges', () => {
    test('returns all edges for a node', () => {
      const graph = new Graph();
      graph.addEdge('a', 'b');
      graph.addEdge('a', 'c');
      graph.addEdge('b', 'c');

      const result = graph.getEdges('a');
      expect(result.length).toEqual(2);
    });

    test('returns empty array if node does not exist', () => {
      const graph = new Graph();
      graph.addEdge('a', 'b');

      const result = graph.getEdges('z');
      expect(result).toEqual([]);
    });
  });

  describe('addEdge', () => {
    test('adds edges/nodes when nodes not exist', () => {
      const graph = new Graph();
      graph.addEdge('a', 'b');
      graph.addEdge('b', 'c');
      graph.addEdge('a', 'c');

      const nodes = graph.getNodes();
      const edgesA = graph.getEdges('a');
      const edgesB = graph.getEdges('b');
      const edgesC = graph.getEdges('c');

      expect(nodes.length).toBe(3);
      expect(edgesA.length).toBe(2);
      expect(edgesB.length).toBe(1);
      expect(edgesC.length).toBe(0);
    });

    test('throws EdgeAlreadyExistError when node already exits', () => {
      const graph = new Graph();
      graph.addEdge('a', 'b');

      expect(() => graph.addEdge('a', 'b')).toThrowError(EdgeAlreadyExistError);
    });
  });

  describe('removeEdge', () => {
    test('removes the edge', () => {
      const graph = new Graph();
      graph.addEdge('a', 'b');
      graph.addEdge('b', 'c');
      graph.removeEdge('a', 'b');

      const result = graph.hasEdge('a', 'b');
      expect(result).toBe(false);
    });

    test('does nothing if edge does not exist', () => {
      const graph = new Graph();
      graph.addEdge('a', 'b');
      graph.removeEdge('a', 'z');

      const result = graph.hasEdge('a', 'b');
      expect(result).toBe(true);
    });
  });
});
