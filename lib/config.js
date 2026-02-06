const fs = require('fs');
const path = require('path');
const os = require('os');

const DEFAULT_CONFIG = {
  "$schema": "https://opencode.ai/config.json",
  "model": "llama_qwen/qwen",
  "provider": {},
  "agent": {}
};

// OpenCodeの設定ファイルは ~/.config/opencode/opencode.json に固定
function getConfigPath() {
  const configDir = path.join(os.homedir(), '.config', 'opencode');
  return path.join(configDir, 'opencode.json');
}

// 設定ディレクトリを作成（存在しない場合）
function ensureConfigDir() {
  const configPath = getConfigPath();
  const configDir = path.dirname(configPath);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  return configDir;
}

function backupConfig(configPath) {
  if (fs.existsSync(configPath)) {
    const now = new Date();
    const timestamp = now.toISOString()
      .replace(/[:.]/g, '-')
      .replace('T', '_')
      .split('.')[0];
    const backupPath = `${configPath}.${timestamp}.bak`;
    const content = fs.readFileSync(configPath, 'utf8');
    fs.writeFileSync(backupPath, content, 'utf8');
    console.log(`✓ バックアップを作成しました: ${backupPath}`);
    return backupPath;
  }
  return null;
}

function loadConfig(configPath) {
  if (fs.existsSync(configPath)) {
    try {
      const content = fs.readFileSync(configPath, 'utf8');
      // JSONファイル内のコメントを除去してパース
      const cleanContent = content.replace(/\/\/.*/g, '');
      return JSON.parse(cleanContent);
    } catch (error) {
      console.log(`⚠ 既存の設定ファイルの読み込みに失敗しました: ${error.message}`);
      return DEFAULT_CONFIG;
    }
  }
  return DEFAULT_CONFIG;
}

function saveConfig(configPath, config) {
  const content = JSON.stringify(config, null, 2) + '\n';
  fs.writeFileSync(configPath, content, 'utf8');
  console.log(`✓ 設定を保存しました: ${configPath}`);
}

function validateConfig(config) {
  const errors = [];

  if (!config.$schema) {
    errors.push('$schema が設定されていません');
  }

  if (!config.model) {
    errors.push('デフォルトモデル（model）が設定されていません');
  }

  if (!config.provider || Object.keys(config.provider).length === 0) {
    errors.push('プロバイダー（provider）が設定されていません');
  }

  if (!config.agent || Object.keys(config.agent).length === 0) {
    errors.push('エージェント（agent）が設定されていません');
  }

  return errors;
}

function displayConfig(config) {
  console.log('\n=== 現在の設定 ===');
  console.log(`デフォルトモデル: ${config.model || '未設定'}`);
  console.log(`\nプロバイダー (${Object.keys(config.provider || {}).length}個):`);
  Object.entries(config.provider || {}).forEach(([key, provider]) => {
    console.log(`  - ${key}: ${provider.name || '名称未設定'}`);
  });
  console.log(`\nエージェント (${Object.keys(config.agent || {}).length}個):`);
  Object.entries(config.agent || {}).forEach(([key, agent]) => {
    console.log(`  - ${key}: ${agent.description || '説明未設定'}`);
  });
  console.log('===================\n');
}

module.exports = {
  DEFAULT_CONFIG,
  getConfigPath,
  backupConfig,
  loadConfig,
  saveConfig,
  validateConfig,
  displayConfig
};
