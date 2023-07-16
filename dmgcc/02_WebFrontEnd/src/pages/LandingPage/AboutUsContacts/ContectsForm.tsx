import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, FormControl, InputLabel } from '@mui/material';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { AppList } from '@crema';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import { useDropzone } from 'react-dropzone';
import { ConfigAPI } from 'services/config';
import { contactValidationSchema } from './ContactValidation';
import { commonInformationDetails, formValidationSizeMsg } from 'services/Constants';

const ContectsForm = (props:any) => {
    // const [getCoverImage, setCoverImage] = React.useState(null);
    const [oldImageFiles, setImageFiles] = React.useState('')
    const [oldUploadImageFiles, setUploadImageFiles] = React.useState(null)

    React.useEffect(() => {
        if (props.getInitilValues) {
            if (props.getInitilValues.coverImage && props.getInitilValues.coverImage.supporting_files_url) {
                setImageFiles(props.getInitilValues.coverImage.supporting_files_url)
                setUploadImageFiles(props.getInitilValues.coverImage)
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

    React.useEffect(()=>{
if(props.getInitilValues && props.getInitilValues.coverImage){
    // setCoverImage(props.getInitilValues.coverImage)
}else{
    // setCoverImage(null)
}
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const dropzone = useDropzone({
        accept: ".jpg, .png",
        maxFiles: 1,
        maxSize:10000000
    });
    const { acceptedFiles } = dropzone;
    const [uploadedFiles, setUploadedFiles]: any = React.useState([]);


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

    return (
        <Box sx={{ padding: 5 }}>
            <Formik
                validateOnChange
                // innerRef={res => formikData = res}
                initialValues={props.getInitilValues}
                validationSchema={contactValidationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (values) {
                        let postValues: any = {
                            id: values.id,
                            name:values.name,
                            department: values.department,
                            coverImage: oldUploadImageFiles,
                            email:values.email,
                            mobileno:values.mobileno
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
                                                placeholder="Name"
                                                variant='outlined'
                                                label="Name"
                                                id={`name`}
                                                name={`name`}
                                                value={values?.name}
                                                onChange={handleChange}
                                                disabled={props.showViewContent}
                                            />
                                            <ErrorMessage className="errormsg" name={`name`} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Department"
                                                variant='outlined'
                                                label="Department"
                                                id={`department`}
                                                name={`department`}
                                                value={values?.department}
                                                onChange={handleChange}
                                                disabled={props.showViewContent}
                                            />
                                            <ErrorMessage className="errormsg" name={`department`} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Email"
                                                variant='outlined'
                                                label="Email"
                                                id={`email`}
                                                name={`email`}
                                                value={values?.email}
                                                onChange={handleChange}
                                                disabled={props.showViewContent}
                                            />
                                            <ErrorMessage className="errormsg" name={`email`} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl variant="outlined" fullWidth margin='dense'>
                                            <TextField
                                                placeholder="Mobile No"
                                                variant='outlined'
                                                label="Mobile No"
                                                id={`mobileno`}
                                                name={`mobileno`}
                                                value={values?.mobileno}
                                                onChange={handleChange}
                                                disabled={props.showViewContent}
                                            />
                                            <ErrorMessage className="errormsg" name={`mobileno`} />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        {
                                            props.showViewContent?null:
                                            <React.Fragment>
                                            <Box sx={{ color: '#ff0000', fontSize: 12, paddingLeft: 2, marginBottom:2 }}>{formValidationSizeMsg.fileUploadMaxSize}</Box>
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                            <InputLabel id={`rating`}>Profile Image</InputLabel>
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
                                            </React.Fragment>
                                         
                                        }
                                
                                        {
                                            oldImageFiles ?
                                                <img src={oldImageFiles} alt="" style={{ width:200, height:250 }} />
                                                : null
                                        }
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ pt: 10, marginBottom:2, textAlign: "right", }} >

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

export default ContectsForm