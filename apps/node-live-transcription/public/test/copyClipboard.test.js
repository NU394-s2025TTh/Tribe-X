import { describe, it, beforeEach, expect, vi } from "vitest";

// Mock clipboard API
beforeEach(() => {
  global.navigator = {
    clipboard: {
      writeText: vi.fn(),
    },
  };

  global.window = Object.assign(global.window || {}, {
    copyTranscriptToClipboard: () => {
      const cleaned = (global.window.fullTranscript || "")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join("\n");
      global.navigator.clipboard.writeText(cleaned);
    },
  });

  global.window.fullTranscript = `Speaker 1: Hello\n\nSpeaker 2: How are you?\n\n\nSpeaker 1: I'm fine, thank you.`;
});

describe("copyTranscriptToClipboard", () => {
  it("copies cleaned transcript to clipboard", () => {
    global.window.copyTranscriptToClipboard();
    const expected = `Speaker 1: Hello\nSpeaker 2: How are you?\nSpeaker 1: I'm fine, thank you.`;
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(expected);
  });

  it("handles empty transcript", () => {
    global.window.fullTranscript = "";
    global.window.copyTranscriptToClipboard();
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith("");
  });

  it("handles whitespace-only transcript", () => {
    global.window.fullTranscript = `\n\n   \n`;
    global.window.copyTranscriptToClipboard();
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith("");
  });
});
