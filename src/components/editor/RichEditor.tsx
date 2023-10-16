// https://jpuri.github.io/react-draft-wysiwyg/#/docs

import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from 'react';


const toolbarOptions = {
    options: ['blockType', 'list', 'link'],
}

const RichEditor = () => {

    const [editorState, setEditorState] = useState<any>()

    const onEditorStateChange = (state: any) => {
        setEditorState(state)
    }

    return <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={toolbarOptions}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
    />
}

export default RichEditor