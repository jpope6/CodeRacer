
export const binary_search = {
    "Python": ["def binary_search(arr, target):\n",
        "    left = 0\n",
        "    right = len(arr) - 1\n",
        "    while left <= right:\n",
        "        mid = (left + right) // 2\n",
        "        if arr[mid] == target:\n",
        "            return mid\n",
        "        elif arr[mid] < target:\n",
        "            left = mid + 1\n",
        "        else:\n",
        "            right = mid - 1\n",
        "    return -1"],
    "Java": "public int binarySearch(int[] arr, int target) {\n"
        + "    int left = 0;\n"
        + "    int right = arr.length - 1;\n"
        + "    while (left <= right) {\n"
        + "        int mid = (left + right) / 2;\n"
        + "        if (arr[mid] == target) {\n"
        + "            return mid;\n"
        + "        } else if (arr[mid] < target) {\n"
        + "            left = mid + 1;\n"
        + "        } else {\n"
        + "            right = mid - 1;\n"
        + "        }\n"
        + "    }\n"
        + "    return -1;\n"
        + "}",
    "C++": "int binarySearch(int arr[], int target) {\n"
        + "    int left = 0;\n"
        + "    int right = arr.length - 1;\n"
        + "    while (left <= right) {\n"
        + "        int mid = (left + right) / 2;\n"
        + "        if (arr[mid] == target) {\n"
        + "            return mid;\n"
        + "        } else if (arr[mid] < target) {\n"
        + "            left = mid + 1;\n"
        + "        } else {\n"
        + "            right = mid - 1;\n"
        + "        }\n"
        + "    }\n"
        + "    return -1;\n"
        + "}",
    "JavaScript": "function binarySearch(arr, target) {\n"
        + "    let left = 0;\n"
        + "    let right = arr.length - 1;\n"
        + "    while (left <= right) {\n"
        + "        let mid = Math.floor((left + right) / 2);\n"
        + "        if (arr[mid] == target) {\n"
        + "            return mid;\n"
        + "        } else if (arr[mid] < target) {\n"
        + "            left = mid + 1;\n"
        + "        } else {\n"
        + "            right = mid - 1;\n"
        + "        }\n"
        + "    }\n"
        + "    return -1;\n"
        + "}",
}
