export const bubbleSort = {
    "link": "https://www.geeksforgeeks.org/bubble-sort/",
    "Python": [
        "def bubble_sort(arr):\n",
        "    n = len(arr)\n",
        "    for i in range(n):\n",
        "        for j in range(0, n - i - 1):\n",
        "            if arr[j] > arr[j + 1]:\n",
        "                arr[j], arr[j + 1] = arr[j + 1], arr[j]"
    ],
    "Java": [
        "void bubbleSort(int arr[]) {\n",
        "    int n = arr.length;\n",
        "    for (int i = 0; i < n - 1; i++)\n",
        "        for (int j = 0; j < n - 1 - i; j++)\n",
        "            if (arr[j] > arr[j + 1]) {\n",
        "                int temp = arr[j];\n",
        "                arr[j] = arr[j + 1];\n",
        "                arr[j + 1] = temp;\n",
        "            }\n",
        "}"
    ],
    "C++": [
        "void bubbleSort(int arr[], int n) {\n",
        "    for (int i = 0; i < n - 1; i++)\n",
        "        for (int j = 0; j < n - 1 - i; j++)\n",
        "            if (arr[j] > arr[j + 1])\n",
        "                swap(arr[j], arr[j + 1]);\n",
        "}"
    ],
    "JavaScript": [
        "function bubbleSort(arr) {\n",
        "    const n = arr.length;\n",
        "    for (let i = 0; i < n; i++) {\n",
        "        for (let j = 0; j < n - i - 1; j++) {\n",
        "            if (arr[j] > arr[j + 1]) {\n",
        "                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n",
        "            }\n",
        "        }\n",
        "    }\n",
        "}"
    ],
}

