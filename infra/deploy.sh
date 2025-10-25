#!/bin/bash

ENVIRONMENT=${1:-dev}
AWS_REGION=${AWS_REGION}
CODESTAR_CONNECTION_ARN=${CODESTAR_CONNECTION_ARN}
STACK_NAME_PREFIX=${STACK_NAME_PREFIX}
STACK_NAME="${STACK_NAME_PREFIX}-${ENVIRONMENT}"
FILE_BASED_PARAMETERS=$(jq -r '.[] | "\(.ParameterKey)=\(.ParameterValue)"' "parameters/${ENVIRONMENT}.json")


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

# Deploy with parameter overrides
aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name $STACK_NAME \
  --parameter-overrides $FILE_BASED_PARAMETERS CodeStarConnectionArn="$CODESTAR_CONNECTION_ARN" \
  --capabilities CAPABILITY_IAM \
  --region $AWS_REGION