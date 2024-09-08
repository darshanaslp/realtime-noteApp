// noteActions.test.js
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createNewNote, updateExistingNote } from './redux/actions/noteActions';
import { CREATE_NOTE, UPDATE_NOTE } from './redux/noteConstants';

// Mock dependencies
const mockStore = configureMockStore([thunk]);

describe('Note Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should dispatch CREATE_NOTE action when creating a new note', async () => {
    const noteTitle = 'Test Title';
    const noteContent = 'Test Content';

    await store.dispatch(createNewNote(noteTitle, noteContent));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: CREATE_NOTE,
      payload: { title: noteTitle, content: noteContent },
    });
  });

  it('should dispatch UPDATE_NOTE action when updating an existing note', async () => {
    const noteId = '123';
    const updatedTitle = 'Updated Title';
    const updatedContent = 'Updated Content';

    await store.dispatch(updateExistingNote(noteId, updatedTitle, updatedContent));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: UPDATE_NOTE,
      payload: { id: noteId, title: updatedTitle, content: updatedContent },
    });
  });
});
