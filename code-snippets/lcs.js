export const longestCommonSubsequence = {
    "link": "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/",
    "Python": [
        "def lcs(X, Y, m, n):\n",
        "    if m == 0 or n == 0:\n",
        "        return 0\n",
        "    elif X[m - 1] == Y[n - 1]:\n",
        "        return 1 + lcs(X, Y, m - 1, n - 1)\n",
        "    else:\n",
        "        return max(lcs(X, Y, m, n - 1), lcs(X, Y, m - 1, n))"
    ],
    "Java": [
        "int lcs(char[] X, char[] Y, int m, int n) {\n",
        "    if (m == 0 || n == 0)\n",
        "        return 0;\n",
        "    if (X[m - 1] == Y[n - 1])\n",
        "        return 1 + lcs(X, Y, m - 1, n - 1);\n",
        "    else\n",
        "        return Math.max(lcs(X, Y, m, n - 1), lcs(X, Y, m - 1, n));\n",
        "}"
    ],
    "JavaScript": [
        "function lcs(X, Y, m, n) {\n",
        "    if (m === 0 || n === 0) {\n",
        "        return 0;\n",
        "    } else if (X[m - 1] === Y[n - 1]) {\n",
        "        return 1 + lcs(X, Y, m - 1, n - 1);\n",
        "    } else {\n",
        "        return Math.max(lcs(X, Y, m, n - 1), lcs(X, Y, m - 1, n));\n",
        "    }\n",
        "}"
    ],
    "C++": [
        "int lcs(char *X, char *Y, int m, int n) {\n",
        "    if (m == 0 || n == 0)\n",
        "        return 0;\n",
        "    if (X[m - 1] == Y[n - 1])\n",
        "        return 1 + lcs(X, Y, m - 1, n - 1);\n",
        "    else\n",
        "        return std::max(lcs(X, Y, m, n - 1), lcs(X, Y, m - 1, n));\n",
        "}"
    ]
}

