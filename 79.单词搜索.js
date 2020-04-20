/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 *
 * https://leetcode-cn.com/problems/word-search/description/
 *
 * algorithms
 * Medium (40.88%)
 * Likes:    344
 * Dislikes: 0
 * Total Accepted:    44.6K
 * Total Submissions: 108.8K
 * Testcase Example:  '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"'
 *
 * 给定一个二维网格和一个单词，找出该单词是否存在于网格中。
 * 
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
 * 
 * 
 * 
 * 示例:
 * 
 * board =
 * [
 * ⁠ ['A','B','C','E'],
 * ⁠ ['S','F','C','S'],
 * ⁠ ['A','D','E','E']
 * ]
 * 
 * 给定 word = "ABCCED", 返回 true
 * 给定 word = "SEE", 返回 true
 * 给定 word = "ABCB", 返回 false
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * board 和 word 中只包含大写和小写英文字母。
 * 1 <= board.length <= 200
 * 1 <= board[i].length <= 200
 * 1 <= word.length <= 10^3
 * 
 * 
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = function(board, word) {
    if (!word || !board || board.length === 0) return false
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (searchWord(board, row, col, word, 0, dirs)) return true
      }
    }
    return false
  }
  
  const searchWord = (board, row, col, word, widx, dirs) => {
    if (widx === word.length) return true
    if (
      row < 0 ||
      col < 0 ||
      row === board.length ||
      col === board[0].length ||
      board[row][col] === null ||
      board[row][col] !== word[widx]
    ) return false
  
    const ch = board[row][col]
    board[row][col] = null // mark visited
  
    for (let dir of dirs) {
      if (searchWord(board, row + dir[0], col + dir[1], word, widx + 1, dirs)) {
        return true
      }
    }
    board[row][col] = ch // recover
  }
// @lc code=end

