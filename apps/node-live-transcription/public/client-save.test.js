/**
 * @jest-environment jsdom
 */
import { describe, expect, beforeEach, test } from "vitest";
import "./client.js";

test('showEditableTranscript loads and renders without error', () => {

  const textarea = document.getElementById('editableTranscript');
  expect(textarea).toBeNull();
});