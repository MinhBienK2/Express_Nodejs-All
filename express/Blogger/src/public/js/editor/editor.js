// const ImageTool = window.ImageTool;
const test = document.querySelector('#test')

const editor = new EditorJS({
    holder: 'editorjs',
    autofocus: true,
    onReady: () => {
        console.log('Editor.js is ready to work!')
    },
    onChange: (api, event) => {
        console.log('Now I know that Editor\'s content changed!', event)
    },
    // readOnly: true,
    // inlineToolbar: ['link', 'marker', 'bold', 'italic'],
    // logLevel: 'ERROR',
    tools: {
        header: {
          class: Header,
          inlineToolbar: ['marker', 'link'],
          config: {
            placeholder: 'Header',
            levels: [1,2, 3, 4,5,6],
            defaultLevel: 1,
          },
          shortcut: 'CMD+SHIFT+H'
        },
        linkTool: {
            class: LinkTool,
            config: {
              endpoint: 'http://localhost:3000/', // Your backend endpoint for url data fetching,
            }
        },
        raw: RawTool,
        image: {
          class: SimpleImage,
          inlineToolbar: true
        },
        // image: {
        //     class: ImageTool,
        //     config: {
        //       endpoints: {
        //         byFile: 'http://localhost:8008/images/posts/', // Your backend file uploader endpoint
        //         byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        //       }
        //     }
        // },
        checklist: {
            class: Checklist,
            inlineToolbar: true,
        },
        list: {
            class: List,
            inlineToolbar: true,
            config: {
                defaultStyle: 'unordered'
            }
        },
        // embed: Embed,
        embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true
              }
            }
        },
        quote: Quote,
        linkTool: {
            class: LinkTool,
            config: {
              endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
            }
        },

    },
    data : {
      "time": 1652330200587,
      "blocks": [
          // {
          //     "id": "Mu-nMGKTlq",
          //     "type": "paragraph",
          //     "data": {
          //         "text": "hdifdsifjdsjsldajflkasdjlkf"
          //     }
          // },
          {
            type: "image",
            data: {
              url: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg"
            }
          }
      ],
      "version": "2.24.3"
  }
    // autosave: {
    //     delay: 1000
    // },
    // tools: {
    //     header: {
    //         class: Header,
    //         inlineToolbar: ['link']
    //     },
    //     list: {
    //         class: List,
    //         inlineToolbar: true
    //     },
    //     image: {
    //         class: ImageTool,
    //         config: {
    //             endpoints: {
    //                 byFile: 'http://localhost:3000/api/images',
    //                 byUrl: 'http://localhost:3000/api/images'
    //             }
    //         }
    //     },
    //     embed: {
    //         class: Embed,
    //         inlineToolbar: true
    //     },
    //     table: {
    //         class: Table,
    //         inlineToolbar: true
    //     },
    //     marker: {
    //         class: Marker,
    //         shortcut: 'Cmd+B'
    //     },
    //     code: {
    //         class: Code,
    //         shortcut: 'Cmd+Alt+C'
    //     },
    //     delimiter: {
    //         class: Delimiter,
    //         shortcut: 'Cmd+Alt+S'
    //     },
    //     quote: {
    //         class: Quote,
    //         shortcut: 'Cmd+Alt+Q'
    //     },
    //     warning: {
    //         class: Warning,
    //         shortcut: 'Cmd+Alt+W'
    //     },
    //     linkTool: {
    //         class: LinkTool,
    //         shortcut: 'Cmd+K'
    //     },
    //     checklist: {
    //         class: Checklist,
    //         shortcut: 'Cmd+Alt+L'
    //     },
        // @TODO
        // video: {
        //     class: Video,
        //     shortcut: 'Cmd+Alt+V'
        // },
        // @TODO
        // audio: {
        //     class: Audio,
        //     shortcut: 'Cmd+Alt+A'
        // },
        // @TODO
        // file: {
        //     class: File,
        //     shortcut: 'Cmd+Alt+F'
        // },
        // @TODO
        // html: {
        //     class: Html,
        //     shortcut: 'Cmd+Alt+H'
        // },
        // @TODO
        // codeblock: {
        //     class: Codeblock,
        //     shortcut: 'Cmd+Alt+C'
        // },
        // @TODO
        // math: {
        //     class: Math,
        //     shortcut: 'Cmd+Alt+M'
        // },
        // @TODO
        // template: {
        //     class: Template,
        //     shortcut: 'Cmd+Alt+T'
        // },
        // @TODO
        // stream: {
        //     class: Stream,
        //     shortcut: 'Cmd+Alt+S'
        // },
        // @TODO
        // warning: {
        //     class: Warning,
        //     shortcut: 'Cmd+Alt+W'
        // },
        // @TODO
        // map: {
        //     class: Map,
        //     shortcut: 'Cmd+Alt+M'
        // },
        // @TODO
        // math: {
        //     class: Math,
        //     shortcut: 'Cmd+Alt+M'
        // },
        // @TODO
        // template: {
        //     class: Template,
        //     shortcut: 'Cmd+Alt+T'
        // },
        // @TODO
        // stream: {
        //     class: Stream,
        //     shortcut: 'Cmd+Alt+S'
        // },
        // @TODO
        // warning: {
        //     class: Warning,
        //     shortcut: 'Cmd+Alt+W'
        // }
    // }
});

test.addEventListener('click',(e) => {
  editor.save().then((outputData) => {
    console.log('Article data: ', outputData)
  }).catch((error) => {
    console.log('Saving failed: ', error)
  });
})