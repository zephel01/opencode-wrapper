// agent設定テンプレート

const { getAgentModelChoices, getCustomModelQuestion } = require('./models');

const agentTemplates = {
  chat: {
    name: 'chat',
    description: '設計・要約・レビュー（GLM - 安全な読み取り専用）',
    questions: (existingConfig) => [
      {
        type: 'list',
        name: 'modelChoice',
        message: '使用するモデルを選択してください:',
        choices: getAgentModelChoices('general', existingConfig),
        default: 'lmstudio/glm47'
      },
      {
        type: 'input',
        name: 'customModel',
        message: 'モデル名を入力してください（例: lmstudio/glm47）:',
        default: 'lmstudio/glm47',
        when: (answers) => answers.modelChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const model = answers.modelChoice === 'custom' ? answers.customModel : answers.modelChoice;
      return {
        mode: 'primary',
        description: '設計・要約・レビュー（GLM - 安全な読み取り専用）',
        model: model,
        tools: {
          read: true,
          write: false,
          edit: false,
          bash: false,
          grep: true,
          glob: true,
          list: true,
          webfetch: false,
          websearch: false,
          codesearch: false
        }
      };
    }
  },

  build: {
    name: 'build',
    description: '実装・修正（Qwen Coder - コード生成・実装）',
    questions: (existingConfig) => [
      {
        type: 'list',
        name: 'modelChoice',
        message: '使用するモデルを選択してください:',
        choices: getAgentModelChoices('build', existingConfig),
        default: 'lmstudio/qwen3'
      },
      {
        type: 'input',
        name: 'customModel',
        message: 'モデル名を入力してください（例: lmstudio/qwen3）:',
        default: 'lmstudio/qwen3',
        when: (answers) => answers.modelChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const model = answers.modelChoice === 'custom' ? answers.customModel : answers.modelChoice;
      return {
        mode: 'primary',
        description: '実装・修正（Qwen Coder - コード生成・実装）',
        model: model,
        tools: {
          read: true,
          write: true,
          edit: true,
          bash: true,
          grep: true,
          glob: true,
          list: true,
          webfetch: false,
          websearch: false,
          codesearch: false
        }
      };
    }
  },

  general: {
    name: 'general',
    description: '要約・雑談（軽量・高速、危険操作なし）',
    questions: (existingConfig) => [
      {
        type: 'list',
        name: 'modelChoice',
        message: '使用するモデルを選択してください:',
        choices: getAgentModelChoices('general', existingConfig),
        default: 'llama_glm/glm'
      },
      {
        type: 'input',
        name: 'customModel',
        message: 'モデル名を入力してください（例: llama_glm/glm）:',
        default: 'llama_glm/glm',
        when: (answers) => answers.modelChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const model = answers.modelChoice === 'custom' ? answers.customModel : answers.modelChoice;
      return {
        mode: 'primary',
        description: '要約・雑談（local GLM / no web）',
        model: model,
        tools: {
          read: true,
          write: true,
          edit: true,
          bash: false,
          grep: true,
          glob: true,
          list: true,
          webfetch: false,
          websearch: false,
          codesearch: false
        }
      };
    }
  },

  explore: {
    name: 'explore',
    description: 'Web調査（最新情報の取得、外部調査）',
    questions: (existingConfig) => [
      {
        type: 'list',
        name: 'modelChoice',
        message: '使用するモデルを選択してください:',
        choices: getAgentModelChoices('explore', existingConfig),
        default: 'google/gemini'
      },
      {
        type: 'input',
        name: 'customModel',
        message: 'モデル名を入力してください（例: google/gemini）:',
        default: 'google/gemini',
        when: (answers) => answers.modelChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const model = answers.modelChoice === 'custom' ? answers.customModel : answers.modelChoice;
      return {
        mode: 'primary',
        description: 'Web調査（Gemini / web tools）',
        model: model,
        tools: {
          webfetch: true,
          websearch: true,
          read: true,
          grep: true,
          glob: true,
          list: true
        }
      };
    }
  },

  oracle: {
    name: 'oracle',
    description: '設計・判断（設計レビュー、方針決定、書き換えなし）',
    questions: (existingConfig) => [
      {
        type: 'list',
        name: 'modelChoice',
        message: '使用するモデルを選択してください:',
        choices: getAgentModelChoices('oracle', existingConfig),
        default: 'zai-coding-plan/glm-4.7'
      },
      {
        type: 'input',
        name: 'customModel',
        message: 'モデル名を入力してください（例: zai-coding-plan/glm-4.7）:',
        default: 'zai-coding-plan/glm-4.7',
        when: (answers) => answers.modelChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const model = answers.modelChoice === 'custom' ? answers.customModel : answers.modelChoice;
      return {
        mode: 'primary',
        description: '設計・判断（Z.AI GLM / 基本 read-only）',
        model: model,
        tools: {
          read: true,
          grep: true,
          glob: true,
          list: true,
          webfetch: false,
          websearch: false
        }
      };
    }
  },

  sisyphus: {
    name: 'sisyphus',
    description: 'オーケストレーター（全体方針決定、司令塔）',
    questions: (existingConfig) => [
      {
        type: 'list',
        name: 'modelChoice',
        message: '使用するモデルを選択してください:',
        choices: getAgentModelChoices('sisyphus', existingConfig),
        default: 'zai-coding-plan/glm-4.7'
      },
      {
        type: 'input',
        name: 'customModel',
        message: 'モデル名を入力してください（例: zai-coding-plan/glm-4.7）:',
        default: 'zai-coding-plan/glm-4.7',
        when: (answers) => answers.modelChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const model = answers.modelChoice === 'custom' ? answers.customModel : answers.modelChoice;
      return {
        mode: 'primary',
        description: 'メインオーケストレーター（方針決め→振り分け→統括）',
        model: model,
        tools: {
          read: true,
          grep: true,
          glob: true,
          list: true,
          webfetch: true,
          websearch: true
        }
      };
    }
  }
};

module.exports = agentTemplates;
