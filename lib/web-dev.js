'use babel';

import WebDevView from './web-dev-view';
import { CompositeDisposable } from 'atom';

export default {

  webDevView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.webDevView = new WebDevView(state.webDevViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.webDevView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'web-dev:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.webDevView.destroy();
  },

  serialize() {
    return {
      webDevViewState: this.webDevView.serialize()
    };
  },

  toggle() {
    console.log('WebDev was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
