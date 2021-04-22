import AbstractView from './abstract.js';

const createListsTemplate = () => {
  return '<section class="films"></section>';
};

export default class Lists extends AbstractView {
  getTemplate() {
    return createListsTemplate();
  }
}

