class Graph<T> {
  // 顶点
  private verteces:T[] = []
  // 边：邻接表
  private adjList: Map<T,T[]> = new Map()

  // 添加顶点
  addVertex(vertex:T) {
    this.verteces.push(vertex)
    this.adjList.set(vertex,[])
  }

  // 添加边
  addEdge(v1:T, v2:T) {
    this.adjList.get(v1)?.push(v2)
    this.adjList.get(v2)?.push(v1)
  }

  // 遍历
  traverse() {
    console.log('Graph:');
    this.verteces.forEach(vertex => {
      const edge = this.adjList.get(vertex)
      console.log(`${vertex} -> ${edge?.join(" ")}`);
    })
  }

  // 图的遍历
  // bfs
  bfs() {
    if(this.verteces.length === 0) return 
    const queue:T[] = []
    queue.push(this.verteces[0])
    const visited = new Set<T>()
    visited.add(this.verteces[0])

    while(queue.length) {
      const vertex = queue.shift()!
      console.log(vertex);

      const neighbors = this.adjList.get(vertex)
      if(!neighbors) continue
      for (const nei of neighbors) {
        if(!visited.has(nei)) {
          visited.add(nei)
          queue.push(nei)
        }
      }
    }
  }

  // dfs
  dfs() {
    if(this.verteces.length === 0 ) return
    const stack:T[] = []
    stack.push(this.verteces[0])
    const visited = new Set<T>()
    visited.add(this.verteces[0])

    while(stack.length) {
      const vertex = stack.pop()!
      console.log(vertex);

      const neighbors = this.adjList.get(vertex)
      if(!neighbors) continue
      for(let i = neighbors.length - 1 ; i >= 0 ; i --) {
        if(!visited.has(neighbors[i])) {
          visited.add(neighbors[i])
          stack.push(neighbors[i])
        }
      }
    }
  }
}