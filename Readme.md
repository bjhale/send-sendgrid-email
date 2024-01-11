
<!-- action-docs-description -->
## Description

Send an email using Sendgrid
<!-- action-docs-description -->

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| --- | --- | --- | --- |
| from | The email address of the sender | `true` |  |
| to | The email address of the recipient | `true` |  |
| subject | The subject of the email | `true` |  |
| body_text | The body of the email in text format | `false` |  |
| body_html | The body of the email in HTML format | `false` |  |
| attachment | A file path to attach to the email | `false` |  |
| attachments | A YAML list/JSON array of file paths to attach to the email | `false` |  |
| sendgrid_api_key | The Sendgrid API key, may also be passed via env: SENDGRID_API_KEY | `false` |  |
<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| --- | --- |
| status | The status code returned by the Sendgrid API |
<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node20` action.
<!-- action-docs-runs -->