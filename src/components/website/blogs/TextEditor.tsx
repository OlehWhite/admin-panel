import { useEffect, useState } from "react";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { Stack } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ state, setState }: any) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (state && typeof state.text === "string" && state.text.trim()) {
      const contentBlock = htmlToDraft(state.text);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        );
        setEditorState(EditorState.createWithContent(contentState));
      }
    }
  }, [state.id]);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setState((prevState: any) => ({
      ...prevState,
      text: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    }));
  };

  return (
    <Stack
      bgcolor="#fff"
      border="1px solid #000"
      p={2}
      borderRadius="5px"
      minHeight={400}
    >
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        mention={{
          separator: " ",
          trigger: "@",
          suggestions: [
            { text: "APPLE", value: "apple" },
            { text: "BANANA", value: "banana", url: "banana" },
            { text: "CHERRY", value: "cherry", url: "cherry" },
            { text: "DURIAN", value: "durian", url: "durian" },
            { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
            { text: "FIG", value: "fig", url: "fig" },
            { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
            { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
          ],
        }}
      />
    </Stack>
  );
};

export default TextEditor;
