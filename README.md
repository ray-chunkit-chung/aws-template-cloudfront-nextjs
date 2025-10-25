# AWS CloudFront + Next.js Template

Next.js static site with automated AWS deployment pipeline.

Static Next.js app (React 19, TypeScript, Tailwind) deployed to AWS via S3 + CloudFront with automated CI/CD using GitHub Actions and CodePipeline.

Next.js 16 (static export) → S3 → CloudFront CDN  

GitHub Actions (infra) + AWS CodePipeline (app builds)

## Quick Start

```bash
npm install -g npm
npm install -g pnpm
pnpm install
pnpm dev
```

Visit: <https://d17gn5p8ox2ry2.cloudfront.net/>

## Initial AWS Setup

### 1. Prerequisites

- AWS account with appropriate permissions
- GitHub repository with code
- AWS CodeConnection to GitHub (get `CODESTAR_CONNECTION_ARN`)

### 2. Create IAM User with Required Permissions

The IAM user needs the following permissions. Resources are Wildcard. Use at your own **risk**.

`infra\iam-policy-deployment.json`

### 3. GitHub Repository Secrets

Add these in Settings → Secrets and variables → Actions:

**Secrets:**

```text
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_ACCOUNT_ID
AWS_REGION
CODESTAR_CONNECTION_ARN
```

**Variables:**

```text
STACK_NAME_PREFIX
```

## How Deployment Works

After variable setup, pushing to branch triggers:

1. **Infrastructure Changes** (GitHub Actions + CloudFormation)
   - Updates S3 buckets, CloudFront, CodePipeline
   - Triggered by changes to `infra/` directory
   - `./deploy.sh dev` is executed by github action

2. **Application Builds** (CodePipeline + CodeBuild)
   - Builds Next.js static export
   - Syncs to S3 and invalidates CloudFront cache
   - Triggered by any code push

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       ├── cleanup.yml               # Cleanup workflow
│       ├── deploy-auto.yml           # Auto-deploy infrastructure on push
│       └── deploy.yml                # Manual deployment workflow
│
├── infra/
│   ├── parameters/
│   │   ├── dev.json                  # Dev environment config
│   │   ├── prod.json                 # Production environment config
│   │   └── staging.json              # Staging environment config
│   ├── deploy.sh                     # Deployment script
│   └── template.yaml                 # CloudFormation infrastructure template
│
├── app/                              # Nextjs app files
├── public/
├── buildspec.yml
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Hosting:** AWS S3 (origin) + CloudFront (CDN)
- **CI/CD:** GitHub Actions, AWS CodePipeline, CodeBuild
- **IaC:** CloudFormation
