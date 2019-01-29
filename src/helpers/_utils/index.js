const path = require('path');
const cwd = process.cwd();

// 获取相对于当前应用目录文件完整路径
exports.getAppFiiePath = function(filePath) {
  return path.resolve(cwd, filePath);
}

// 获取相对目录
exports.getRelativePath = function (filePath) {
  return path.resolve(__dirname, filePath)
}