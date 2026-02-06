#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

// lib モジュールをインポート
const { providerTemplates, getProvidersByCategory, getCategories } = require('./lib/providers');
const agentTemplates = require('./lib/agents');
const config = require('./lib/config');
const { getModelChoices, addBackOption } = require('./lib/models');

// 既存設定から利用可能なモデルを抽出
function getExistingModels(currentConfig) {
  const models = [];
  if (currentConfig.provider) {
    Object.entries(currentConfig.provider).forEach(([providerKey, provider]) => {
      if (provider.models) {
        Object.keys(provider.models).forEach(modelKey => {
          models.push(`${providerKey}/${modelKey}`);
        });
      }
    });
  }
  return models;
}

// カレントディレクトリの設定ファイルパスを取得
function getConfigPath() {
  return path.join(process.cwd(), 'opencode.json');
}

// メイン処理
async function main() {
  console.log('\n🚀 OpenCode 設定作成ツールへようこそ！\n');

  // 設定ファイルのパスを決定（カレントディレクトリ: ./opencode.json）
  const configPath = getConfigPath();

  // 既存の設定を読み込むかどうか
  let currentConfig = config.loadConfig(configPath);

  console.log(`設定ファイル: ${configPath}\n`);

  const { mode } = await inquirer.prompt([
    {
      type: 'list',
      name: 'mode',
      message: 'どのモードで操作しますか？',
      choices: [
        { name: '新規作成（設定をゼロから作成）', value: 'new' },
        { name: '編集（既存の設定に追加・変更）', value: 'edit' },
        { name: '表示（現在の設定を確認）', value: 'view' },
        { name: '終了', value: 'exit' }
      ]
    }
  ]);

  if (mode === 'exit') {
    console.log('さようなら！');
    process.exit(0);
  }

  if (mode === 'view') {
    config.displayConfig(currentConfig);
    process.exit(0);
  }

  if (mode === 'new') {
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: '新規作成すると既存の設定は上書きされます。よろしいですか？',
        default: false
      }
    ]);

    if (!confirm) {
      console.log('キャンセルしました。');
      process.exit(0);
    }

    config.backupConfig(configPath);
    currentConfig = config.DEFAULT_CONFIG;
  }

  // メインループ
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: '何をしますか？',
        choices: [
          { name: 'プロバイダーを追加', value: 'add_provider' },
          { name: 'エージェントを追加', value: 'add_agent' },
          { name: 'デフォルトモデルを設定', value: 'set_model' },
          { name: '現在の設定を表示', value: 'view' },
          { name: '保存して終了', value: 'save' },
          { name: '保存せず終了', value: 'exit' }
        ]
      }
    ]);

    if (action === 'exit') {
      console.log('キャンセルしました。');
      process.exit(0);
    }

    if (action === 'view') {
      config.displayConfig(currentConfig);
      continue;
    }

    if (action === 'set_model') {
      const existingModels = getExistingModels(currentConfig);

      // モデル候補を作成
      const modelChoices = existingModels.map(m => ({
        name: `${m} (既存)`,
        value: m
      }));

      // デフォルト値を設定
      const defaultModel = currentConfig.model || 'llama_qwen/qwen';
      if (!modelChoices.find(c => c.value === defaultModel)) {
        modelChoices.push({ name: defaultModel, value: defaultModel });
      }

      modelChoices.push({ name: '━━━━━━━━━', value: 'separator' });
      modelChoices.push({ name: 'カスタム入力', value: 'custom' });
      modelChoices.push({ name: '戻る', value: '__BACK__' });

      const { modelChoice, customModel } = await inquirer.prompt([
        {
          type: 'list',
          name: 'modelChoice',
          message: 'デフォルトモデルを選択してください:',
          choices: modelChoices,
          default: defaultModel
        },
        {
          type: 'input',
          name: 'customModel',
          message: 'モデル名を入力してください（例: llama_qwen/qwen）:',
          default: defaultModel,
          when: (answers) => answers.modelChoice === 'custom'
        }
      ]);

      // 「戻る」が選択された場合はメインメニューに戻る
      if (modelChoice === '__BACK__') {
        continue;
      }

      const model = modelChoice === 'custom' ? customModel : modelChoice;
      currentConfig.model = model;
      console.log('✓ デフォルトモデルを設定しました\n');
      continue;
    }

    if (action === 'add_provider') {
      // カテゴリ名のマッピング
      const categoryNames = {
        'local': 'ローカル / オンプレミス',
        'hosted': '主要ホスト型API（Anthropic, OpenAIなど）',
        'cloud': 'クラウドプラットフォーム（AWS Bedrock, Azureなど）',
        'router': 'ルーター / ゲートウェイ（OpenRouterなど）',
        'subscription': 'サブスクリプション（GitHub Copilotなど）',
        'recommended': 'OpenCode Zen（公式推奨）'
      };

      const categoryChoices = getCategories().map(cat => ({
        name: categoryNames[cat] || cat,
        value: cat
      }));

      const { category } = await inquirer.prompt([
        {
          type: 'list',
          name: 'category',
          message: 'プロバイダーのカテゴリを選択してください:',
          choices: [...categoryChoices, { name: '戻る', value: 'back' }]
        }
      ]);

      if (category === 'back') continue;

      const providers = getProvidersByCategory(category);
      const providerChoices = providers.map(p => ({
        name: p.name,
        value: p.key
      }));

      const { providerType } = await inquirer.prompt([
        {
          type: 'list',
          name: 'providerType',
          message: '追加するプロバイダーを選択してください:',
          choices: [...providerChoices, { name: '戻る', value: 'back' }]
        }
      ]);

      if (providerType === 'back') continue;

      const tpl = providerTemplates[providerType];
      // questions を関数として呼び出し、現在の設定を渡す
      let questions = typeof tpl.questions === 'function' ? tpl.questions(currentConfig) : tpl.questions;
      // 「戻る」オプションを追加
      questions = addBackOption(questions);
      const answers = await inquirer.prompt(questions);

      // 「戻る」が選択された場合はメインメニューに戻る
      if (Object.values(answers).includes('__BACK__')) {
        continue;
      }

      const providerConfig = tpl.generate(answers);
      currentConfig.provider[tpl.key] = providerConfig;
      console.log(`✓ プロバイダー "${tpl.name}" を追加しました\n`);
    }

    if (action === 'add_agent') {
      const agentChoices = Object.entries(agentTemplates).map(([key, tpl]) => ({
        name: `${tpl.name}: ${tpl.description}`,
        value: key
      }));

      const { agentType } = await inquirer.prompt([
        {
          type: 'list',
          name: 'agentType',
          message: '追加するエージェントの種類を選択してください:',
          choices: [...agentChoices, { name: '戻る', value: 'back' }]
        }
      ]);

      if (agentType === 'back') continue;

      const tpl = agentTemplates[agentType];
      // questions を関数として呼び出し、現在の設定を渡す
      let questions = typeof tpl.questions === 'function' ? tpl.questions(currentConfig) : tpl.questions;
      // 「戻る」オプションを追加
      questions = addBackOption(questions);
      const answers = await inquirer.prompt(questions);

      // 「戻る」が選択された場合はメインメニューに戻る
      if (Object.values(answers).includes('__BACK__')) {
        continue;
      }

      const agentConfig = tpl.generate(answers);
      currentConfig.agent[tpl.name] = agentConfig;
      console.log(`✓ エージェント "${tpl.name}" を追加しました\n`);
    }

    if (action === 'save') {
      // バリデーション
      const errors = config.validateConfig(currentConfig);
      if (errors.length > 0) {
        console.log('\n⚠ 設定に問題があります:');
        errors.forEach(err => console.log(`  - ${err}`));
        const { forceSave } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'forceSave',
            message: '問題がありますが保存しますか？',
            default: false
          }
        ]);
        if (!forceSave) continue;
      }

      config.displayConfig(currentConfig);
      const { confirmSave } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmSave',
          message: 'この内容で保存しますか？',
          default: true
        }
      ]);

      if (confirmSave) {
        if (mode === 'new' && fs.existsSync(configPath)) {
          config.backupConfig(configPath);
        }
        config.saveConfig(configPath, currentConfig);
        console.log('\n✨ 設定の作成が完了しました！\n');
        console.log('OpenCodeを起動するには以下を実行してください:');
        console.log('  opencode\n');
        process.exit(0);
      }
    }
  }
}

// エラーハンドリング
main().catch(error => {
  console.error('エラーが発生しました:', error.message);
  process.exit(1);
});
