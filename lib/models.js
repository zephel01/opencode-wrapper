// モデル候補の定義ファイル
// 各プロバイダーごとによく使われるモデル名を定義

const modelCandidates = {
  // ローカル / オンプレミス型
  llama_glm: [
    'GLM-4.7-Flash-Uncen-Hrt-NEO-CODE-MAX-imat-D_AU-Q4_K_M',
    'GLM-4.7-Flash',
    'GLM-4.7',
    'GLM-4-Air',
    'GLM-4-Flash',
    'glm-4.7',
    'glm-4-air',
    'glm-4-flash'
  ],
  llama_qwen: [
    'Qwen3-Coder-Next-Q3_K_M',
    'Qwen2.5-Coder-14B',
    'Qwen2.5-7B-Instruct',
    'Qwen2.5-14B-Instruct',
    'Qwen2.5-32B-Instruct',
    'Qwen2.5-72B-Instruct',
    'qwen2.5-coder-14b',
    'qwen2.5-7b-instruct',
    'qwen2.5-14b-instruct'
  ],
  lm_studio: [
    'GLM-4.7-Flash-Uncen-Hrt-NEO-CODE-MAX-imat-D_AU-Q4_K_M',
    'Qwen3-Coder-Next-Q3_K_M',
    'llama-3.3-70b',
    'llama-3.3-70b-instruct',
    'llama-3.1-8b',
    'qwen2.5-72b-instruct',
    'deepseek-r1',
    'DeepSeek-R1-Distill-Llama-8B-Q4_K_M',
    'Phi-4-Mini-Instruct-Q4_K_M',
    'Phi-4-14.7B-Instruct-Q4_K_M'
  ],
  ollama: [
    'glm-4.7-flash-neo-code-max:q4_k_m',
    'qwen3-coder-next:q3_k_m',
    'llama3.3',
    'llama3.3:70b',
    'qwen2.5:14b',
    'qwen2.5:72b',
    'deepseek-r1',
    'gemma2:27b',
    'Qwen3-Coder-Next',
    'Qwen3-14B',
    'Phi-4'
  ],

  // 主要ホスト型API（Direct / Official Hosted APIs）
  anthropic: [
    'claude-sonnet-4-20250514',
    'claude-sonnet-4-20250514-v2:0',
    'claude-3-5-sonnet-20241022',
    'claude-3-5-haiku-20241022',
    'claude-3-opus-20240229'
  ],
  groq: [
    'llama-3.3-70b-versatile',
    'llama-3.1-70b-versatile',
    'mixtral-8x7b-32768',
    'gemma2-9b-it'
  ],
  xai: [
    'grok-2-latest',
    'grok-beta',
    'grok-2-vision-1212'
  ],
  deepseek: [
    'deepseek-chat',
    'deepseek-coder',
    'deepseek-r1'
  ],
  moonshot: [
    'kimi-k2-1.5-m2',
    'kimi-m1-a1b1',
    'moonshot-v1-32k'
  ],
  minimax: [
    'm2.1',
    'abab-6.5s',
    'abab-6.5-chat'
  ],
  zai: [
    'glm-4.7',
    'glm-4-air',
    'glm-4-flash',
    'glm-4.7-long'
  ],
  google: [
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-2.0-flash-exp',
    'gemini-1.5-pro',
    'gemini-1.5-flash'
  ],
  openai: [
    'gpt-4o',
    'gpt-4o-2024-11-20',
    'gpt-4o-mini',
    'gpt-4-turbo',
    'o1',
    'o1-2024-12-17'
  ],

  // クラウドプラットフォーム統合型
  aws_bedrock: [
    'anthropic.claude-sonnet-4-20250514-v2:0',
    'anthropic.claude-3-5-sonnet-20241022-v2:0',
    'anthropic.claude-3-haiku-20240307-v1:0',
    'meta.llama3-70b-instruct-v1:0',
    'mistral.mistral-large-2407-v1:0'
  ],
  azure_openai: [
    'gpt-4o',
    'gpt-4o-2024-11-20',
    'gpt-4-turbo',
    'gpt-4',
    'o1',
    'o1-2024-12-17'
  ],

  // ルーター / ゲートウェイ型
  openrouter: [
    'anthropic/claude-sonnet-4',
    'openai/gpt-4o-2024-11-20',
    'google/gemini-2.5-flash-exp',
    'deepseek/deepseek-r1',
    'xai/grok-beta'
  ],
  cloudflare_ai: [
    '@cf/meta/llama-3.3-70b-instruct-fp8',
    '@cf/qwen/qwen2.5-72b-instruct',
    '@cf/deepseek-ai/deepseek-r1',
    '@hf/google/gemma-7b-it'
  ],

  // サブスクリプション / アイデンティティ連携型
  github_copilot: [
    'gpt-4o-2024-05-13',
    'gpt-4o-2024-11-20',
    'o1-2024-12-17'
  ],

  // OpenCode Zen（公式推奨）
  opencode_zen: [
    'claude-sonnet-4-20250514',
    'gpt-4o-2024-11-20',
    'qwen-3-coder-480b',
    'o1-2024-12-17'
  ]
};

