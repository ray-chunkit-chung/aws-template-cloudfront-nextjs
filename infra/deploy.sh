#!/bin/bash

ENVIRONMENT=${1:-dev}
AWS_REGION=${AWS_REGION}
CODESTAR_CONNECTION_ARN=${CODESTAR_CONNECTION_ARN}
STACK_NAME_PREFIX=${STACK_NAME_PREFIX}
GITHUB_REPO=${GITHUB_REPO}
GITHUB_BRANCH=${ENVIRONMENT}
STACK_NAME="${STACK_NAME_PREFIX}-${ENVIRONMENT}"
BUCKET_NAME=${STACK_NAME}
# FILE_BASED_PARAMETERS=$(jq -r '.[] | "\(.ParameterKey)=\(.ParameterValue)"' "parameters/${ENVIRONMENT}.json")

# Check if AWS Region is provided
if [ -z "$AWS_REGION" ]; then
  echo "ERROR: AWS_REGION environment variable is not set"
  exit 1
fi

# Check if Stack Name Prefix is provided
if [ -z "$STACK_NAME_PREFIX" ]; then
  echo "ERROR: STACK_NAME_PREFIX environment variable is not set"
  exit 1
fi

# Check if CodeStar Connection ARN is provided
if [ -z "$CODESTAR_CONNECTION_ARN" ]; then
  echo "ERROR: CODESTAR_CONNECTION_ARN environment variable is not set"
  exit 1
fi

# Check if GitHub Repo is provided
if [ -z "$GITHUB_REPO" ]; then
  echo "ERROR: GITHUB_REPO environment variable is not set"
  exit 1
fi

# Merge all template files using yq
echo "Merging CloudFormation templates..."
if ! command -v yq &> /dev/null; then
  echo "yq could not be found, installing..."
  sudo snap install yq
fi
yq eval-all '. as $item ireduce ({}; . * $item)' \
  templates/00-parameters.yaml \
  templates/01-s3-buckets.yaml \
  templates/02-cloudfront.yaml \
  templates/03-cicd-pipeline.yaml \
  templates/99-outputs.yaml \
  > template.yaml
echo "Template merged successfully"
echo ""

echo "==================================="
echo "Deployment Configuration"
echo "==================================="
echo "Stack Name:    $STACK_NAME"
echo "Environment:   $ENVIRONMENT"
echo "GitHub Branch: $GITHUB_BRANCH"
echo "GitHub Repo:   $GITHUB_REPO"
echo "Bucket Name:   $BUCKET_NAME"
echo "AWS Region:    $AWS_REGION"
echo "==================================="
echo ""

# Deploy with parameter overrides
aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name $STACK_NAME \
  --parameter-overrides BucketName="$BUCKET_NAME" GitHubRepo="$GITHUB_REPO" GitHubBranch="$GITHUB_BRANCH" CodeStarConnectionArn="$CODESTAR_CONNECTION_ARN" \
  --capabilities CAPABILITY_IAM \
  --region $AWS_REGION
