# OpenCode 設定作成ツール

OpenCode の設定ファイル `opencode.json` を簡単に作成・管理するための対話型ツールです。

## セットアップ

### 1. Node.js のインストール

まだインストールしていない場合は、以下から Node.js をダウンロードしてインストールしてください。

- [Node.js 公式サイト](https://nodejs.org/) (LTS版推奨)

### 2. ツールのインストール

このディレクトリで以下を実行してください。

```bash
npm install -g .
```

または、

```bash
npm link
```

### 3. 動作確認

```bash
opencode-wrapper
```

以下が表示されれば成功です。

```
🚀 OpenCode 設定作成ツールへようこそ！
```

## 使い方

### 基本的な流れ

1. ツールを起動
```bash
opencode-wrapper
```

2. モードを選択
   - **新規作成** - 設定をゼロから作成
   - **編集** - 既存の設定に追加・変更
   - **表示** - 現在の設定を確認

3. 設定を追加
   - プロバイダー（LLM接続先）を追加
   - エージェント（役割）を追加
   - デフォルトモデルを設定

4. 保存して終了

### 設定ファイルの保存場所

デフォルトでは、コマンドを実行したディレクトリに `opencode.json` が作成されます。

## サンプル設定フロー

### 例1: ローカルLLMを設定する場合

```
🚀 OpenCode 設定作成ツールへようこそ！

? どのモードで操作しますか？
  新規作成（設定をゼロから作成）
❯ 編集（既存の設定に追加・変更）
  表示（現在の設定を確認）
  終了

? 新規作成すると既存の設定は上書きされます。よろしいですか？ Yes

✓ バックアップを作成しました: opencode.json.bak

? 何をしますか？
❯ プロバイダーを追加
  エージェントを追加
  デフォルトモデルを設定
  現在の設定を表示
  保存して終了
  保存せず終了

? プロバイダーのカテゴリを選択してください:
  ローカル / オンプレミス
❯ 主要ホスト型API（Anthropic, OpenAIなど）
  クラウドプラットフォーム（AWS Bedrock, Azureなど）
  ルーター / ゲートウェイ（OpenRouterなど）
  サブスクリプション（GitHub Copilotなど）
  OpenCode Zen（公式推奨）
  戻る

? 追加するプロバイダーを選択してください:
  Anthropic (Claude)
❯ OpenAI
  Google Gemini
  Groq（高速推論）
  戻る

? Qwen llama-serverのアドレスを入力してください: http://192.168.1.21:8083/v1
? モデル名を入力してください: Qwen2.5-Coder-14B

✓ プロバイダー "ローカル llama-server (Qwen)" を追加しました

... (エージェントも同様に追加) ...

? この内容で保存しますか？ Yes

✓ 設定の保存に成功しました: opencode.json

✨ 設定の作成が完了しました！

OpenCodeを起動するには以下を実行してください:
  opencode --config opencode.json
```

## 対応しているプロバイダー

### ローカル / オンプレミス

| プロバイダー | 説明 |
|--------------|------|
| ローカル llama-server (GLM) | 自分のPCで動くGLM系LLM |
| ローカル llama-server (Qwen) | 自分のPCで動くQwen系LLM |
| LM Studio | LM Studioで動作するLLM |
| Ollama | Ollamaで動作するLLM |

### 主要ホスト型API

| プロバイダー | 説明 |
|--------------|------|
| Anthropic (Claude) | Claudeシリーズ |
| OpenAI | GPTシリーズ |
| Google Gemini | Geminiシリーズ |
| Groq | 高速推論サービス |
| xAI (Grok) | Grokシリーズ |
| DeepSeek | DeepSeekモデル |
| Moonshot AI (Kimi) | Kimi K2など |
| MiniMax | M2.1など |
| Z.AI (GLM-4.7) | GLM Coding Plan対応 |

### クラウドプラットフォーム

| プロバイダー | 説明 |
|--------------|------|
| Amazon Bedrock | AWSのマネージドLLM |
| Azure OpenAI | Microsoft Azure経由 |

### ルーター / ゲートウェイ

| プロバイダー | 説明 |
|--------------|------|
| OpenRouter | 複数プロバイダーを一括管理 |
| Cloudflare AI Gateway | Cloudflare経由 |

### サブスクリプション / アイデンティティ連携

| プロバイダー | 説明 |
|--------------|------|
| GitHub Copilot | Copilot Tokenを使用 |

### OpenCode 公式推奨

| プロバイダー | 説明 |
|--------------|------|
| OpenCode Zen | Claude・GPT・Qwen 3 Coderなど |

## エージェントテンプレート

| エージェント | 役割 | 説明 |
|-------------|------|------|
| build | 実装・修正 | コードを書く、ファイルを編集する |
| general | 要約・雑談 | 軽量・高速、危険操作なし |
| explore | Web調査 | 最新情報の取得、外部調査 |
| oracle | 設計・判断 | 設計レビュー、方針決定、書き換えなし |
| sisyphus | オーケストレーター | 全体方針決定、司令塔 |

## 出力される opencode.json の例

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "llama_qwen/qwen",
  "provider": {
    "llama_qwen": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "(local)",
      "options": {
        "baseURL": "http://192.168.1.21:8083/v1"
      },
      "models": {
        "qwen": {
          "name": "Qwen2.5-Coder-14B",
          "tools": true
        }
      }
    }
  },
  "agent": {
    "build": {
      "mode": "primary",
      "description": "実装・修正（local Qwen / no web）",
      "model": "llama_qwen/qwen",
      "tools": {
        "read": true,
        "write": true,
        "edit": true,
        "bash": true,
        "grep": true,
        "glob": true,
        "list": true,
        "webfetch": false,
        "websearch": false,
        "codesearch": false
      }
    }
  }
}
```

## よくある質問

### Q: 既に opencode.json がある場合？
A: 新規作成モードを選ぶと、自動的にバックアップ（`.bak`）が作成されます。

### Q: 環境変数を使いたい
A: API Keyなどを入力する際、`$GOOGLE_API_KEY` のように入力すると環境変数が参照されます。

### Q: カスタムプロバイダーを追加したい
A: 現在はテンプレートから選択する形式ですが、将来のアップデートで完全カスタマイズを予定しています。

### Q: 設定をリセットしたい
A: opencode.json を削除してから再度 `opencode-wrapper` を実行してください。

## トラブルシューティング

### 「エラーが発生しました」と出る
- Node.js が正しくインストールされているか確認してください
- `node --version` でバージョンが表示されることを確認してください

### 設定が保存されない
- ディレクトリの書き込み権限を確認してください
- ディスク容量に余裕があるか確認してください

## 製作者

- 作成: OpenCode 設定作成ツール

## ライセンス

MIT
