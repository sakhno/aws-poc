#!/bin/bash
aws cloudformation create-stack --stack-name aws-poc-docker --template-body file://$PWD/cloudformation.yml --capabilities CAPABILITY_IAM --parameters file:///mnt/c/Users/Anton_Sakhno/Documents/aws_stack_parameters.json