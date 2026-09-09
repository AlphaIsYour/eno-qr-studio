# Security Policy

## Privacy & Security Architecture

Eno QR Studio is designed from the ground up with a **Zero Server Knowledge / 100% Client-Side** architecture:
* All QR code payloads (passwords, contact information, personal text, locations) are parsed and rendered directly in the user's browser.
* No telemetry, analytics, or user payload data is ever transmitted to remote servers.
* No third-party tracking scripts or remote ad networks are bundled into the application.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | Yes                |

## Reporting a Vulnerability

If you discover a potential security vulnerability (such as an issue with an npm dependency, XSS injection vector through SVG attributes, or sensitive data leak risk), please report it responsibly:

1. **Do not create a public GitHub issue.**
2. Report the vulnerability via GitHub Private Vulnerability Reporting or contact the maintainer directly through their GitHub profile.
3. Include details to help reproduce the issue, including environment, proof of concept, and potential impact.

Maintainers will acknowledge receipt within 48 hours and work with you to test and deploy a fix.
