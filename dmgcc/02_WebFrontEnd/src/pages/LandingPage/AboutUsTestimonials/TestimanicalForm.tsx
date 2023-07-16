import React, { useState } from 'react'
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, Grid, Box, FormControl, Autocomplete, InputLabel } from '@mui/material';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { AppList } from '@crema';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import { useDropzone } from 'react-dropzone';
import { ratingList } from './TestimonicalTypes';
import { ConfigAPI } from 'services/config';
import { commonInformationDetails, formValidationSizeMsg } from 'services/Constants';

const TestimanicalForm = (props: any) => {
    const [getRating, setRating] = useState(null);
    const [oldImageFiles, setImageFiles] = React.useState('')
    const [oldUploadImageFiles, setUploadImageFiles] = React.useState(null)

    const onGetRating = (getImageValues) => {
        setRating(getImageValues)
    }
    React.useEffect(()=>{
if(props.getInitilValues && props.getInitilValues.rating !== ''){
    if(ratingList){
       let postValues:any = ratingList.find((item:any)=>item.label === props.getInitilValues.rating)
       if(postValues){           
    setRating(postValues)
       }
    }
}else{
    setRating(null)
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
                url: ConfigAPI.uploadTestmonialURL,
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
                            customername:values.customername,
                            description: values.description,
                            coverImage: oldUploadImageFiles,
                            rating:values.rating
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
                                                id={`customername`}
                                                name={`customername`}
                                                value={values?.customername}
                                                onChange={handleChange}
                                                disabled={props.showViewContent}
                                            />
                                            <ErrorMessage className="errormsg" name={`customername`} />
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
                                                disabled={props.showViewContent}
                                            />
                                            <ErrorMessage className="errormsg" name={`description`} />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl variant='standard' fullWidth margin='dense'>
                                            <Autocomplete
                                                onChange={(event: any, value: any) => {
                                                    setFieldValue("rating", value.label);
                                                    onGetRating(value)
                                                }}
                                                getOptionLabel={(option: any) => (option ? option.label : "")}
                                                id='rating'
                                                options={ratingList ?
                                                    ratingList : []}
                                                filterSelectedOptions
                                                value={getRating}
                                                renderInput={(params) => <TextField {...params} label='Rating' />}
                                                disabled={props.showViewContent}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        {
                                            props.showViewContent?
                                            null
                                            :
                                            <React.Fragment>
                                           
                                            <FormControl variant="outlined" fullWidth margin='dense'>
                                            <InputLabel id={`rating`}>Profile Image</InputLabel>
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

export default TestimanicalForm