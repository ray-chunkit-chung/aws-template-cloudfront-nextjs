#!/bin/bash

ENVIRONMENT=${1:-dev}
AWS_REGION=${AWS_REGION}
CODESTAR_CONNECTION_ARN=${CODESTAR_CONNECTION_ARN}
STACK_NAME_PREFIX=${STACK_NAME_PREFIX}
GITHUB_REPO=${GITHUB_REPO}
GITHUB_BRANCH=${ENVIRONMENT}
STACK_NAME="${STACK_NAME_PREFIX}-${ENVIRONMENT}"
BUCKET_NAME="${STACK_NAME_PREFIX}-s3-${ENVIRONMENT}"
# FILE_BASED_PARAMETERS=$(jq -r '.[] | "\(.ParameterKey)=\(.ParameterValue)"' "parameters/${ENVIRONMENT}.json")

# Check if environment variables are provided
if [ -z "$AWS_REGION" ]; then
  echo "ERROR: AWS_REGION environment variable is not set"
  exit 1
fi
if [ -z "$STACK_NAME_PREFIX" ]; then
  echo "ERROR: STACK_NAME_PREFIX environment variable is not set"
  exit 1
fi
if [ -z "$CODESTAR_CONNECTION_ARN" ]; then
  echo "ERROR: CODESTAR_CONNECTION_ARN environment variable is not set"
  exit 1
fi
if [ -z "$GITHUB_REPO" ]; then
  echo "ERROR: GITHUB_REPO environment variable is not set"
  exit 1
fi

# Display deployment configuration
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
