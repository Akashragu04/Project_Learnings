
import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik, Form, ErrorMessage } from 'formik';
// import UploadModern from '../../common/UploadModern';
// import AppList from '../../common/AppList';
// import FileRow from '../../common/FileRow';
import { useDropzone } from 'react-dropzone';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { AppList } from '@crema';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import { ConfigAPI } from 'services/config';
import { commonValidationSchema } from '../Brochure/BrochureValid';
import PreviewContent from './PreviewContent';
import { commonInformationDetails, formValidationSizeMsg } from 'services/Constants';

const ContentForm = (props:any) => {
    const [editorState, setEditorState] = React.useState(null);
    const [oldImageFiles, setImageFiles] = React.useState('')
    const [oldUploadImageFiles, setUploadImageFiles] = React.useState(null)
    const [openPreviewContent, setPreviewContent] = React.useState(false)

    const dropzone = useDropzone({
        accept: ".jpg, .png",
        maxFiles: 1,
        maxSize:10000000
    });
    const { acceptedFiles } = dropzone;
    const [uploadedFiles, setUploadedFiles]: any = React.useState([]);

    React.useEffect(() => {
        if (props.initialValues) {
            if (props.initialValues.coverImage && props.initialValues.coverImage.supporting_files_url) {
                setImageFiles(props.initialValues.coverImage.supporting_files_url)
                setUploadImageFiles(props.initialValues.coverImage)
            } else {
                setImageFiles('')
            }
            if(props.initialValues.newsletter){
                setEditorState(props.initialValues.newsletter)
            }
        }
        if (props.resCommonUpload) {
            setUploadImageFiles(props.resCommonUpload)
            setImageFiles('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.resCommonUpload])

    const onPreviewContentData = () =>{
        setPreviewContent(true)
    }

    const closePreviewContentData = () =>{
        setPreviewContent(false)

    }
    React.useEffect(() => {
        setUploadedFiles(dropzone.acceptedFiles);
        if (dropzone.acceptedFiles.length) {
            onUploadImage(dropzone.acceptedFiles)
            setImageFiles('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropzone.acceptedFiles])

    const onUploadImage = (uploadedFilesData?: any) => {
        const formData = new FormData();
        if (uploadedFilesData.length) {
            for (const tcUpload in uploadedFilesData) {
                formData.append("file", uploadedFilesData[tcUpload]);
            }
            let postValues: any = {
                url: ConfigAPI.urlAboutFileUpload,
                files: formData
            }
            props.reqCommonUpload(postValues)
        }
    }

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
  return (
    <React.Fragment>         
    <Box sx={{ padding: 2 }}>
        <Formik
            initialValues={props.initialValues}
            validationSchema={commonValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
                if (values) {
                    let postValues: any = {
                        id:values.id,
                        title: values.title,
                        description: values.description,
                        coverImage: oldUploadImageFiles,
                        newsletter: editorState
                    }
                    props.onSubmit(postValues)
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
                    <Box sx={{ flexGrow: 1, width: '100%', marginTop: 5, padding:2 }}>
                        <Grid container rowSpacing={5} spacing={{ xs: 2, md: 3 }}  >
                            <Grid item xs={12} md={12}>
                                <FormControl variant="outlined" fullWidth margin='dense'>
                                    <TextField
                                        placeholder="Title"
                                        variant='outlined'
                                        label="Title"
                                        id='title'
                                        name="title"
                                        onChange={handleChange}
                                        value={values?.title}
                                        disabled={props.showViewContent}
                                    />
                                     <ErrorMessage name={`title`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <FormControl variant='outlined' fullWidth margin='dense'>
                                    <TextField
                                        placeholder="Description"
                                        variant='outlined'
                                        label="Description"
                                        id='description'
                                        rows={3}
                                        multiline
                                        onChange={handleChange}
                                        value={values?.description}
                                        disabled={props.showViewContent}
                                    />
                                    <ErrorMessage name={`description`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                </FormControl>
                            </Grid>
                            {
                                props.showViewContent?null:
                                <Grid item xs={12} md={12}>
                                <Box sx={{ color: '#ff0000', fontSize: 12, paddingLeft: 2, marginBottom:2 }}>{formValidationSizeMsg.fileUploadMaxSize}</Box>
                                <Typography sx={{ flex: 1 }} variant="h6" component="div">
                                    Cover Image
                                </Typography>
                                <FormControl variant="outlined" fullWidth margin='dense'>
                                    <UploadModern
                                        uploadText={commonInformationDetails.drapanddrop}
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
                            }
                            
                            {
                                            oldImageFiles ?
                                                <img src={oldImageFiles} alt="" style={{ width:'100%', height:500, padding:4, marginLeft:4 }} />
                                                : null
                                        }
                                        {
                                            props.showViewContent?null:
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
                        }
                        <Grid item xs={12} md={12} sx={{ padding: 1 }}>
                        <Button sx={{
                            position: "relative",
                            minWidth: 100,
                            marginRight: 2
                        }}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                onPreviewContentData()
                            }}
                            disabled={editorState?false:true}
                        >  Preview Contents </Button>
                                {
                                    openPreviewContent && editorState?
                                    <PreviewContent onOpen={openPreviewContent} onClose={closePreviewContentData} previewContentData={editorState?editorState:''}/>                                    
                                    :null
                                }
                                
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
                                props.onClose()
                            }}
                        >  Cancel </Button>
                        {
                            props.showViewContent?null:
                        <Button sx={{
                            position: "relative",
                            minWidth: 100,
                            marginRight: 2
                        }}
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={editorState !== null && oldUploadImageFiles !== null ? "disabled-btn" : ""}
                            disabled={editorState !== null && oldUploadImageFiles !== null ? false : true}
                            // disabled={props.showViewContent}
                        >  Submit </Button>
                    }
                    </Box>
                </Form>
            )}
        </Formik>


    </Box>
</React.Fragment>
   
  )
}

export default ContentForm