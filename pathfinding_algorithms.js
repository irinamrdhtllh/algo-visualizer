// Breadth-first search
async function BFS(source, goal, neighbors, callback) {
    let visited = {};
    let predecessor = {};

    visited[source] = true
    
    let queue = [];
    queue.push(source);

    while (queue.length > 0) {
        let u = queue.shift();
        
        if (u == goal) {
            return predecessor;
        }
        
        for (let v of await neighbors(u)) {
            if (!visited[v]) {
                visited[v] = true;
                await callback(v);
                predecessor[v] = u;
                queue.push(v);
            }
        }
    }
    
    throw new Error("No path found.");
    
}

export { BFS };