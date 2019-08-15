#!/bin/bash
aws s3 rb s3://cloudformation-pipeline-with-docker-bucket --force
aws cloudformation delete-stack --stack-name aws-poc-docker
