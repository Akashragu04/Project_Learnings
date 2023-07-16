import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, FormControl, InputLabel, Typography, FormHelperText } from '@mui/material';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { AppList } from '@crema';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import { useDropzone } from 'react-dropzone';
import CommonFileUplodaing from 'pages/CommonFile/CommonFileUplodaing';
import { ConfigAPI } from 'services/config';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { commonValidationSchema } from '../Brochure/BrochureValid';
import { commonInformationDetails, formValidationSizeMsg } from 'services/Constants';

const NewsLetterForm = (props: any) => {
    const [getUploadImageFiles, setUploadImageFiles]: any = React.useState([]);
    const [getUploadCoverImage, setUploadCoverImage]: any = React.useState([]);
    const [getImageFiles, setImageFiles]: any = React.useState([]);
    const [getUploadCoverImageFiles, setUploadCoverImageFiles]: any = React.useState([]);

    React.useEffect(() => {
        if (props.getInitilValues) {
            if (props.getInitilValues.newsletter_file && props.getInitilValues.newsletter_file.supporting_file_view_url) {
                setImageFiles(props.getInitilValues.newsletter_file.supporting_file_view_url)
                setUploadImageFiles(props.getInitilValues.newsletter_file)
            } else {
                setImageFiles('')
            }
            if (props.getInitilValues.coverImage && props.getInitilValues.coverImage.supporting_files_url) {
                setUploadCoverImage(props.getInitilValues.coverImage.supporting_files_url)
                setUploadCoverImageFiles(props.getInitilValues.coverImage)
            } else {
                setUploadCoverImage('')
            }
        }
        if (props.resCommonUpload) {
            setUploadCoverImageFiles(props.resCommonUpload)
            setUploadCoverImage('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.resCommonUpload])

    const dropzone = useDropzone({
        accept: ".jpg, .png",
        maxFiles: 1,
        maxSize:10000000
    });

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
                url: ConfigAPI.urlNewsletterFileUpload,
                files: formData
            }
            props.reqCommonUpload(postValues)

        } else {

        }
    }
    const onDownloadFiles = (getURL?:any) => {
        if (getURL) {
            window.open(getURL, '_blank');
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
                            coverImage: getUploadCoverImageFiles,
                            newsletter_file: getUploadImageFiles
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
                                                disabled={props.showViewContent ? true : false}
                                            />
                                             <ErrorMessage name={`title`} >{msg => <FormHelperText error>{msg}</FormHelperText>}</ErrorMessage>
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
                                        </FormControl>
                                    </Grid>
                                
                                    <Grid item xs={12} md={12}>
                                           
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
                                        </FormControl>
                                        
                                      
                                    </Grid>
                                    {
                                            getUploadCoverImage ?
                                                <Box sx={{ width: '100%', height: '400px' }}>
                                                    <Typography
                                                        component="h3"
                                                        sx={{
                                                            color: (theme) => theme.palette.text.primary,
                                                            fontSize: 16,
                                                            marginBottom: 2
                                                        }}
                                                    >
                                                        Cover Image
                                                    </Typography>
                                                    <img style={{ width: '400px', border: '1px solid #ccc', borderRadius: 10, marginTop: 3, marginBottom: 3 }}
                                                        src={`${getUploadCoverImage ? getUploadCoverImage : '../assets/images/bg.jpg'}`} alt="" />
                                                </Box>
                                                : null
                                        }
                                    {
                                        props.showViewContent ? null :
                                            <CommonFileUplodaing setUploadedBrochure={onGetBrouchureInfo}
                                                showViewContent={props.showViewContent} postURL={ConfigAPI.uploadNewsletterURL} />
                                    }
                                    {
                                        getImageFiles ?
                                            <Box sx={{marginLeft:4, marginTop:2}}>
                                                <Button variant="outlined"
                                                    color="primary" onClick={()=>onDownloadFiles(getImageFiles)}><CloudDownloadIcon/></Button>
                                            </Box>

                                            : null
                                    }
                                    <Grid item xs={12} md={12} >
                                        {/* {
                                            oldImageFiles ?
                                                <img src={oldImageFiles} alt="" style={{ width:200, height:250 }} />
                                                : null
                                        } */}

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
                                {
                                    props.showViewContent?null:
                                    <Button sx={{
                                        position: "relative",
                                        minWidth: 100,
                                        marginRight: 2
                                    }}
                                    className={getUploadCoverImageFiles.length !== 0 && getUploadImageFiles.length !== 0 ? "disabled-btn" : ""}
                                            disabled={getUploadCoverImageFiles.length !== 0 && getUploadImageFiles.length !== 0 ? false : true}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
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

export default NewsLetterForm