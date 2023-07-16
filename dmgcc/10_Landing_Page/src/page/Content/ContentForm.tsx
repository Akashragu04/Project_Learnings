
import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, FormControl, Grid, TextField } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik, Form } from 'formik';
import UploadModern from '../../common/UploadModern';
import AppList from '../../common/AppList';
import FileRow from '../../common/FileRow';
import { useDropzone } from 'react-dropzone';

const ContentForm = (props:any) => {
    const [editorState, setEditorState] = React.useState(null);

    const dropzone = useDropzone({
        // accept: ".csv, application/vnd.ms-excel, text/csv",
        maxFiles: 1
    });
    const { acceptedFiles } = dropzone;
    const [uploadedFiles, setUploadedFiles]: any = React.useState([]);


    React.useEffect(() => {
        setUploadedFiles(dropzone.acceptedFiles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropzone.acceptedFiles])



    const onDeleteUploadFile = (file?: any) => {
        acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
        setUploadedFiles([...acceptedFiles]);
    };

    const getCkEditorValue = (getData?: any) => {
        if (getData) {
            setEditorState(getData)
        } else {
            setEditorState(null)
        }
    }

    const goBack = () => {
        props.onCloseAddContent()
    }
  return (
    <React.Fragment>         
    <Box sx={{ padding: 2 }}>
        <Formik
            initialValues={props.initialValues}
            onSubmit={(values, { setSubmitting }) => {
                let uploadCoverImage: any;
                for (const filesDetails in uploadedFiles) {
                    uploadCoverImage = filesDetails;
                }
                if (values) {
                    let postValues: any = {
                        title: values.title,
                        description: values.description,
                        coverImage: uploadCoverImage,
                        newsletter: editorState
                    }
                    console.log(postValues, 'postValues...')
                }

            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <Form
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box sx={{ flexGrow: 1, width: '100%', marginTop: 5 }}>
                        <Grid container rowSpacing={5} spacing={{ xs: 2, md: 3 }}  >
                            <Grid item xs={12} md={6}>
                                <FormControl variant="outlined" fullWidth margin='dense'>
                                    <TextField
                                        placeholder="Title"
                                        variant='outlined'
                                        label="Title"
                                        id='title'
                                        name="title"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl variant='outlined' fullWidth margin='dense'>
                                    <TextField
                                        placeholder="Description"
                                        variant='outlined'
                                        label="Description"
                                        id='description'
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography sx={{ flex: 1 }} variant="h6" component="div">
                                    Cover Image
                                </Typography>
                                <FormControl variant="outlined" fullWidth margin='dense'>
                                    <UploadModern
                                        uploadText='Drag n drop some files here, or click to select files'
                                        dropzone={dropzone}
                                    />
                                    <aside>
                                        <AppList
                                            data={uploadedFiles}
                                            renderRow={(file, index) => (
                                                <FileRow
                                                    key={index + file.path}
                                                    file={file}
                                                    onDeleteUploadFile={onDeleteUploadFile}
                                                />
                                            )}
                                        />
                                    </aside>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12} sx={{ padding: 1 }}>
                                <Typography sx={{ flex: 1 }} variant="h6" component="div">
                                    Content
                                </Typography>
                                <FormControl variant="outlined" fullWidth margin='dense'>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={editorState?editorState:""}
                                        onReady={(editor: any) => {
                                            // You can store the "editor" and use when it is needed.
                                        }}
                                        config={{
                                            method: 'POST',
                                            ckfinder: {
                                                uploadUrl: "http://localhost:8000/api/fileupload/upload"
                                            },
                                            toolbar: ["undo", "redo", "bold", "italic", "blockQuote", "imageTextAlternative","heading", "imageStyle:full", "imageStyle:side", "link", "numberedList", "bulletedList", "mediaEmbed", "insertTable", "tableColumn", "tableRow", "mergeTableCells", 'code', 'codeBlock', 'fontColor'],
                                            shouldNotGroupWhenFull: true
                                        }}

                                        onChange={(event: any, editor: any) => {
                                            const data = editor.getData();
                                            getCkEditorValue(data)
                                        }}
                                        onBlur={(event: any, editor: any) => {
                                        }}
                                        onFocus={(event: any, editor: any) => {
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ pt: 10, textAlign: "right", }} >

                        <Button sx={{
                            position: "relative",
                            minWidth: 100,
                            marginRight: 2
                        }}
                            variant="contained"
                            color="inherit"
                            type="button"
                            onClick={() => {
                                goBack()
                            }}
                        >  Cancel </Button>
                        <Button sx={{
                            position: "relative",
                            minWidth: 100,
                            marginRight: 2
                        }}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >  Submit </Button>
                    </Box>
                </Form>
            )}
        </Formik>


    </Box>
</React.Fragment>
   
  )
}

export default ContentForm