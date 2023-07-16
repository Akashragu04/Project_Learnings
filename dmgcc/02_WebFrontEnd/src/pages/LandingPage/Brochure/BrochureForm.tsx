import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, FormControl, InputLabel, Typography, FormHelperText } from '@mui/material';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { AppList } from '@crema';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import { useDropzone } from 'react-dropzone';
import CommonFileUplodaing from 'pages/CommonFile/CommonFileUplodaing';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Link } from 'react-router-dom';
import { ConfigAPI } from 'services/config';
import { commonValidationSchema } from './BrochureValid';
import { commonInformationDetails, formValidationSizeMsg } from 'services/Constants';

const BrochureForm = (props: any) => {
    const [getUploadImageFiles, setUploadImageFiles]: any = React.useState([]);
    const [getUploadCoverImage, setUploadCoverImage]: any = React.useState<any>([]);
    const [getImageFiles, setImageFiles]: any = React.useState([]);
    const [getUploadCoverImageFiles, setUploadCoverImageFiles]: any = React.useState([]);

    React.useEffect(() => {
        if(props.getInitilValues && props.getInitilValues.brochureFile ==='' && props.getInitilValues.supporting_file ===''){
            setUploadImageFiles([])
            setUploadCoverImageFiles([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (props.getInitilValues) {
            if (props.getInitilValues.brochureFile && props.getInitilValues.brochureFile.supporting_files_url) {
                setImageFiles(props.getInitilValues.brochureFile.supporting_files_url)
                setUploadImageFiles(props.getInitilValues.brochureFile)
            } else {
                setImageFiles('')
            }
            if (props.getInitilValues.supporting_files && props.getInitilValues.supporting_files.supporting_files_url) {
                setUploadCoverImage(props.getInitilValues.supporting_files.supporting_files_url)
                setUploadCoverImageFiles(props.getInitilValues.supporting_files)
            } else {
                setUploadCoverImage('')
            }
        }

        if (props.resCommonUpload) {
            setUploadCoverImageFiles(props.resCommonUpload)
            setUploadCoverImage(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.resCommonUpload])

    const dropzone = useDropzone({
        accept: ".jpg, .png",
        maxFiles: 1,
        maxSize:10000000
    });

    const onOpenBrochureFile = (getValues?: any) => {
        window.open(getValues, '_blank')
    }

    const { acceptedFiles } = dropzone;
    const [uploadedFiles, setUploadedFiles]: any = React.useState([]);

    const onGetBrouchureInfo = (getInfoData: any) => {
        setUploadImageFiles(getInfoData)
        setImageFiles('')
    }
    React.useEffect(() => {
        setUploadedFiles(dropzone.acceptedFiles);
        onUploadImage(dropzone.acceptedFiles)
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
                url: ConfigAPI.broucherUploadURL,
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
                validationSchema={commonValidationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (values) {
                        let postValues: any = {
                            id: values.id,
                            title: values.title,
                            description: values.description,
                            supporting_file: getUploadCoverImageFiles,
                            brochureFile: getUploadImageFiles
                        }
                        props.onSubmit(postValues)
                    }

                }}>
                {({ isSubmitting, values, errors, touched, isValid, dirty, setFieldValue, handleChange }) => {
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
                                                disabled={props.showViewContent ? true : false}
                                            />
                                            <ErrorMessage name={`title`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                            {/* <ErrorMessage className="errormsg" name={`title`} /> */}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl variant="outlined" fullWidth margin='dense' >
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
                                                disabled={props.showViewContent ? true : false}
                                            />
                                            <ErrorMessage name={`description`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
                                            {/* <ErrorMessage className="errormsg" name={`description`} /> */}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        {
                                            props.showViewContent ? null :
                                            <React.Fragment>
                                            
                                            <FormControl variant="outlined" fullWidth margin='dense' sx={{ display: props.showViewContent ? 'none' : 'block' }}>
                                                    <InputLabel id={`rating`}>Cover Image</InputLabel>
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
                                                        getUploadCoverImageFiles === null ?
                                                            <FormHelperText error>Please upload cover image</FormHelperText> : null
                                                    }
                                                </FormControl>
                                            </React.Fragment>
                                               
                                        }
                                        {
                                            !!getUploadCoverImage ?
                                                <img src={getUploadCoverImage?getUploadCoverImage:''} alt="" style={{ width: 200, height: 250 }} />
                                                : null
                                        }
                                    </Grid>
                                    {
                                        props.showViewContent ? null :
                                            <CommonFileUplodaing setUploadedBrochure={onGetBrouchureInfo}
                                                showViewContent={props.showViewContent} postURL={ConfigAPI.broucherUploadURL} />
                                    }
                                    {
                                        getUploadImageFiles === null ?
                                            <React.Fragment>
                                                <Box sx={{ paddingLeft: 4 }}>
                                                    <FormHelperText error>Please upload brochure file</FormHelperText>
                                                </Box>
                                            </React.Fragment>
                                            : null
                                    }

                                    {
                                        getImageFiles ?
                                            <Grid item xs={12} md={12} >
                                                <Box sx={{ marginTop: 5 }}>
                                                    <Typography
                                                        component="h3"
                                                        sx={{
                                                            color: (theme) => theme.palette.text.primary,
                                                            fontSize: 16,
                                                            marginBottom: 2
                                                        }}
                                                    >
                                                        Brochure
                                                    </Typography>
                                                    <Link to={"#"} target="_blank" onClick={() => onOpenBrochureFile(getImageFiles)}>
                                                        <SystemUpdateAltIcon />
                                                    </Link>
                                                </Box>
                                            </Grid> : null
                                    }
                                </Grid>
                            </Box>

                            <Box sx={{ pt: 10, textAlign: "right", marginBottom: 4 }} >

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
                                {/* {
                                    props.showViewContent === true ?
                                        <Button sx={{
                                            position: "relative",
                                            minWidth: 100,
                                            marginRight: 2
                                        }}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className={getUploadCoverImageFiles !== null && getUploadImageFiles !== null ? "disabled-btn" : ""}
                                            disabled={getUploadCoverImageFiles !== null && getUploadImageFiles !== null ? false : true}
                                        // disabled={props.showViewContent && !getUploadCoverImageFiles && !getUploadImageFiles?true:false}
                                        >  Submit </Button>
                                        : null

                                } */}
                                {
                                    props.showViewContent === true ? null :
                                        <Button sx={{
                                            position: "relative",
                                            minWidth: 100,
                                            marginRight: 2
                                        }}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className={getUploadCoverImageFiles.length !== 0 && getUploadImageFiles.length !== 0 ? "disabled-btn" : ""}
                                            disabled={getUploadCoverImageFiles.length !== 0 && getUploadImageFiles.length !== 0 ? false : true}
                                        // disabled={props.showViewContent && !getUploadCoverImageFiles && !getUploadImageFiles?true:false}
                                        >  Submit </Button>

                                }

                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </Box>
    )
}

export default BrochureForm