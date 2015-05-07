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
            'AS',
            'ASM',
            'ASSEMBLER',
            'BEGIN',
            'CASE',
            'CONST',
            'CONSTRUCTOR',
            'DESTRUCTOR',
            'DISPID',
            'DIV',
            'DISPINTERFACE',
            'DO',
            'DOWNTO',
            'ELSE',
            'END',
            'EXCEPT',
            'EXPORTS',
            'EXTENDED',
            'EXTERNAL',
            'FAR',
            'FALSE',
            'FINALLY',
            'FINALIZATION',
            'FOR',
            'FORWARD',
            'FUNCTION',
            'GOTO',
            'HELPER',
            'IF',
            'IMPLEMENTATION',
            'IN',
            'INDEX',
            'INHERITED',
            'INITIALIZATION',
            'INLINE',
            'INTERFACE',
            'INTERRUPT',
            'IS',
            'LABEL',
            'LIBRARY',
            'MESSAGE',
            'MOD',
            'NAME',
            'NEAR',
            'NIL',
            'NOT',
            'OBJECT',
            'OF',
            'ON',
            'OR',
            'OUT',
            'OVERLOAD',
            'PACKED',
            'PRIVATE',
            'PROCEDURE',
            'PROGRAM',
            'PROPERTY',
            'PROTECTED',
            'PUBLIC',
            'PUBLISHED', 
            'READ',   
            'RECORD',
            'REFERENCE',
            'REPEAT',
            'RESIDENT',
            'RESOURCESTRING',
            'SAFECALL',
            'SET',
            'SHL',
            'SHR',
            'STATIC',
            'STDCALL',
            'STRICT',
            'THEN',
            'TO',
            'TRUE',
            'TRY',
            'TYPE',
            'UNIT',
            'UNTIL',
            'USES',
            'VAR',
            'VIRTUAL',
            'WHILE',
            'WRITE',
            'WITH',
            'XOR',
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
            'RunError',
            'raise',
            'deprecated',
            'experimental',
            'assert'
          ],
          
          types: [   
            'ansistring',          
            'boolean',
            'byte',
            'char',
            'double',
            'dword',
            'file',
            'integer',
            'int64',
            'pansichar',
            'pchar',
            'pwidechar',
            'pointer',
            'real',
            'shortstring',
            'single',
            'string',
            'widestring',
            'word',             
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
                  '@operators': 'keyword.operator',
                  '@flowchangers': 'token.keyword.flow',
                  '@warnings': 'token.warn-token',
                  '@types': 'token.type',
                  '@keywords': { token: 'keyword.$0' }, 
                  '@default': 'identifier' } }],
                [/[()\[\]]/, '@brackets'],                                
                [/[<>](?!@symbols)/, '@brackets'],
                [/@symbols/, { cases: {   
                  '@operators': 'keyword.operator',
                  '@default': '' } }],
                [/@\s*[a-zA-Z_\$][\w\$]*/, 'number.hex'],
                [/\d*\d+[eE]([\-+]?\d+)?[fFdD]?/, 'number.float'],
                [/\d*\.\d+([eE][\-+]?\d+)?[fFdD]?/, 'number.float'],
                [/0[xX][0-9a-fA-F_]*[0-9a-fA-F][Ll]?/, 'number.hex'],
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
