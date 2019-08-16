#!/bin/bash
$(aws ecr get-login --region eu-west-2 --no-include-email)
docker pull 101223776850.dkr.ecr.eu-west-2.amazonaws.com/aws-poc:latest
docker run -dit --name aws-poc -p 80:80 101223776850.dkr.ecr.eu-west-2.amazonaws.com/aws-poc:latest