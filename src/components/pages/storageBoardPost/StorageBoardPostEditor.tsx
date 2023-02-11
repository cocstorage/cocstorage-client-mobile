import { Editor } from 'cocstorage-ui-editor';

function StorageBoardPostEditor() {
  return (
    <Editor
      fullScreen
      hideLine
      customStyle={{
        flex: 1,
        flexDirection: 'column-reverse',
        overflow: 'hidden'
      }}
      toolbarCustomStyle={{
        padding: '0 20px'
      }}
      contentCustomStyle={{
        padding: '8px 20px',
        lineHeight: 1.75,
        overflowY: 'auto'
      }}
    />
  );
}

export default StorageBoardPostEditor;
