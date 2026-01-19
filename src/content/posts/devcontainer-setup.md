---
title: VS Code Dev Containerで統一された開発環境を構築する方法
date: 2026-01-19
tags: [Docker, Dev Container, VS Code, 開発環境]
category: 開発環境
summary: Dev Containerを使用して、チーム全体で一貫性のある開発環境を簡単に構築する方法を解説します。
---

### VS Code Dev Containerで統一された開発環境を構築する方法

開発チームで「私の環境では動くのに...」という問題に直面したことはありませんか？Dev Containerを使用すれば、チーム全体で完全に統一された開発環境を構築でき、セットアップも数分で完了します。

### 1. Dev Containerとは？

Dev Container（Development Container）は、VS CodeとDockerを組み合わせて、コンテナ化された開発環境を提供する仕組みです。

**主な利点：**
- **環境の統一**: チーム全員が同じ開発環境で作業
- **迅速なセットアップ**: 新メンバーも数分で開発開始可能
- **クリーンな環境**: ホストマシンを汚さない
- **再現性**: 本番環境に近い環境で開発
- **ツールの共有**: VS Code拡張機能も統一

### 2. 前提条件

Dev Containerを使用するには、以下が必要です：

- **Visual Studio Code**: 最新版を推奨
- **Docker Desktop**: Docker環境が必要
  - Windows: Docker Desktop for Windows
  - macOS: Docker Desktop for Mac
  - Linux: Docker Engine
- **VS Code拡張機能**: Dev Containers

```bash
# VS Code拡張機能のインストール
code --install-extension ms-vscode-remote.remote-containers
```

### 3. 基本的なディレクトリ構造

Dev Containerの設定は`.devcontainer`ディレクトリに配置します：

```
project-root/
  ├── .devcontainer/
  │   ├── devcontainer.json    # Dev Containerの設定
  │   ├── Dockerfile           # コンテナイメージの定義
  │   └── docker-compose.yml   # 複数コンテナの場合（オプション）
  ├── src/
  └── package.json
```

### 4. 最小限の設定例

**React + Node.js開発環境**

**`.devcontainer/devcontainer.json`**

```json
{
  "name": "React Dev Container",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:18",
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "dsznajder.es7-react-js-snippets"
      ],
      "settings": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
      }
    }
  },
  "forwardPorts": [3000, 5173],
  "postCreateCommand": "npm install"
}
```

この設定だけで、Node.js 18の環境、必要な拡張機能、ポートフォワーディングが自動設定されます。

### 5. カスタムDockerfileを使用する

より細かい制御が必要な場合は、独自のDockerfileを作成します：

**`.devcontainer/Dockerfile`**

```dockerfile
FROM node:18-bullseye

# システムパッケージの更新とインストール
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    wget \
    vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# グローバルにnpmパッケージをインストール
RUN npm install -g pnpm@latest

# 作業ディレクトリの設定
WORKDIR /workspace

# ユーザーの作成（オプション、セキュリティ向上のため）
RUN useradd -m -s /bin/bash developer
USER developer
```

**`.devcontainer/devcontainer.json`**

```json
{
  "name": "Custom React Environment",
  "build": {
    "dockerfile": "Dockerfile",
    "context": ".."
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "dsznajder.es7-react-js-snippets",
        "bradlc.vscode-tailwindcss"
      ]
    }
  },
  "forwardPorts": [3000, 5173],
  "postCreateCommand": "pnpm install",
  "remoteUser": "developer"
}
```

### 6. 複数サービスの構成（Docker Compose）

データベースやAPIサーバーなど、複数のコンテナが必要な場合はDocker Composeを使用します：

**`.devcontainer/docker-compose.yml`**

```yaml
version: '3.8'

services:
  app:
    build:
      context: ..
      dockerfile: .devcontainer/Dockerfile
    volumes:
      - ..:/workspace:cached
    command: sleep infinity
    networks:
      - dev-network
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    restart: unless-stopped
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: developer
      POSTGRES_PASSWORD: password
      POSTGRES_DB: devdb
    networks:
      - dev-network
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    networks:
      - dev-network
    ports:
      - "6379:6379"

volumes:
  postgres-data:

networks:
  dev-network:
```

