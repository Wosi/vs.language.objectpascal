/// <reference path="../declares.d.ts" />
'use strict';
define(["require", "exports", './objectpascalDef', 'monaco'], function (require, exports, languageDef, monaco) {
    monaco.Modes.registerMonarchDefinition('objectpascal', languageDef.language);
});
