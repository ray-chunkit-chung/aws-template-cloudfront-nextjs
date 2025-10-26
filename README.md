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
│   │   ├── dev.json                  # Dev environment config (deprecated)
│   │   ├── main.json                 # Production environment config (deprecated)
│   │   └── staging.json              # Staging environment config (deprecated)
│   ├── deploy.sh                     # Deployment script (merges templates)
│   ├── iam-policy-deployment.json    # IAM policy for deployment user
│   └── template.yaml                 # Resources to deploy
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

## TODO: Log strategy

Error Logging Strategy

1. Client-Side Error Tracking

   - Option A: AWS CloudWatch RUM (Recommended for AWS-native)
      - Pros: Native AWS integration, no third-party vendor
      - Cons: AWS-specific, less feature-rich than commercial solutions
      - Cost: Pay-per-event pricing
   - Option B: Sentry (Most Popular)
      - Pros: Excellent DX, source maps, session replay, performance monitoring
      - Cons: Third-party service, costs scale with volume
      - Best for: Production apps needing robust error tracking
   - Option C: LogRocket / Datadog RUM
      - Pros: Session replay, advanced analytics
      - Best for: Apps needing detailed user session analysis

2. Infrastructure-Level Logging

   ```yml
   # Add CloudFront access logging
   CloudFrontDistribution:
   Properties:
      DistributionConfig:
         Logging:
         Bucket: !Sub "${LogBucket}.s3.amazonaws.com"
         Prefix: cloudfront-logs/
         IncludeCookies: false
   ```

3. Next.js Error Handling
   Create error boundaries and global error handlers:

   Files to create:

   ```text
   app/error.tsx - App-level error boundary
   app/global-error.tsx - Root error boundary
   lib/logger.ts - Centralized logging utility
   middleware.ts - Server-side error tracking
   ```

💡 Real-World Example
Scenario: User clicks "Load Data" button → API fails

1. middleware.ts logs the incoming request
2. Component tries to fetch data → error occurs
3. error.tsx catches it, uses logger.ts to send to Sentry
4. User sees friendly error message with retry button
5. If error.tsx itself crashes → global-error.tsx catches it

```text
User Request
    ↓
┌─────────────────────────────┐
│ middleware.ts               │ ← Logs requests, auth checks
│ (Server-side, every request)│
└─────────────────────────────┘
    ↓
┌─────────────────────────────┐
│ app/layout.tsx              │
│   └─ global-error.tsx       │ ← Catches layout crashes (rare)
└─────────────────────────────┘
    ↓
┌─────────────────────────────┐
│ app/page.tsx                │
│   └─ error.tsx              │ ← Catches component errors (common)
└─────────────────────────────┘
    ↓
┌─────────────────────────────┐
│ lib/logger.ts               │ ← Used by ALL files above
│ (Centralized logging)       │    to send errors to monitoring
└─────────────────────────────┘
```

📊 Visual Comparison

```text
┌─────────────────────────────────────────────────────────────┐
│ TIER 1: Essential                                           │
├─────────────────────────────────────────────────────────────┤
│ app/error.tsx          ──► console.error()                  │
│ app/global-error.tsx   ──► console.error()                  │
│ lib/logger.ts          ──► console only                     │
│ middleware.ts          ──► ❌ Not implemented               │
│                                                             │
│ Cost: FREE | Setup: 30 min                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ TIER 2: Production-Ready ⭐ RECOMMENDED                     │
├─────────────────────────────────────────────────────────────┤
│ app/error.tsx          ──► logger.error() ──► Sentry        │
│ app/global-error.tsx   ──► logger.error() ──► Sentry        │
│ lib/logger.ts          ──► Routes to Sentry + CloudWatch    │
│ middleware.ts          ──► Logs requests + errors           │
│                                                             │
│ Cost: ~$20/mo | Setup: 2-3 hours                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ TIER 3: Advanced                                            │
├─────────────────────────────────────────────────────────────┤
│ app/error.tsx          ──► logger + session replay          │
│ app/global-error.tsx   ──► logger + PagerDuty alerts        │
│ lib/logger.ts          ──► Multi-provider + metrics         │
│ middleware.ts          ──► Performance + security tracking  │
│                                                             │
│ Cost: $50-200/mo | Setup: 1-2 days                          │
└─────────────────────────────────────────────────────────────┘
```
