# OpenCode 設定作成ツール

OpenCode の設定ファイル `opencode.json` を簡単に作成・管理するための対話型ツールです。

## 特徴

- 🔧 対話的な設定作成
- 📋 モデル名をドロップダウンから選択可能
- 💾 自動バックアップ（日時付き）
- 🤖 複数のプロバイダー・エージェントに対応
- ✨ 既存設定からモデル候補を動的に抽出

## 設定ファイルの配置場所

このツールは、設定ファイルを **`~/.config/opencode/opencode.json`** に固定します。

```bash
~/.config/opencode/opencode.json
```

## インストール

```bash
npm link
```

または、グローバルインストール：

```bash
npm install -g .
```

## 使い方

```bash
opencode-wrapper
```

または

```bash
node opencode-wrapper/lib/cli.js
```

## 作業フロー

### 1. 新規作成

新しい設定をゼロから作成する場合：

1. ツールを起動
2. `新規作成（設定をゼロから作成）` を選択
3. 既存の設定がある場合、バックアップを作成するか確認されます
4. プロバイダー・エージェントを追加
5. `保存して終了` を選択

#### 自動バックアップ

新規作成時、既存の設定ファイルがある場合は自動的にバックアップが作成されます。

```bash
~/.config/opencode/opencode.json.2026-02-06_12-34-56.bak
```

### 2. 編集

既存の設定に追加・変更する場合：

1. ツールを起動
2. `編集（既存の設定に追加・変更）` を選択
3. メニューから操作を選択：
   - `プロバイダーを追加` - 新しいLLMプロバイダーを追加
   - `エージェントを追加` - 新しいエージェントを追加
   - `デフォルトモデルを設定` - デフォルトで使用するモデルを変更
   - `現在の設定を表示` - 設定内容を確認
   - `保存して終了` - 変更を保存して終了

### 3. 表示

現在の設定を確認する場合：

1. ツールを起動
2. `表示（現在の設定を確認）` を選択
3. 設定内容が表示されます

## 機能

- **新規作成** - 質問に答えてopencode.jsonをゼロから作成
- **編集** - 既存の設定にproviderやagentを追加・変更
- **バックアップ** - 日時付きで設定ファイルのバックアップを作成
- **バリデーション** - 必須項目を自動チェック
- **カテゴリ別プロバイダー選択** - 目的別にプロバイダーを選べる
- **ドロップダウンでモデル選択** - 手動入力ではなく候補からモデルを選択可能
- **カスタム入力** - 候補にないモデルも手動入力可能

## 対応しているプロバイダー

### ローカル / オンプレミス
- **ローカル llama-server (GLM)** - LM Studio / llama-server 経由で GLM を使用
- **ローカル llama-server (Qwen)** - LM Studio / llama-server 経由で Qwen を使用
- **LM Studio** - LM Studio と連携
- **Ollama** - Ollama と連携

### 主要ホスト型API
- **Anthropic (Claude)** - Claude API
- **OpenAI** - GPT モデル
- **Google Gemini** - Gemini API
- **Groq** - 高速推論
- **xAI (Grok)** - Grok API
- **DeepSeek** - DeepSeek API
- **Moonshot AI (Kimi)** - Kimi API
- **MiniMax** - MiniMax API
- **Z.AI (GLM-4.7)** - Z.AI GLM

### クラウドプラットフォーム統合型
- **Amazon Bedrock** - AWS Bedrock
- **Azure OpenAI** - Azure OpenAI

### ルーター / ゲートウェイ型
- **OpenRouter** - OpenRouter 経由で各種モデルを使用
- **Cloudflare AI Gateway** - Cloudflare AI

### サブスクリプション / アイデンティティ連携型
- **GitHub Copilot** - GitHub Copilot Token と連携

### OpenCode Zen（公式推奨）
- **OpenCode Zen** - 公式推奨のマネージドサービス

## エージェントテンプレート

### chat（推奨）
- **用途**: 設計・要約・レビュー
- **特徴**: 安全な読み取り専用設定
- **推奨モデル**: GLM（汎用・高速）

