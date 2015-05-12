/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports"], function (require, exports) {
    exports.language = {
        displayName: 'ObjectPascal',
        name: 'objectpascal',
        mimeTypes: [],
        ignoreCase: true,
        defaultToken: '',
        lineComment: '//',
        blockCommentStart: '{',
        blockCommentEnd: '}',
        
        brackets: [            
            { token: 'delimiter.array', open: '[', close: ']' },
            { token: 'delimiter.parenthesis', open: '(', close: ')' },
            { token: 'delimiter.generic', open: '<', close: '>' },
            { token: 'keyword.tag-begin', open: 'begin', close: 'end' },
            { token: 'keyword.tag-begin', open: 'try', close: 'end' },
            { token: 'keyword.tag-begin', open: 'class', close: 'end' },
            { token: 'keyword.tag-begin', open: 'interface', close: 'end' },
            { token: 'keyword.tag-begin', open: 'unit', close: 'end' },
            { token: 'keyword.tag-begin', open: 'program', close: 'end' },
            { token: 'keyword.tag-if', open: 'if', close: 'then' },
            { token: 'keyword.tag-repeat', open: 'repeat', close: 'until' },
            { token: 'keyword.tag-do', open: 'while', close: 'do' },
            { token: 'keyword.tag-do', open: 'for', close: 'do' },
            { token: 'keyword.tag-do', open: 'on', close: 'do' },   
            { token: 'keyword.tag-do', open: 'with', close: 'do' },          
        ],

        textAfterBrackets: true,
        autoClosingPairs: [
          ['{', '}'], 
          ['[', ']'], 
          ['(', ')'], 
          ['\'', '\'']],
        
        // the default separators except `@$`
        wordDefinition: /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        keywords: [
            'ABSOLUTE',
            'ABSTRACT',
            'AND',
            'ARRAY',
            'ASM',
            'ASSEMBLER',
            'CASE',
            'CDECL',
            'CONST',
            'CONSTRUCTOR',
            'DESTRUCTOR',
            'DISPID',
            'DIV',
            'DISPINTERFACE',
            'DOWNTO',
            'ELSE',
            'EXCEPT',
            'EXPORTS',
            'EXTENDED',
            'EXTERNAL',
            'FAR',
            'FINALLY',
            'FINALIZATION',
            'FORWARD',
            'FUNCTION',
            'GOTO',
            'HELPER',
            'IMPLEMENTATION',
            'IN',
            'INDEX',
            'INHERITED',
            'INITIALIZATION',
            'INLINE',
            'INTERRUPT',
            'LABEL',
            'LIBRARY',
            'MESSAGE',
            'NEAR',
            'OBJECT',
            'OF',
            'OPERATOR',
            'OUT',
            'OVERLOAD',
            'OVERRIDE',
            'PACKED',
            'PRIVATE',
            'PROCEDURE',
            'PROPERTY',
            'PROTECTED',
            'PUBLIC',
            'PUBLISHED', 
            'READ',   
            'RECORD',
            'REFERENCE',
            'REINTRODUCE',
            'RESIDENT',
            'RESOURCESTRING',
            'SAFECALL',
            'SET',
            'STATIC',
            'STDCALL',
            'STRICT',
            'TO',
            'TYPE',
            'USES',
            'VAR',
            'VIRTUAL',
            'WHILE',
            'WRITE',
        ],
        
        tagwords: [
            'begin',
            'try',
            'unit',
            'class',
            'program',
            'interface',
            'if',
            'then',
            'repeat',
            'until',
            'while',
            'with',
            'do',
            'for',
            'on',
            'end'
        ],     
           
        operators: [
            '=',
            '>',
            '<',                                             
            '!',
            '~',
            '?',
            ':',            
            '+',
            '-',
            '*',
            '/',
            'div',
            'mod',
            'not',
            'and',
            'or',
            'xor',
            'shl',
            'shr',
            'is',
            'as', 
            '&',
            '^',
            '@',
            ':=',            
          ],
          
          flowchangers: [
            'exit',
            'continue',
            'break',
            'abort',
            'halt'
          ],
          
          warnings: [
            'assert',
            'deprecated',
            'experimental',
            'platform',
            'raise',
            'RunError',                                                
          ],
          
          types: [   
            'ansichar', 
            'ansistring',          
            'boolean',
            'byte',
            'cardinal',
            'char',
            'double',
            'dword',
            'file',
            'integer',
            'int64',
            'longint',
            'longword',
            'nativeint',
            'nativeuint',
            'pansichar',
            'pchar',
            'pwidechar',
            'pointer',
            'real',
            'shortint',
            'shortstring',
            'single',
            'smallint',
            'string',
            'widechar',
            'widestring',
            'word',             
          ],
          
          constants: [
             'true',
             'false', 
             'nil',
          ],  
          
          specialsymbols: [
             'self',
             'result',
          ],
                                      
          
        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        // The main tokenizer for our languages
        tokenizer: {
            root: [
                { include: '@whitespace' },
                [/[a-zA-Z_]\w*/, { cases: { 
                  '@tagwords': '@brackets',
                  '@operators': 'token.keyword.operator',
                  '@flowchangers': 'token.keyword.flow',
                  '@warnings': 'token.warn-token',
                  '@specialsymbols': 'token.key',
                  '@constants': 'token.number',    
                  '@types': 'token.type',
                  '@keywords': { token: 'keyword' }, 
                  '@default': 'identifier' } }],
                [/[()\[\]]/, '@brackets'],                                
                [/[<>](?!@symbols)/, '@brackets'],
                [/@symbols/, { cases: {   
                  '@operators': 'token.keyword.operator',
                  '@default': '' } }],
                [/@\s*[a-zA-Z_\$][\w\$]*/, 'number.hex'],
                [/\d*\d+[eE]([\-+]?\d+)?[fFdD]?/, 'number.float'],
                [/\d*\.\d+([eE][\-+]?\d+)?[fFdD]?/, 'number.float'],
                [/[\$][0-9a-fA-F_]*[0-9a-fA-F]?/, 'number.hex'],
                [/0[0-7_]*[0-7][Ll]?/, 'number.octal'],
                [/0[bB][0-1_]*[0-1][Ll]?/, 'number.binary'],
                [/\d+[fFdD]/, 'number.float'],
                [/\d+[lL]?/, 'number'],
                [/[;,.]/, 'delimiter'],
                [/'([^'\\]|\\.)*$/, 'string.invalid'],
                [/'/, 'string', '@string'],
                [/'[^\\']'/, 'string'],
                [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
                [/'/, 'string.invalid']
            ],
            whitespace: [
                [/[ \t\r\n]+/, ''],
                [/{(?!\$)/, 'comment', '@comment'],
                [/{\$/, 'annotation', '@compilerdirective'],                
                [/\(\*/, 'comment', '@braceasteriskcomment'],
                [/\/\/.*$/, 'comment'],
            ],
            
            comment: [
                [/[^}]+/, 'comment'],
                [/}/, 'comment', '@pop'],
                [/{/, 'comment'],                   
            ],
            
            braceasteriskcomment: [
                [/((?!\*\)).)+/, 'comment'],
                [/\*\)/, 'comment', '@pop'],
                [/\(\*/, 'comment'],                    
            ],     
            
            compilerdirective: [
                [/[^}]+/, 'annotation'],
                [/}/, 'annotation', '@pop'],
                [/{\$/, 'annotation'],                   
            ],                   

            string: [
                [/[^\\']+/, 'string'],
                [/@escapes/, 'string.escape'],
                [/\\./, 'string.escape.invalid'],
                [/'/, 'string', '@pop']
            ],
        },
    };
});
