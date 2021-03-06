'use strict';

import * as sinon from 'sinon';
import { languages, commands, Disposable } from 'vscode';
import * as extension from '../src/extension';
import { context } from './mock/extension-context';
import { ImportCheckerCodeAction } from '../src/import-checker-code-action';

suite('Extension Tests', () => {
  test('register code action', () => {
    const spy = sinon
      .stub(languages, 'registerCodeActionsProvider')
      .callsFake(() => ({} as any));
    extension.activate(context);
    sinon.assert.calledWith(
      spy,
      ['typescript', 'javascript'],
      new ImportCheckerCodeAction()
    );
  });

  test('register command', () => {
    const spy = sinon
      .stub(commands, 'registerCommand')
      .callsFake(() => new Disposable(() => ({})));
    extension.activate(context);
    sinon.assert.calledWith(spy, 'extension.npmInstall');
  });
});
