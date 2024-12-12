// Breadth-first search
async function BFS(source, goal, neighbors, callback) {
    let visited = {};
    let predecessor = {};

    visited[source] = true;
    await callback(source);

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

// Depth-first search
async function DFS(source, goal, neighbors, callback) {
    let visited = {};
    let predecessor = {};
    let found = false;

    visited[source] = true;
    await callback(source);

    async function visit(u) {
        visited[u] = true;
        await callback(u);

        if (u == goal) {
            found = true;
            return;
        }

        for (let v of await neighbors(u)) {
            if (!visited[v]) {
                predecessor[v] = u;
                await visit(v);
                if (found) {
                    return;
                }
            }
        }
    }

    await visit(source);

    if (found) {
        return predecessor;
    } else {
        throw new Error("No path found.");
    }
}

export { BFS, DFS };
