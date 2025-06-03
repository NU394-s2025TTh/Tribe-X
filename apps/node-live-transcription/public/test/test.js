const { createReadStream } = require('fs');
const { createClient, LiveTranscriptionEvents } = require("@deepgram/sdk");
const dotenv = require("dotenv");
dotenv.config();

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

describe('Deepgram response test',  () => {
  it('should contain the required keys in the correct shape', (done) => {
    const live = deepgram.listen.live({ smart_format: true, model: "nova-2" });

    live.on(LiveTranscriptionEvents.Open, () => {

      live.on(LiveTranscriptionEvents.Transcript, (data) => {
        try {
          // Validate the response shape
          expect(data).toHaveProperty('channel.alternatives[0].transcript');
          console.log("Response:",data);
          done(); 
        } catch (error) {
          done(error);
        }
      });

      const stream = createReadStream('public/test/preamble.wav');
      stream.on('data', (chunk) => {
        if(chunk.length > 0) {
          live.send(chunk);
          live.finish() // We only need to test one response
        }
      });
    });
  });
});

describe('copyTranscriptToClipboard', () => {
  beforeEach(() => {
    // Mock the clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    // Set up a mock transcript
    window.fullTranscript = `Speaker 1: Hello\n\nSpeaker 2: How are you?\n\n\nSpeaker 1: I'm fine, thank you.`;
  });

  it('copies cleaned transcript to clipboard', async () => {
    // Call the function
    window.copyTranscriptToClipboard();

    // Expected cleaned transcript
    const expectedTranscript = `Speaker 1: Hello\nSpeaker 2: How are you?\nSpeaker 1: I'm fine, thank you.`;

    // Assert that the clipboard API was called with the cleaned transcript
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expectedTranscript);
  });

  it('handles empty transcript gracefully', async () => {
    // Set an empty transcript
    window.fullTranscript = '';

    // Call the function
    window.copyTranscriptToClipboard();

    // Assert that the clipboard API was called with an empty string
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('');
  });

  it('handles transcript with only whitespace', async () => {
    // Set a whitespace-only transcript
    window.fullTranscript = `\n\n   \n`;

    // Call the function
    window.copyTranscriptToClipboard();

    // Assert that the clipboard API was called with an empty string
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('');
  });
});