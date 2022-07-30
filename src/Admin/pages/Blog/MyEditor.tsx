import {
  createEditor,
  Descendant,
  BaseEditor,
  Editor,
  Transforms,
  Node,
  Text,
} from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import CodeElement from './Custom/CodeElement';
import DefaultElement from './Custom/DefaultElement';
import Leaf from './Custom/Leaf';
type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
    Descendant: {
      type: string;
      text: string[];
    };
  }
}

function MyEditor() {
  const CustomEditor = {
    isBoldMarkActive(editor: any) {
      const [match] = Editor.nodes(editor, {
        match: (n: any) => n.bold === true,
        universal: true,
      }) as any;

      return !!match;
    },

    isCodeBlockActive(editor: any) {
      const [match] = Editor.nodes(editor, {
        match: (n: any) => n.type === 'code',
      }) as any;

      return !!match;
    },

    toggleBoldMark(editor: any) {
      const isActive = CustomEditor.isBoldMarkActive(editor);
      Transforms.setNodes(editor, { bold: isActive ? null : true } as any, {
        match: (n) => Text.isText(n),
        split: true,
      });
    },

    toggleCodeBlock(editor: any) {
      const isActive = CustomEditor.isCodeBlockActive(editor);
      Transforms.setNodes(editor, { type: isActive ? null : 'code' } as any, {
        match: (n) => Editor.isBlock(editor, n),
      });
    },
  };

  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;

      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  // Define a serializing function that takes a value and returns a string.
  const serialize = (value: any) => {
    return (
      value
        // Return the string content of each paragraph in the value's children.
        .map((n: any) => Node.string(n))
        // Join them all with line breaks denoting paragraphs.
        .join('\n')
    );
  };

  // Define a deserializing function that takes a string and returns a value.
  const deserialize = (string: any) => {
    // Return a value array of children derived by splitting the string.
    return string.split('\n').map((line: any) => {
      return {
        children: [{ text: line }],
      };
    });
  };

  const initialValue = useMemo(
    () =>
      deserialize(localStorage.getItem('content') as string) || [
        {
          type: 'paragraph',
          children: [{ text: 'A line of text in a paragraph.' }],
        },  
      ],
    []
  );

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type
        );
        console.log(value);
        const content = JSON.stringify(value);
        localStorage.setItem('content', serialize(content));
        if (isAstChange) {
          // Save the value to Local Storage.
        }
      }}
    >
      <div>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          // Replace the `onKeyDown` logic with our new commands.
          switch (event.key) {
            case '`': {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            }

            case 'b': {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            }
          }
        }}
      />
    </Slate>
  );
}
export default MyEditor;