// エージェント用の推奨モデル候補
const agentModelRecommendations = {
  chat: [
    'lmstudio/glm47',
    'ollama/glm47',
    'llama_glm/glm',
    'google/gemini-2.5-flash',
    'openai/gpt-4o-mini'
  ],
  build: [
    'lmstudio/qwen3',
    'ollama/qwen3',
    'llama_qwen/qwen',
    'zai-coding-plan/glm-4.7',
    'openai/gpt-4o',
    'anthropic/claude-sonnet-4-20250514'
  ],
  general: [
    'lmstudio/glm47',
    'ollama/glm47',
    'llama_glm/glm',
    'google/gemini-2.5-flash',
    'openai/gpt-4o-mini'
  ],
  explore: [
    'google/gemini',
    'zai-coding-plan/glm-4.7',
    'anthropic/claude-sonnet-4-20250514'
  ],
  oracle: [
    'zai-coding-plan/glm-4.7',
    'anthropic/claude-sonnet-4-20250514',
    'o1-2024-12-17'
  ],
  sisyphus: [
    'zai-coding-plan/glm-4.7',
    'anthropic/claude-sonnet-4-20250514',
    'o1-2024-12-17'
  ]
};

// モデル候補を取得（既存設定から利用可能なモデルもマージ）
function getModelChoices(providerKey, existingModels = []) {
  const candidates = modelCandidates[providerKey] || [];

  // 既存の設定から利用可能なモデルを抽出
  const existingModelChoices = existingModels.map(m => ({
    name: m,
    value: m
  }));

  // 定義済みのモデル候補
  const definedChoices = candidates.map(m => ({
    name: m,
    value: m
  }));

  // 重複を排除してマージ
  const allChoices = new Map();
  existingModelChoices.forEach(c => allChoices.set(c.value, c));
  definedChoices.forEach(c => allChoices.set(c.value, c));

  const choices = Array.from(allChoices.values());

  // カスタム入力オプションを追加
  choices.push({ name: '━━━━━━━━━', value: 'separator' });
  choices.push({ name: 'カスタム入力', value: 'custom' });

  return choices;
}

// エージェント用のモデル候補を取得
function getAgentModelChoices(agentType, existingConfig = {}) {
  const recommendations = agentModelRecommendations[agentType] || [];

  // 既存設定から利用可能なモデルを抽出
  const existingModels = [];
  Object.values(existingConfig.provider || {}).forEach(provider => {
    if (provider.models) {
      Object.keys(provider.models).forEach(modelKey => {
        const providerKey = Object.keys(existingConfig.provider).find(
          k => existingConfig.provider[k] === provider
        );
        existingModels.push(`${providerKey}/${modelKey}`);
      });
    }
  });

  // 推奨モデル候補
  const recommendedChoices = recommendations.map(m => ({
    name: m,
    value: m
  }));

  // 既存のモデル候補
  const existingChoices = existingModels.map(m => ({
    name: `${m} (既存)`,
    value: m
  }));

  // 重複を排除してマージ
  const allChoices = new Map();
  recommendedChoices.forEach(c => allChoices.set(c.value, c));
  existingChoices.forEach(c => allChoices.set(c.value, c));

  const choices = Array.from(allChoices.values());

  // カスタム入力オプションを追加
  choices.push({ name: '━━━━━━━━━', value: 'separator' });
  choices.push({ name: 'カスタム入力', value: 'custom' });

  return choices;
}

// カスタム入力用の質問を生成
function getCustomModelQuestion(defaultValue = '') {
  return {
    type: 'input',
    name: 'customModel',
    message: 'モデル名を入力してください（例: llama_qwen/qwen）:',
    default: defaultValue
  };
}

// questions 配列に「戻る」選択肢を追加するヘルパー関数
function addBackOption(questions) {
  return questions.map(q => {
    if (q.type === 'list' && q.choices) {
      return {
        ...q,
        choices: [
          ...q.choices,
          { name: '━━━━━━━━━', value: 'separator' },
          { name: '戻る', value: '__BACK__' }
        ]
      };
    }
    return q;
  });
}

module.exports = {
  modelCandidates,
  agentModelRecommendations,
  getModelChoices,
  getAgentModelChoices,
  getCustomModelQuestion,
  addBackOption
};