**`.devcontainer/devcontainer.json`（Docker Compose使用時）**

```json
{
  "name": "Full Stack Development",
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspace",
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "ms-azuretools.vscode-docker",
        "mtxr.sqltools",
        "mtxr.sqltools-driver-pg"
      ]
    }
  },
  "forwardPorts": [3000, 5432, 6379],
  "postCreateCommand": "npm install && npm run db:migrate"
}
```

### 7. devcontainer.jsonの主要設定項目

**基本設定：**

```json
{
  // コンテナ名
  "name": "My Dev Container",
  
  // 使用するイメージ
  "image": "mcr.microsoft.com/devcontainers/typescript-node:18",
  
  // または独自のDockerfile
  "build": {
    "dockerfile": "Dockerfile",
    "args": {
      "NODE_VERSION": "18"
    }
  }
}
```

**ポート転送：**

```json
{
  // ポートの自動転送
  "forwardPorts": [3000, 8080],
  
  // ポート属性の詳細設定
  "portsAttributes": {
    "3000": {
      "label": "Frontend",
      "onAutoForward": "notify"
    },
    "8080": {
      "label": "Backend API",
      "onAutoForward": "openBrowser"
    }
  }
}
```

**ライフサイクルコマンド：**

```json
{
  // コンテナ作成後に1度だけ実行
  "postCreateCommand": "npm install",
  
  // コンテナ起動時に毎回実行
  "postStartCommand": "npm run dev",
  
  // コンテナアタッチ時に実行
  "postAttachCommand": "echo 'Welcome to Dev Container!'"
}
```

**マウント設定：**

```json
{
  "mounts": [
    // SSH鍵をコンテナ内で使用
    "source=${localEnv:HOME}/.ssh,target=/home/node/.ssh,readonly,type=bind",
    
    // Git設定の共有
    "source=${localEnv:HOME}/.gitconfig,target=/home/node/.gitconfig,type=bind"
  ]
}
```

### 8. VS Code設定とエクステンション

**チーム全体で統一する拡張機能：**

```json
{
  "customizations": {
    "vscode": {
      "extensions": [
        // 必須拡張機能
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        
        // React開発
        "dsznajder.es7-react-js-snippets",
        "styled-components.vscode-styled-components",
        
        // ユーティリティ
        "eamodio.gitlens",
        "usernamehw.errorlens",
        "christian-kohler.path-intellisense",
        
        // テスト
        "orta.vscode-jest"
      ],
      "settings": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true
        },
        "eslint.validate": [
          "javascript",
          "javascriptreact",
          "typescript",
          "typescriptreact"
        ]
      }
    }
  }
}
```

### 9. 環境変数の管理

**方法1: devcontainer.jsonで設定**

```json
{
  "containerEnv": {
    "NODE_ENV": "development",
    "API_URL": "http://localhost:8080"
  }
}
```

**方法2: .envファイルを使用**

```json
{
  "runArgs": ["--env-file", ".devcontainer/.env"]
}
```

**`.devcontainer/.env`**

```env
NODE_ENV=development
DATABASE_URL=postgresql://developer:password@db:5432/devdb
REDIS_URL=redis://redis:6379
```

### 10. パフォーマンス最適化

**ボリュームマウントの最適化（macOS/Windows）：**

```json
{
  "mounts": [
    "source=${localWorkspaceFolder},target=/workspace,type=bind,consistency=cached"
  ]
}
```

**node_modulesを名前付きボリュームに（macOS/Windows）：**

```json
{
  "mounts": [
    "source=node-modules,target=/workspace/node_modules,type=volume"
  ]
}
```

### 11. 実践的な設定例

**フルスタックReact + Express + PostgreSQL環境：**

