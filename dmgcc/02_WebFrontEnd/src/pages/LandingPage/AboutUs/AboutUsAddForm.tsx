import React from 'react'
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, FormControl, ButtonGroup, Typography } from '@mui/material';
import { AppList } from '@crema';
import { useDropzone } from 'react-dropzone';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { ConfigAPI } from 'services/config';
import { AboutUsValidationSchema } from './AboutValidation';
import { commonInformationDetails, formValidationSizeMsg } from 'services/Constants';

const AboutUsAddForm = (props: any) => {
    /** File upload */
    const dropzone = useDropzone({
        accept: 'image/jpeg, image/png',
        maxFiles: 1,
        maxSize:10000000
    });
    const { acceptedFiles } = dropzone;
    const [uploadedFiles, setUploadedFiles]: any = React.useState([]);
    const [oldImageFiles, setImageFiles] = React.useState('')
    const [oldUploadImageFiles, setUploadImageFiles] = React.useState(null)
    React.useEffect(() => {
        if (props.getInitilValues) {
            if (props.getInitilValues.supporting_file && props.getInitilValues.supporting_file.supporting_files_url) {
                setImageFiles(props.getInitilValues.supporting_file.supporting_files_url)
                setUploadImageFiles(props.getInitilValues.supporting_file)
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
    }, [dropzone.acceptedFiles]);

    const onDeleteUploadFile = (file) => {
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
                url: ConfigAPI.urlAboutFileUpload,
                files: formData
            }
            props.reqCommonUpload(postValues)
        } else {

        }
    }
    const goBack = () => {
        props.handleClose()
    }
    return (
        <Box sx={{ padding: 5 }}>
            <Formik
                validateOnChange
                // innerRef={res => formikData = res}
                initialValues={props.getInitilValues}
                validationSchema={AboutUsValidationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (values) {
                        let postValues: any = {
                            id: values.id,
                            description: values.description,
                            title: values.title,
                            supporting_file: oldUploadImageFiles,
                            sub_content: values.sub_content,
                            sub_list: values.sub_list
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
                   
                                        <UploadModern
                                            uploadText={commonInformationDetails.drapanddrop}
                                            dropzone={dropzone}
                                        />
                                         <Box sx={{ color: '#ff0000', fontSize: 12, paddingLeft: 2, marginBottom:2 }}>{formValidationSizeMsg.fileUploadMaxSize}</Box>
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
                                                <img src={oldImageFiles} alt="" style={{ width: 200, height: 200 }} />
                                                : null
                                        }
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ flexGrow: 1, width: '100%' }}>
                                <Typography
                                    component="div"
                                    sx={{
                                        color: (theme) => theme.palette.text.primary,
                                        fontSize: 14,
                                        marginTop: 2
                                    }}
                                >
                                    Daimler Plant Details
                                </Typography>
                                <FieldArray
                                    name="sub_content"
                                    render={({ insert, remove, push }) => (
                                        <>
                                            {values.sub_content && values.sub_content.length > 0 &&
                                                values.sub_content.map(
                                                    (fieldItem: any, index: any) => (
                                                        <Box key={index}>
                                                            <Grid container spacing={3}>
                                                                <Grid item xs={12} md={10}>
                                                                    <FormControl variant="outlined" fullWidth margin='dense'>
                                                                        <TextField
                                                                            placeholder="Content"
                                                                            variant='outlined'
                                                                            label="Content"
                                                                            id={`sub_content.${index}.content`}
                                                                            name={`sub_content.${index}.content`}
                                                                            onChange={handleChange}
                                                                            value={fieldItem?.content}
                                                                        />
                                                                        <ErrorMessage className="errormsg" name={`sub_content.${index}.content`} />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={2} md={1} sx={{ textAlign: 'center', marginTop: 5 }}>
                                                                    <ButtonGroup size='small' aria-label='small button group'>
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="inherit" type="button"
                                                                            onClick={() => {
                                                                                remove(index)
                                                                            }
                                                                            }
                                                                            disabled={values.sub_content.length <= 1 ? true : false}
                                                                        >
                                                                            -
                                                                        </Button>
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary" type="button"
                                                                            onClick={() =>
                                                                                push({
                                                                                    content: ""
                                                                                })
                                                                            }
                                                                        >
                                                                            <i className="material-icons">add</i>
                                                                        </Button>
                                                                    </ButtonGroup>

                                                                </Grid>
                                                                <Grid item xs={1} md={1}>

                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    ))}
                                        </>

                                    )} />
                            </Box>
                            <Box sx={{ flexGrow: 1, width: '100%' }}>
                                <Typography
                                    component="div"
                                    sx={{
                                        color: (theme) => theme.palette.text.primary,
                                        fontSize: 14,
                                        marginTop: 2
                                    }}
                                >
                                    Daimler History
                                </Typography>
                                <FieldArray
                                    name="sub_list"
                                    render={({ insert, remove, push }) => (
                                        <>
                                            {values.sub_list && values.sub_list.length > 0 &&
                                                values.sub_list.map(
                                                    (itemSubList: any, index: any) => (
                                                        <Box key={index}>
                                                            <Grid container spacing={3}>
                                                                <Grid item xs={12} md={10}>
                                                                    <FormControl variant="outlined" fullWidth margin='dense'>
                                                                        <TextField
                                                                            placeholder="Content"
                                                                            variant='outlined'
                                                                            label="Content"
                                                                            id={`sub_list.${index}.content`}
                                                                            name={`sub_list.${index}.content`}
                                                                            onChange={handleChange}
                                                                            value={itemSubList?.content}
                                                                        />
                                                                        <ErrorMessage className="errormsg" name={`sub_list.${index}.content`} />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={2} md={1} sx={{ textAlign: 'center', marginTop: 5 }}>
                                                                    <ButtonGroup size='small' aria-label='small button group'>
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="inherit" type="button"
                                                                            onClick={() => {
                                                                                remove(index)
                                                                            }
                                                                            }
                                                                            disabled={values.sub_list.length <= 1 ? true : false}
                                                                        >
                                                                            -
                                                                        </Button>
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary" type="button"
                                                                            onClick={() =>
                                                                                push({
                                                                                    content: ""
                                                                                })
                                                                            }
                                                                        >
                                                                            <i className="material-icons">add</i>
                                                                        </Button>
                                                                    </ButtonGroup>

                                                                </Grid>
                                                                <Grid item xs={1} md={1}>

                                                                </Grid>


                                                            </Grid>
                                                        </Box>
                                                    ))}


                                        </>

                                    )} />
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
                    )
                }}
            </Formik>
        </Box>
    )
}

export default AboutUsAddForm;