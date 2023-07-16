import React from 'react'
import { useDropzone } from 'react-dropzone';
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, FormControl } from '@mui/material';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { AppList } from '@crema';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import { ConfigAPI } from 'services/config';
import { commonInformationDetails, formValidationSizeMsg } from 'services/Constants';

export const VisionForm = (props:any) => {
    const [oldImageFiles, setImageFiles] = React.useState('')
    const [oldUploadImageFiles, setUploadImageFiles] = React.useState(null)

    const dropzone = useDropzone({
        accept: ".jgp, .png",
        maxFiles: 1,
        maxSize:10000000
    });
    const { acceptedFiles } = dropzone;
    const [uploadedFiles, setUploadedFiles]: any = React.useState([]);


React.useEffect(() => {
    if (props.getInitilValues) {
        if (props.getInitilValues.supporting_files && props.getInitilValues.supporting_files.supporting_files_url) {
            setImageFiles(props.getInitilValues.supporting_files.supporting_files_url)
            setUploadImageFiles(props.getInitilValues.supporting_files)
        } else {
            setImageFiles('')
        }
    }
    if (props.resCommonUpload) {
        setUploadImageFiles(props.resCommonUpload)
        setImageFiles('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.resCommonUpload])

    React.useEffect(() => {
        setUploadedFiles(dropzone.acceptedFiles);
        if (dropzone.acceptedFiles.length) {
            onUploadImage(dropzone.acceptedFiles)
            setImageFiles('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropzone.acceptedFiles])



    const onDeleteUploadFile = (file?: any) => {
        acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
        setUploadedFiles([...acceptedFiles]);
    };

    const onUploadImage = (uploadedFilesData?: any) => {
        const formData = new FormData();
        if (uploadedFilesData.length) {
            for (const tcUpload in uploadedFilesData) {
                formData.append("file", uploadedFilesData[tcUpload]);
            }
            let postValues: any = {
                url: ConfigAPI.missionVisonUploadURL,
                files: formData
            }
            props.reqCommonUpload(postValues)
        } else {
    
        }
    }

  return (
    <Box sx={{ padding: 5 }}>
    <Formik
        validateOnChange
        // innerRef={res => formikData = res}
        initialValues={props.getInitilValues}
        // validationSchema={validationSchemaTest}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            if (values) {
                let postValues: any = {
                    id: values.id,
                    description: values.description,
                    title: values.title,
                    model_name: "VISION",
                    supporting_files: oldUploadImageFiles,
                }
                props.onSubmit(postValues)
            }

        }}>
        {({ isSubmitting, values, errors, touched, setFieldValue, handleChange }) => {
            return (
                <Form
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box>
                        <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                                <FormControl variant="outlined" fullWidth margin='dense'>
                                    <TextField
                                        placeholder="Title"
                                        variant='outlined'
                                        label="Title"
                                        id={`title`}
                                        name={`title`}
                                        value={values?.title}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage className="errormsg" name={`title`} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl variant="outlined" fullWidth margin='dense'>
                                    <TextField
                                        placeholder="Description"
                                        variant='outlined'
                                        label="Description"
                                        id={`description`}
                                        name={`description`}
                                        multiline
                                        rows={3}
                                        value={values?.description}
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage className="errormsg" name={`description`} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                            <Box sx={{ color: '#ff0000', fontSize: 12, paddingLeft: 2, marginBottom:2 }}>{formValidationSizeMsg.fileUploadMaxSize}</Box>
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
                                                {
                                            oldImageFiles ?
                                                <img src={oldImageFiles} alt="" style={{ width: props.showViewContent?"100%":200, height: props.showViewContent?"auto":200 }} />
                                                : null
                                        }
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
                                props.handleClose()
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
            )
        }}
    </Formik>
</Box>
  )
}
