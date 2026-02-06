// provider設定テンプレート

const { getModelChoices } = require('./models');

const providerTemplates = {
  // ===============================
  // ローカル / オンプレミス型
  // ===============================
  llama_server_glm: {
    key: 'llama_glm',
    name: 'ローカル llama-server (GLM)',
    category: 'local',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'baseURL',
        message: 'llama-serverのアドレスを入力してください（例: http://192.168.1.21:8080/v1）:',
        default: 'http://localhost:8080/v1'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('llama_glm', []),
        default: 'GLM-4.7-Flash'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: GLM-4.7-Flash）:',
        default: 'GLM-4.7-Flash',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai-compatible',
        name: '(local)',
        options: {
          baseURL: answers.baseURL
        },
        models: {
          'glm': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  llama_server_qwen: {
    key: 'llama_qwen',
    name: 'ローカル llama-server (Qwen)',
    category: 'local',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'baseURL',
        message: 'Qwen llama-serverのアドレスを入力してください（例: http://192.168.1.21:8083/v1）:',
        default: 'http://localhost:8083/v1'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('llama_qwen', []),
        default: 'Qwen2.5-Coder-14B'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: Qwen2.5-Coder-14B）:',
        default: 'Qwen2.5-Coder-14B',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai-compatible',
        name: '(local)',
        options: {
          baseURL: answers.baseURL
        },
        models: {
          'qwen': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  lm_studio: {
    key: 'lm_studio',
    name: 'LM Studio',
    category: 'local',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'baseURL',
        message: 'LM Studioのアドレスを入力してください（例: http://localhost:1234/v1）:',
        default: 'http://localhost:1234/v1'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('lm_studio', []),
        default: 'llama-3.3-70b'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: llama-3.3-70b）:',
        default: 'llama-3.3-70b',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai-compatible',
        name: 'LM Studio',
        options: {
          baseURL: answers.baseURL
        },
        models: {
          'model': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  ollama: {
    key: 'ollama',
    name: 'Ollama',
    category: 'local',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'baseURL',
        message: 'Ollamaのアドレスを入力してください（例: http://localhost:11434/v1）:',
        default: 'http://localhost:11434/v1'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('ollama', []),
        default: 'llama3.3'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: llama3.3）:',
        default: 'llama3.3',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai-compatible',
        name: 'Ollama',
        options: {
          baseURL: answers.baseURL
        },
        models: {
          'model': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  // ===============================
  // 主要ホスト型API（Direct / Official Hosted APIs）
  // ===============================
  anthropic: {
    key: 'anthropic',
    name: 'Anthropic (Claude)',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'Anthropic API Keyを入力してください（環境変数を使う場合は $ANTHROPIC_API_KEY と入力）:',
        default: '$ANTHROPIC_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('anthropic', []),
        default: 'claude-sonnet-4-20250514'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: claude-sonnet-4-20250514）:',
        default: 'claude-sonnet-4-20250514',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/anthropic',
        name: 'Anthropic',
        options: {
          apiKey: answers.apiKey
        },
        models: {
          'claude': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  groq: {
    key: 'groq',
    name: 'Groq（高速推論）',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'Groq API Keyを入力してください（環境変数を使う場合は $GROQ_API_KEY と入力）:',
        default: '$GROQ_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('groq', []),
        default: 'llama-3.3-70b-versatile'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: llama-3.3-70b-versatile）:',
        default: 'llama-3.3-70b-versatile',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/groq',
        name: 'Groq',
        options: {
          apiKey: answers.apiKey
        },
        models: {
          'groq': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  xai: {
    key: 'xai',
    name: 'xAI (Grok)',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'xAI API Keyを入力してください（環境変数を使う場合は $XAI_API_KEY と入力）:',
        default: '$XAI_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('xai', []),
        default: 'grok-2-latest'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: grok-2-latest）:',
        default: 'grok-2-latest',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai-compatible',
        name: 'xAI',
        options: {
          baseURL: 'https://api.x.ai/v1',
          apiKey: answers.apiKey
        },
        models: {
          'grok': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  deepseek: {
    key: 'deepseek',
    name: 'DeepSeek',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'DeepSeek API Keyを入力してください（環境変数を使う場合は $DEEPSEEK_API_KEY と入力）:',
        default: '$DEEPSEEK_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('deepseek', []),
        default: 'deepseek-chat'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: deepseek-chat）:',
        default: 'deepseek-chat',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai-compatible',
        name: 'DeepSeek',
        options: {
          baseURL: 'https://api.deepseek.com/v1',
          apiKey: answers.apiKey
        },
        models: {
          'deepseek': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  moonshot: {
    key: 'moonshot',
    name: 'Moonshot AI (Kimi)',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'Moonshot AI API Keyを入力してください（環境変数を使う場合は $MOONSHOT_API_KEY と入力）:',
        default: '$MOONSHOT_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('moonshot', []),
        default: 'kimi-k2-1.5-m2'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: kimi-k2-1.5-m2）:',
        default: 'kimi-k2-1.5-m2',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai-compatible',
        name: 'Moonshot AI',
        options: {
          baseURL: 'https://api.moonshot.cn/v1',
          apiKey: answers.apiKey
        },
        models: {
          'kimi': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  minimax: {
    key: 'minimax',
    name: 'MiniMax',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'MiniMax API Keyを入力してください（環境変数を使う場合は $MINIMAX_API_KEY と入力）:',
        default: '$MINIMAX_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('minimax', []),
        default: 'm2.1'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: m2.1）:',
        default: 'm2.1',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai-compatible',
        name: 'MiniMax',
        options: {
          baseURL: 'https://api.minimax.chat/v1',
          apiKey: answers.apiKey
        },
        models: {
          'minimax': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  zai: {
    key: 'zai',
    name: 'Z.AI (GLM-4.7)',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'Z.AI API Keyを入力してください（環境変数を使う場合は $ZAI_API_KEY と入力）:',
        default: '$ZAI_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('zai', []),
        default: 'glm-4.7'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: glm-4.7）:',
        default: 'glm-4.7',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai-compatible',
        name: 'Z.AI',
        options: {
          baseURL: 'https://open.bigmodel.cn/api/paas/v4',
          apiKey: answers.apiKey
        },
        models: {
          'glm': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  // ===============================
  // クラウドプラットフォーム統合型
  // ===============================
  aws_bedrock: {
    key: 'aws_bedrock',
    name: 'Amazon Bedrock',
    category: 'cloud',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'region',
        message: 'AWSリージョンを入力してください（例: us-east-1）:',
        default: 'us-east-1'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('aws_bedrock', []),
        default: 'anthropic.claude-sonnet-4-20250514-v2:0'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: anthropic.claude-sonnet-4-20250514-v2:0）:',
        default: 'anthropic.claude-sonnet-4-20250514-v2:0',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/aws',
        name: 'Amazon Bedrock',
        options: {
          region: answers.region
        },
        models: {
          'bedrock': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  azure_openai: {
    key: 'azure_openai',
    name: 'Azure OpenAI',
    category: 'cloud',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'Azure OpenAI API Keyを入力してください（環境変数を使う場合は $AZURE_OPENAI_API_KEY と入力）:',
        default: '$AZURE_OPENAI_API_KEY'
      },
      {
        type: 'input',
        name: 'endpoint',
        message: 'Azure OpenAI Endpointを入力してください（例: https://your-resource.openai.azure.com）:',
        default: 'https://your-resource.openai.azure.com'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('azure_openai', []),
        default: 'gpt-4o'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: gpt-4o）:',
        default: 'gpt-4o',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/azure',
        name: 'Azure OpenAI',
        options: {
          apiKey: answers.apiKey,
          endpoint: answers.endpoint
        },
        models: {
          'azure': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  // ===============================
  // ルーター / ゲートウェイ型
  // ===============================
  openrouter: {
    key: 'openrouter',
    name: 'OpenRouter',
    category: 'router',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'OpenRouter API Keyを入力してください（環境変数を使う場合は $OPENROUTER_API_KEY と入力）:',
        default: '$OPENROUTER_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('openrouter', []),
        default: 'anthropic/claude-sonnet-4'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: anthropic/claude-sonnet-4）:',
        default: 'anthropic/claude-sonnet-4',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openrouter',
        name: 'OpenRouter',
        options: {
          apiKey: answers.apiKey
        },
        models: {
          'openrouter': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  cloudflare_ai: {
    key: 'cloudflare_ai',
    name: 'Cloudflare AI Gateway',
    category: 'router',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'Cloudflare API Tokenを入力してください（環境変数を使う場合は $CLOUDFLARE_API_TOKEN と入力）:',
        default: '$CLOUDFLARE_API_TOKEN'
      },
      {
        type: 'input',
        name: 'accountId',
        message: 'Cloudflare Account IDを入力してください:',
        default: ''
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('cloudflare_ai', []),
        default: '@cf/meta/llama-3.3-70b-instruct-fp8'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: @cf/meta/llama-3.3-70b-instruct-fp8）:',
        default: '@cf/meta/llama-3.3-70b-instruct-fp8',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai-compatible',
        name: 'Cloudflare AI',
        options: {
          baseURL: `https://api.cloudflare.com/client/v4/accounts/${answers.accountId}/ai/v1`,
          apiKey: answers.apiKey
        },
        models: {
          'cloudflare': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  // ===============================
  // サブスクリプション / アイデンティティ連携型
  // ===============================
  github_copilot: {
    key: 'github_copilot',
    name: 'GitHub Copilot',
    category: 'subscription',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'token',
        message: 'GitHub Copilot Tokenを入力してください（環境変数を使う場合は $GITHUB_COPILOT_TOKEN と入力）:',
        default: '$GITHUB_COPILOT_TOKEN'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('github_copilot', []),
        default: 'gpt-4o-2024-05-13'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: gpt-4o-2024-05-13）:',
        default: 'gpt-4o-2024-05-13',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai-compatible',
        name: 'GitHub Copilot',
        options: {
          baseURL: 'https://api.githubcopilot.com',
          apiKey: answers.token
        },
        models: {
          'copilot': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  // ===============================
  // 主要な既存プロバイダー
  // ===============================
  google: {
    key: 'google',
    name: 'Google Gemini',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'Google API Keyを入力してください（環境変数を使う場合は $GOOGLE_API_KEY と入力）:',
        default: '$GOOGLE_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('google', []),
        default: 'gemini-2.5-flash'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: gemini-2.5-flash）:',
        default: 'gemini-2.5-flash',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/google',
        name: 'Google Gemini',
        options: {
          apiKey: answers.apiKey
        },
        models: {
          'gemini': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  openai: {
    key: 'openai',
    name: 'OpenAI',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'OpenAI API Keyを入力してください（環境変数を使う場合は $OPENAI_API_KEY と入力）:',
        default: '$OPENAI_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('openai', []),
        default: 'gpt-4o'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: gpt-4o）:',
        default: 'gpt-4o',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai',
        name: 'OpenAI',
        options: {
          apiKey: answers.apiKey
        },
        models: {
          'gpt': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  },

  // ===============================
  // OpenCode Zen（公式推奨）
  // ===============================
  opencode_zen: {
    key: 'opencode_zen',
    name: 'OpenCode Zen（公式推奨）',
    category: 'recommended',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'OpenCode Zen API Keyを入力してください（環境変数を使う場合は $OPENCODE_ZEN_API_KEY と入力）:',
        default: '$OPENCODE_ZEN_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデルを選択してください:',
        choices: getModelChoices('opencode_zen', []),
        default: 'claude-sonnet-4-20250514'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: claude-sonnet-4-20250514）:',
        default: 'claude-sonnet-4-20250514',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        npm: '@ai-sdk/openai-compatible',
        name: 'OpenCode Zen',
        options: {
          baseURL: 'https://api.opencode.ai/v1',
          apiKey: answers.apiKey
        },
        models: {
          'zen': {
            name: modelName,
            tools: true
          }
        }
      };
    }
  }
};

// カテゴリ別にグループ化したプロバイダーを返すヘルパー関数
function getProvidersByCategory(category) {
  return Object.entries(providerTemplates)
    .filter(([_, tpl]) => tpl.category === category)
    .map(([key, tpl]) => ({ key, name: tpl.name }));
}

// すべてのカテゴリを取得
function getCategories() {
  return [...new Set(Object.values(providerTemplates).map(tpl => tpl.category))];
}

module.exports = {
  providerTemplates,
  getProvidersByCategory,
  getCategories
};
