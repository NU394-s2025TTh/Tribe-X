# Copilot Instructions

This is a template for Copilot instructions. You can use this to provide specific instructions to Copilot for generating code or comments.

# Instructions

- use javascript
- use html/css
- output in compatible prettier format (see [.prettierrc.cjs](.prettierrc.cjs)) for configuration.

# Styling

- use css styling in the [style.css] file

# Testing

Develop tests using the instructions in [copilot-test-instructions.md](.github/copilot-test-instructions.md).

In general, develop test first, generating vitests in the same file as the component.
Create describe blocks for each major set of tests.
Where possible share mock components between tests within a file without duplicating code.

# File Structure

This is the structure of the project:

- put shared ui components in a an nx library using the nx tool.

# Creating scenarios, stories, features, and workitems

Create these using nicely formatted markdown files. Use the following structure:

- put files in the [Backlog](docs/Backlog) folder
- put stories in the [Stories](docs/Backlog/Stories) folder
- put workitems in the [Workitems](docs/Backlog/Workitems) folder