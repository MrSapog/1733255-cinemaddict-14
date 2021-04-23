import AbstractView from './abstract.js';

const createListsTemplate = () => {
  return '<section class="board"></section>';
};

export default class Board extends AbstractView {
  getTemplate() {
    return createListsTemplate();
  }
}
