let code = document.getElementById("text-to-type");

const code1 = {
    "Python": "hashset = set()\n"
        + "for n in nums:\n"
        + "    if n in hashset:\n"
        + "        return True\n"
        + "    hashset.add(n)\n"
        + "return False",
    "Java": "Set<Integer> uniques = new HashSet<>();\n"
        + "for (int i = 0; i < nums.length; i++) {\n"
        + "    if (uniques.contains(nums[i])) {\n"
        + "        return true;\n"
        + "    }\n"
        + "    uniques.add(nums[i]);\n"
        + "}\n"
        + "return false;\n"
}

const binary_search = {
    "Python": "def binary_search(arr, target):\n"
        + "    left = 0\n"
        + "    right = len(arr) - 1\n"
        + "    while left <= right:\n"
        + "        mid = (left + right) // 2\n"
        + "        if arr[mid] == target:\n"
        + "            return mid\n"
        + "        elif arr[mid] < target:\n"
        + "            left = mid + 1\n"
        + "        else:\n"
        + "            right = mid - 1\n"
        + "    return -1",
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
        + "}"
}

const code_list = [binary_search, code1]
let cur_language = "Python"
let random_index = Math.floor(Math.random() * code_list.length);
code.innerHTML = code_list[random_index][cur_language];

function changeLanguage(language) {
    cur_language = language;
    code.innerHTML = code_list[random_index][cur_language];
}



