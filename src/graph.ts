import { EdgeAlreadyExistError } from './errors/edge-already-exists';
import { NodeAlreadyExistError } from './errors/node-already-exists';

interface Edge {
  sourceId: string;
  targetId: string;
  attributes: EdgeAttributes | null;
}

export type NodeAttributes = Record<string, unknown>;
export type EdgeAttributes = Record<string, unknown>;

export class Graph {
  private nodes = new Map<string, NodeAttributes | null>();
  private adjacencies = new Map<string, Omit<Edge, 'sourceId'>[]>();
  private edges = new Map<string, Edge>();

  /**
   * Get the ids of all nodes in the graph.
   */
  getNodes() {
    return [...this.nodes.keys()];
  }

  /**
   * Checks if the graph has a node.
   */
  hasNode(nodeId: string) {
    return this.nodes.has(nodeId);
  }

  /**
   * Get the attributes associated to `nodeId`.
   */
  getNodeAttributes(nodeId: string) {
    return this.nodes.get(nodeId) ?? null;
  }

  /**
   * Add a node to the graph.
   * Throws an error if `nodeId` already exists in the graph.
   */
  addNode(nodeId: string, attributes: NodeAttributes | null = null) {
    if (this.hasNode(nodeId)) {
      throw new NodeAlreadyExistError();
    }

    this.nodes.set(nodeId, attributes);
  }

  /**
   * Remove a node form the graph.
   */
  removeNode(nodeId: string) {
    this.nodes.delete(nodeId);
    this.adjacencies.delete(nodeId);
  }

  /**
   * Check if the graph has an edge between `sourceId` and `targetId`.
   */
  hasEdge(sourceId: string, targetId: string) {
    const edgeId = this.makeEdgeId(sourceId, targetId);
    return this.edges.has(edgeId);
  }

  /**
   * Get all edges for a node.
   */
  getEdges(sourceId: string) {
    return this.adjacencies.get(sourceId) ?? [];
  }

  /**
   * Add an edge between `sourceId` and `targetId`.
   * Throws error if the edge already exists in the graph.
   */
  addEdge(
    sourceId: string,
    targetId: string,
    attributes: EdgeAttributes | null = null
  ) {
    const edgeId = this.makeEdgeId(sourceId, targetId);

    if (this.edges.has(edgeId)) {
      throw new EdgeAlreadyExistError();
    }

    if (!this.hasNode(sourceId)) {
      this.addNode(sourceId);
    }

    if (!this.hasNode(targetId)) {
      this.addNode(targetId);
    }

    this.edges.set(edgeId, { sourceId, targetId, attributes });

    const edges = this.adjacencies.get(sourceId) ?? [];
    edges.push({ targetId, attributes });

    this.adjacencies.set(sourceId, edges);
  }

  /**
   * Remove an edge from the graph.
   */
  removeEdge(sourceId: string, targetId: string) {
    const edgeId = this.makeEdgeId(sourceId, targetId);
    this.edges.delete(edgeId);

    const edges = this.adjacencies.get(sourceId);

    if (edges) {
      const value = edges.filter((x) => x.targetId !== targetId);
      this.adjacencies.set(sourceId, value);
    }
  }

  private makeEdgeId(sourceId: string, targetId: string) {
    return `${sourceId}_${targetId}`;
  }
}