```json
{
  "name": "Full Stack React App",
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspace",
  
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "dsznajder.es7-react-js-snippets",
        "mtxr.sqltools",
        "mtxr.sqltools-driver-pg",
        "bradlc.vscode-tailwindcss",
        "ms-azuretools.vscode-docker"
      ],
      "settings": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        "sqltools.connections": [
          {
            "name": "Local PostgreSQL",
            "driver": "PostgreSQL",
            "server": "db",
            "port": 5432,
            "database": "devdb",
            "username": "developer",
            "password": "password"
          }
        ]
      }
    }
  },
  
  "forwardPorts": [3000, 5000, 5432],
  "portsAttributes": {
    "3000": {
      "label": "React Frontend",
      "onAutoForward": "openBrowser"
    },
    "5000": {
      "label": "Express API"
    }
  },
  
  "postCreateCommand": "npm install && cd client && npm install",
  "postStartCommand": "npm run db:migrate",
  
  "features": {
    "ghcr.io/devcontainers/features/github-cli:1": {},
    "ghcr.io/devcontainers/features/node:1": {
      "version": "18"
    }
  }
}
```

### 12. Dev Container Features

Microsoft提供の追加機能を簡単に組み込めます：

```json
{
  "features": {
    // GitHub CLI
    "ghcr.io/devcontainers/features/github-cli:1": {},
    
    // Docker in Docker
    "ghcr.io/devcontainers/features/docker-in-docker:2": {},
    
    // AWS CLI
    "ghcr.io/devcontainers/features/aws-cli:1": {},
    
    // kubectl
    "ghcr.io/devcontainers/features/kubectl-helm-minikube:1": {
      "version": "latest"
    }
  }
}
```

### 13. トラブルシューティング

**コンテナが起動しない：**

```bash
# Dockerログを確認
docker logs <container-id>

# Dev Containerのログを確認
# VS Code: Command Palette > "Dev Containers: Show Container Log"
```

**ポートが使用中：**

```json
{
  // ホスト側のポートを変更
  "portsAttributes": {
    "3000": {
      "hostPort": 3001  // 別のポートを使用
    }
  }
}
```

**パフォーマンスが遅い（macOS/Windows）：**

```json
{
  // ファイル同期を最適化
  "mounts": [
    "source=${localWorkspaceFolder},target=/workspace,consistency=cached"
  ],
  
  // node_modulesを除外
  "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind,consistency=cached",
  "mounts": [
    "source=myapp-node-modules,target=/workspace/node_modules,type=volume"
  ]
}
```

### 14. ベストプラクティス

1. **軽量なベースイメージを使用**
   - Alpine版やslim版を検討
   - 必要最小限のパッケージのみインストール

2. **レイヤーキャッシュを活用**
   - 変更頻度の低い命令を先に記述
   - apt-get updateとinstallを1行で実行

3. **セキュリティを考慮**
   - rootユーザーで実行しない
   - 機密情報は環境変数で管理
   - .gitignoreに.envを追加

4. **チーム全体で設定を共有**
   - .devcontainerをGitにコミット
   - READMEに使い方を記載

5. **バージョンを固定**
   - Node.jsやパッケージのバージョンを明示
   - 再現性を確保

### 15. CI/CDとの連携

Dev Containerの設定はCI環境でも再利用できます：

**GitHub Actions例：**

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Dev Container
        uses: devcontainers/ci@v0.3
        with:
          runCmd: |
            npm run test
            npm run build
```

### まとめ

Dev Containerを使用することで、以下のメリットが得られます：

- **一貫性のある開発環境**: 「私の環境では動く」問題を解消
- **迅速なオンボーディング**: 新メンバーが即座に開発開始
- **クリーンな環境分離**: ホストマシンに依存しない
- **チーム全体の生産性向上**: ツールや設定の統一

特にチーム開発やOSSプロジェクトでは、Dev Containerの導入により開発体験が大幅に向上します。この記事を参考に、ぜひプロジェクトにDev Containerを導入してみてください！
