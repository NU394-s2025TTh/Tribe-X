/**
 * @jest-environment jsdom
 */
import { describe, expect, beforeEach, test } from "vitest";
import "./client.js";

test('showEditableTranscript loads and renders without error', () => {
    document.body.innerHTML = '<div id="transcriptDisplay"></div>';
    window.fullTranscript = "Speaker 1: Hi\nSpeaker 2: Hello";
    expect(() => window.showEditableTranscript()).not.toThrow();
    
});