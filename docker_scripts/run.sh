#!/bin/bash
docker stop aws-poc
docker rm aws-poc
docker run -dit --name aws-poc -p 80:80 101223776850.dkr.ecr.eu-west-2.amazonaws.com/aws-poc:latest