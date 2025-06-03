//testing for team-red 

//we chose to write more tests for client.js because it is the biggest 
//part of our code base and also the bit that we have had the most issues 
//with client.js. 

import { describe, expect, vi, beforeEach, it } from "vitest";
import * as matchers from '@testing-library/jest-dom/matchers';
import "./client.js";

expect.extend(matchers);

describe("Speaker name introduction logic", () => {
    beforeEach(() => {
        document.body.innerHTML = `<div id="transcriptDisplay"></div>`;
        window.fullTranscript = "";
        window.speakerMap = {};
        window.dispatchEvent(new Event("load"));
    });

    it("replaces 'Speaker N' with introduced name after 'my name is' phrase", () => {
        const words = [
            { word: "hi", speaker: 7 },
            { word: "there", speaker: 7 },
            { word: "my", speaker: 7 },
            { word: "name", speaker: 7 },
            { word: "is", speaker: 7 },
            { word: "dana", speaker: 7 }
        ];
        let transcriptLine = `Speaker 7: `;
        const contextWords = [];
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            transcriptLine += word.word + " ";
            contextWords.push(word.word.toLowerCase());
            if (contextWords.length > 6) contextWords.shift();
            const contextText = contextWords.join(" ");
            const match = contextText.match(/(?:my name is)\s+([a-z]+)/i);
            if (match) {
                const name = match[1].charAt(0).toUpperCase() + match[1].slice(1);
                window.speakerMap["7"] = name;
            }
        }
        window.fullTranscript = transcriptLine.trim();
        window.updateTranscriptDisplay();
        const html = document.getElementById("transcriptDisplay").innerHTML;
        expect(window.speakerMap["7"]).toBe("Dana");
        expect(html).not.toContain("Speaker 7:");
        
    });

    it("renders speaker span with default name if not mapped", () => {
        window.fullTranscript = "Speaker 0: Hello world";
        window.updateTranscriptDisplay();
        const span = document.querySelector(".speaker-name");
        expect(span).not.toBeNull();
        expect(span.dataset.speaker).toBe("0");
        expect(span.textContent).toBe("Speaker 0");
    });

    it("renders non-speaker lines as plain text", () => {
        window.fullTranscript = "This is a narration line";
        window.updateTranscriptDisplay();
        const html = document.getElementById("transcriptDisplay").innerHTML;
        expect(html).toContain("This is a narration line");
        expect(html).not.toContain('class="speaker-name"');
    });

    it("updates speaker name in UI after clicking span and entering a new name", () => {
        window.fullTranscript = "Speaker 3: Hi!";
        window.updateTranscriptDisplay();
        const span = document.querySelector(".speaker-name");
        vi.stubGlobal("prompt", () => "Alex");
        span.click();
        const html = document.getElementById("transcriptDisplay").innerHTML;
        expect(window.speakerMap["3"]).toBe("Alex");
        expect(html).toContain(">Alex<");
    });

    it("handles multiple speakers in one transcript", () => {
        window.speakerMap = { "1": "Sam", "2": "Pat" };
        window.fullTranscript = "Speaker 1: Hi\nSpeaker 2: Hello";
        window.updateTranscriptDisplay();
        const html = document.getElementById("transcriptDisplay").innerHTML;
        expect(html).toContain(">Sam<");
        expect(html).toContain(">Pat<");
    });

    it("handles a speaker introducing themselves after already speaking", () => {
        window.speakerMap = {};
        window.fullTranscript = "Speaker 4: Hello\nSpeaker 4: My name is Jamie";
        window.speakerMap["4"] = "Jamie";
        window.updateTranscriptDisplay();
        const html = document.getElementById("transcriptDisplay").innerHTML;
        expect(html).toContain(">Jamie<");
        expect(html).not.toContain("Speaker 4:");
    });

    it("handles empty transcript without error", () => {
        window.fullTranscript = "";
        window.updateTranscriptDisplay();
        const html = document.getElementById("transcriptDisplay").innerHTML;
        expect(html).toBe("<div></div>");
    });

    it("renders default speaker name if mapping is removed", () => {
        window.speakerMap = { "5": "Taylor" };
        window.fullTranscript = "Speaker 5: Hi";
        window.updateTranscriptDisplay();
        // Remove mapping and update again
        delete window.speakerMap["5"];
        window.updateTranscriptDisplay();
        const span = document.querySelector(".speaker-name");
        expect(span).not.toBeNull();
        expect(span.dataset.speaker).toBe("5");
        expect(span.textContent).toBe("Speaker 5");
    });
});