export const heapSort = {
    "link": "https://www.geeksforgeeks.org/heap-sort/",
    "Python": [
        "def heap_sort(arr):\n",
        "    n = len(arr)\n",
        "    for i in range(n - 1, 0, -1):\n",
        "        arr[i], arr[0] = arr[0], arr[i]\n",
        "        heapify(arr, i, 0)"
    ],
    "Java": [
        "void heapSort(int arr[]) {\n",
        "    int n = arr.length;\n",
        "    for (int i = n - 1; i > 0; i--) {\n",
        "        int temp = arr[0];\n",
        "        arr[0] = arr[i];\n",
        "        arr[i] = temp;\n",
        "        heapify(arr, i, 0);\n",
        "    }\n",
        "}"
    ],
    "C++": [
        "void heapSort(int arr[], int n) {\n",
        "    for (int i = n - 1; i > 0; i--) {\n",
        "        swap(arr[0], arr[i]);\n",
        "        heapify(arr, i, 0);\n",
        "    }\n",
        "}"
    ],
    "JavaScript": [
        "function heapSort(arr) {\n",
        "    const n = arr.length;\n",
        "    for (let i = n - 1; i > 0; i--) {\n",
        "        [arr[0], arr[i]] = [arr[i], arr[0]];\n",
        "        heapify(arr, i, 0);\n",
        "    }\n",
        "}"
    ],
}

