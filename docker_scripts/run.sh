#!/bin/bash
docker pull 101223776850.dkr.ecr.eu-west-2.amazonaws.com/aws-poc:latest
docker run -dit --name aws-poc -p 8080:80 aws-poc