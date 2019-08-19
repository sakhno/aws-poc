# aws-poc

You should have GitHub OAuth token and repository secret for running this stack.

### For running from AWS cli:
1) Create local file with your github credentials:
```json
[
  {
    "ParameterKey": "GitHubOAuthToken",
    "ParameterValue": "token"
  },
  {
    "ParameterKey": "GitHubSecret",
    "ParameterValue": "sevret"
  }
]
```
2) Change path in /cloudformation/create.sh and /cloudformation/update.sh to the file from the previous step.
3) Run commands:
```bash
cd cloudformation
./create.sh
``` 
4) To delete stack use:
```bash
cd cloudformation
./delete.sh
```

### For running from AWS console (didn't checked):
Upload /cloudformation/cloudformation.yml to create new stack dialog and fill all credentials manualy