// LanguageService.js
import * as monaco from 'monaco-editor';

const createLanguageService = () => {
  // Create a simple language service that suggests 'console' and 'log'
  monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: () => {
      return {
        suggestions: [
          {
            label: 'console',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'Log to console',
            insertText: 'console',
          },
          {
            label: 'log',
            kind: monaco.languages.CompletionItemKind.Method,
            documentation: 'Log message to console',
            insertText: 'log',
          },
        ],
      };
    },
  });
};

export default createLanguageService;
