export const insertionSort = {
    "link": "https://www.geeksforgeeks.org/insertion-sort/",
    "Python": [
        "def insertion_sort(arr):\n",
        "    for i in range(1, len(arr)):\n",
        "        key = arr[i]\n",
        "        j = i - 1\n",
        "        while j >= 0 and key < arr[j]:\n",
        "            arr[j + 1] = arr[j]\n",
        "            j -= 1\n",
        "        arr[j + 1] = key"
    ],
    "Java": [
        "void insertionSort(int arr[]) {\n",
        "    int n = arr.length;\n",
        "    for (int i = 1; i < n; ++i) {\n",
        "        int key = arr[i];\n",
        "        int j = i - 1;\n",
        "        while (j >= 0 && arr[j] > key) {\n",
        "            arr[j + 1] = arr[j];\n",
        "            j = j - 1;\n",
        "        }\n",
        "        arr[j + 1] = key;\n",
        "    }\n",
        "}"
    ],
    "C++": [
        "void insertionSort(int arr[], int n) {\n",
        "    for (int i = 1; i < n; i++) {\n",
        "        int key = arr[i];\n",
        "        int j = i - 1;\n",
        "        while (j >= 0 && arr[j] > key) {\n",
        "            arr[j + 1] = arr[j];\n",
        "            j = j - 1;\n",
        "        }\n",
        "        arr[j + 1] = key;\n",
        "    }\n",
        "}"
    ],
    "JavaScript": [
        "function insertionSort(arr) {\n",
        "    for (let i = 1; i < arr.length; i++) {\n",
        "        const key = arr[i];\n",
        "        let j = i - 1;\n",
        "        while (j >= 0 && arr[j] > key) {\n",
        "            arr[j + 1] = arr[j];\n",
        "            j = j - 1;\n",
        "        }\n",
        "        arr[j + 1] = key;\n",
        "    }\n",
        "}"
    ],
}

