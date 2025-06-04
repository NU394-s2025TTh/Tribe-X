# Work Item: Implement Copy to Clipboard Function

## Task
Implement a JavaScript function that copies the current transcript content to the clipboard, excluding empty lines.

## Acceptance Criteria

- Clicking the button calls the function
- Clipboard receives the correct text (excluding empty lines)
- Uses `navigator.clipboard.writeText` safely

## Dependencies
- Requires transcript content from `window.fullTranscript`
