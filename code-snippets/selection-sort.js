export const selectionSort = {
    "link": "https://www.geeksforgeeks.org/selection-sort/",
    "Python": [
        "def selection_sort(arr):\n",
        "    for i in range(len(arr)):\n",
        "        min_idx = i\n",
        "        for j in range(i + 1, len(arr)):\n",
        "            if arr[j] < arr[min_idx]:\n",
        "                min_idx = j\n",
        "        arr[i], arr[min_idx] = arr[min_idx], arr[i]"
    ],
    "Java": [
        "void selectionSort(int arr[]) {\n",
        "    int n = arr.length;\n",
        "    for (int i = 0; i < n - 1; i++) {\n",
        "        int min_idx = i;\n",
        "        for (int j = i + 1; j < n; j++)\n",
        "            if (arr[j] < arr[min_idx])\n",
        "                min_idx = j;\n",
        "        int temp = arr[min_idx];\n",
        "        arr[min_idx] = arr[i];\n",
        "        arr[i] = temp;\n",
        "    }\n",
        "}"
    ],
    "C++": [
        "void selectionSort(int arr[], int n) {\n",
        "    for (int i = 0; i < n - 1; i++) {\n",
        "        int min_idx = i;\n",
        "        for (int j = i + 1; j < n; j++)\n",
        "            if (arr[j] < arr[min_idx])\n",
        "                min_idx = j;\n",
        "        swap(arr[min_idx], arr[i]);\n",
        "    }\n",
        "}"
    ],
    "JavaScript": [
        "function selectionSort(arr) {\n",
        "    for (let i = 0; i < arr.length; i++) {\n",
        "        let min_idx = i;\n",
        "        for (let j = i + 1; j < arr.length; j++) {\n",
        "            if (arr[j] < arr[min_idx]) {\n",
        "                min_idx = j;\n",
        "            }\n",
        "        }\n",
        "        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];\n",
        "    }\n",
        "}"
    ],
}

