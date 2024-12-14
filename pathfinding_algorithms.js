class MinPriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(priority, value) {
        let enqueued = false;
        for (let i = 0; i < this.queue.length; i++) {
            let ithPriority = this.queue[i][0];
            if (ithPriority > priority) {
                this.queue.splice(i, 0, [priority, value]);
                enqueued = true;
                break;
            }
        }
        if (!enqueued) {
            this.queue.push([priority, value]);
        }
    }

    dequeue() {
        return this.queue.shift();
    }

    size() {
        return this.queue.length;
    }
}

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

// Dijkstra's algorithm
async function dijkstra(source, goal, neighbors, callback) {
    let distance = {};
    let predecessor = {};
    let visited = {};
    let queue = new MinPriorityQueue();

    distance[source] = 0;
    queue.enqueue(distance[source], source);

    while (queue.size() > 0) {
        let [_, u] = queue.dequeue();
        visited[u] = true;
        await callback(u);

        if (u == goal) {
            return predecessor;
        }

        for (let v of await neighbors(u)) {
            let old_distance = distance[v];
            if (!old_distance || old_distance > distance[u] + 1) {
                distance[v] = distance[u] + 1;
                predecessor[v] = u;
                if (!old_distance || distance[v] < old_distance) {
                    queue.enqueue(distance[v], v);
                }
            }
        }
    }

    throw new Error("No path found.");
}

// A* search algorithm
async function AStar(source, goal, neighbors, callback) {
    function heuristic(current, goal) {
        let [currentRow, currentCol] = current.split("-");
        let [goalRow, goalCol] = goal.split("-");
        return Math.abs(currentRow - goalRow) + Math.abs(currentCol - goalCol);
    }

    let g_score = {};
    let f_score = {};
    let visited = {};
    let predecessor = {};
    let queue = new MinPriorityQueue();
    let inQueue = new Set();

    g_score[source] = 0;
    f_score[source] = heuristic(source, goal);
    queue.enqueue(f_score[source], source);
    inQueue.add(source);

    while (queue.size() > 0) {
        let [_, u] = queue.dequeue();
        visited[u] = true;
        inQueue.add(u);
        await callback(u);

        if (u == goal) {
            return predecessor;
        }

        for (let v of await neighbors(u)) {
            if (!visited[v]) {
                let tentative_g_score = g_score[u] + 1;
                if (!g_score[v] || tentative_g_score < g_score[v]) {
                    predecessor[v] = u;
                    g_score[v] = tentative_g_score;
                    f_score[v] = tentative_g_score + heuristic(v, goal);

                    if (!inQueue.has(v)) {
                        queue.enqueue(f_score[v], v);
                        inQueue.add(v);
                    }
                }
            }
        }
    }

    throw new Error("No path found.");
}

export { BFS, DFS, dijkstra, AStar };