### build（推奨）
- **用途**: 実装・修正
- **特徴**: コード生成・ファイル編集可能
- **推奨モデル**: Qwen Coder（コード特化）

### general
- **用途**: 要約・雑談
- **特徴**: 軽量・高速、危険操作なし

### explore
- **用途**: Web調査
- **特徴**: 最新情報の取得、外部調査

### oracle
- **用途**: 設計・判断
- **特徴**: 設計レビュー、方針決定、書き換えなし

### sisyphus
- **用途**: オーケストレーター
- **特徴**: 全体方針決定、司令塔

## 推奨設定例

ローカル環境での推奨設定（GLM = 考える / Qwen = 書く）:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "lmstudio/glm47",
  "provider": {
    "lmstudio": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "LM Studio (local)",
      "options": {
        "baseURL": "http://localhost:1234/v1"
      },
      "models": {
        "glm47": {
          "name": "GLM-4.7-Flash-Uncen-Hrt-NEO-CODE-MAX-imat-D_AU-Q4_K_M",
          "tools": true
        },
        "qwen3": {
          "name": "Qwen3-Coder-Next-Q3_K_M",
          "tools": true
        }
      }
    }
  },
  "agent": {
    "chat": {
      "description": "設計・要約・レビュー（GLM - 安全な読み取り専用）",
      "model": "lmstudio/glm47",
      "tools": {
        "read": true,
        "write": false,
        "edit": false,
        "bash": false,
        "grep": true,
        "glob": true,
        "list": true,
        "websearch": false,
        "webfetch": false,
        "codesearch": false
      }
    },
    "build": {
      "description": "実装・修正（Qwen Coder - コード生成・実装）",
      "model": "lmstudio/qwen3",
      "tools": {
        "read": true,
        "write": true,
        "edit": true,
        "bash": true,
        "grep": true,
        "glob": true,
        "list": true,
        "websearch": false,
        "webfetch": false,
        "codesearch": false
      }
    }
  }
}
```

## OpenCode の起動

設定作成後、以下のコマンドで OpenCode を起動できます：

```bash
opencode
```

### エージェントを指定して起動

```bash
# chat エージェントで起動（設計・要約・レビュー）
opencode -a chat

# build エージェントで起動（実装・修正）
opencode -a build
```

### インタラクティブモードで起動

```bash
opencode -i
```

## トラブルシューティング

### バックアップファイルの確認

バックアップは以下の形式で保存されます：

```bash
~/.config/opencode/opencode.json.YYYY-MM-DD_HH-MM-SS.bak
```

例：

```bash
~/.config/opencode/opencode.json.2026-02-06_12-34-56.bak
```

バックアップから復元する場合：

```bash
cp ~/.config/opencode/opencode.json.2026-02-06_12-34-56.bak ~/.config/opencode/opencode.json
```

### ローカルLLMとの接続確認

LM Studio / Ollama との接続を確認する：

```bash
# LM Studio
curl http://localhost:1234/v1/models

# Ollama
curl http://localhost:11434/v1/models
```

詳細な接続確認方法は、以下の記事を参照してください：
https://note.com/zephel01/n/ndf224d5b6d9a

## 設定例

サンプル設定ファイルは `examples/opencode.json.example` にあります。

```bash
# サンプルをコピーして編集
cp examples/opencode.json.example ~/.config/opencode/opencode.json

# エディタで編集
nano ~/.config/opencode/opencode.json
```

または、このツールを使用して対話的に作成することもできます：

```bash
opencode-wrapper
```

## セキュリティ注意点

- APIキーを誤って共有しないように注意してください
- `.bak` ファイルにもAPIキーが含まれるため、適切に管理してください
- グローバル設定にする場合、`.config/opencode/` ディレクトリの権限を適切に設定してください
- サンプル設定ファイル（`examples/opencode.json.example`）は個人情報を含まない形式になっています

## 詳細

より詳細な使用方法は [USAGE.md](./USAGE.md) を参照してください。

## ライセンス

MIT
