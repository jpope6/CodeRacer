export const dfs = {
    "link": "https://www.geeksforgeeks.org/dfs-traversal-of-a-tree-using-recursion/",
    "Python": [
        "def dfs(graph, node, visited=None):\n",
        "    if visited is None:\n",
        "        visited = set()\n",
        "    visited.add(node)\n",
        "    for neighbor in graph[node]:\n",
        "        if neighbor not in visited:\n",
        "            dfs(graph, neighbor, visited)"
    ],
    "Java": [
        "void DFS(int v) {\n",
        "    boolean visited[] = new boolean[V];\n",
        "    Stack<Integer> stack = new Stack<>();\n",
        "    visited[v] = true;\n",
        "    stack.push(v);\n",
        "    while (!stack.isEmpty()) {\n",
        "        int node = stack.pop();\n",
        "        for (int neighbor : adj[node]) {\n",
        "            if (!visited[neighbor]) {\n",
        "                visited[neighbor] = true;\n",
        "                stack.push(neighbor);\n",
        "            }\n",
        "        }\n",
        "    }\n",
        "}"
    ],
    "C++": [
        "void DFS(int v) {\n",
        "    vector<bool> visited(V, false);\n",
        "    stack<int> s;\n",
        "    visited[v] = true;\n",
        "    s.push(v);\n",
        "    while (!s.empty()) {\n",
        "        int node = s.top();\n",
        "        s.pop();\n",
        "        for (auto neighbor : adj[node]) {\n",
        "            if (!visited[neighbor]) {\n",
        "                visited[neighbor] = true;\n",
        "                s.push(neighbor);\n",
        "            }\n",
        "        }\n",
        "    }\n",
        "}"
    ],
    "JavaScript": [
        "function DFS(graph, node, visited = new Set()) {\n",
        "    visited.add(node);\n",
        "    for (const neighbor of graph[node]) {\n",
        "        if (!visited.has(neighbor)) {\n",
        "            DFS(graph, neighbor, visited);\n",
        "        }\n",
        "    }\n",
        "}"
    ],
}

