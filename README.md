# AWS CloudFront + Next.js Template

**A production-ready Next.js static site with automated AWS deployment pipeline.**

## 🎯 What This Is

Static Next.js app (React 19, TypeScript, Tailwind) deployed to AWS via S3 + CloudFront with automated CI/CD using GitHub Actions and CodePipeline.

**Stack:** Next.js 16 (static export) → S3 → CloudFront CDN  
**CI/CD:** GitHub Actions (infra) + AWS CodePipeline (app builds)

## 🚀 Quick Start

```bash
npm install -g npm
npm install -g pnpm
pnpm install
pnpm dev
```

Visit: <https://d3mgvsp9c43deq.cloudfront.net/>

## 📦 Initial AWS Setup

### 1. Prerequisites

- AWS account with appropriate permissions
- GitHub repository with code
- AWS CodeConnection to GitHub (get `CODESTAR_CONNECTION_ARN`)

### 2. Create IAM User with Required Permissions

The IAM user (e.g., `cloudformation-user`) needs the following permissions:

**Required IAM Policy:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudFormationAccess",
      "Effect": "Allow",
      "Action": [
        "cloudformation:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "S3Access",
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CloudFrontAccess",
      "Effect": "Allow",
      "Action": [
        "cloudfront:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CodePipelineAccess",
      "Effect": "Allow",
      "Action": [
        "codepipeline:*",
        "codebuild:*",
        "codestar-connections:*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "IAMRoleManagement",
      "Effect": "Allow",
      "Action": [
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:GetRole",
        "iam:PassRole",
        "iam:AttachRolePolicy",
        "iam:DetachRolePolicy",
        "iam:PutRolePolicy",
        "iam:DeleteRolePolicy",
        "iam:GetRolePolicy"
      ],
      "Resource": "*"
    }
  ]
}
```

**How to apply:**

1. Go to AWS Console → IAM → Users → `cloudformation-user`
2. Click "Add permissions" → "Create inline policy"
3. Paste the JSON above
4. Name it `CloudFormationDeploymentPolicy`

### 3. GitHub Repository Secrets

Add these in **Settings → Secrets and variables → Actions**:

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

## 🔄 How Deployment Works

After variable setup, pushing to branch triggers:

1. **Infrastructure Changes** (GitHub Actions + CloudFormation)
   - Updates S3 buckets, CloudFront, CodePipeline
   - Triggered by changes to `infra/` directory
   - `./deploy.sh dev` is executed by github action

2. **Application Builds** (CodePipeline + CodeBuild)
   - Builds Next.js static export
   - Syncs to S3 and invalidates CloudFront cache
   - Triggered by any code push

## 📁 Project Structure

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
