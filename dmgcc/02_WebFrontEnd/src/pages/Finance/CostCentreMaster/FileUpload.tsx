import React from 'react'
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { AppList } from '@crema';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import { useDropzone } from 'react-dropzone';
import { commonInformationDetails, formValidationSizeMsg } from 'services/Constants';

const FileUpload = (props?: any) => {
    const [uploadFileTypes, setValue] = React.useState('oldFileUpload');
      /** File upload */
  const dropzone = useDropzone({
    accept: ".csv, application/vnd.ms-excel, text/csv",
    maxFiles: 5,
    maxSize:10000000
  });
  const { acceptedFiles } = dropzone;
  const [uploadedFiles, setUploadedFiles]: any = React.useState([]);

  
  React.useEffect(() => {
    setUploadedFiles(dropzone.acceptedFiles);
    setValue('oldFileUpload')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropzone.acceptedFiles])


  
  const onDeleteUploadFile = (file) => {
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...acceptedFiles]);
  };

    const goBack = () => {
        props.handleClose()
    }

    const initialValues: any = {
        upload_file_types: uploadFileTypes
    }

    // const handleChangeValues = (event) => {
    //     setValue(event.target.value);
    // };
    return (
        <Box sx={{ padding: 5 }}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);                    
                    const formData = new FormData();                      
                    for (let i = 0; i < uploadedFiles.length; i++) {
                        formData.append("file", uploadedFiles[i]);
                      }
                      const postInitialValues:any = {
                          file:formData,
                        //   types:uploadFileTypes
                      }
                      props.onSubmit(postInitialValues)
                    setSubmitting(false);
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
                            {/* <Box
                                sx={{
                                    textAlign: "center",
                                }}
                            >
                                <FormControl component='fieldset'>
                                    <RadioGroup row
                                        aria-label='gender'
                                        name='upload_file_types'
                                        value={uploadFileTypes}
                                        onChange={(e: any) => {
                                            setFieldValue('upload_file_types', e.target.value)
                                            handleChangeValues(e);
                                        }}>
                                        <FormControlLabel value='oldFileUpload' control={<Radio />} label='Old File Upload' />
                                        <FormControlLabel value='newFileUpload' control={<Radio />} label='New File Upload' />
                                    </RadioGroup>
                                </FormControl>
                            </Box> */}
                            <Box  sx={{
                                   marginTop:5,
                                }}>
                                
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
                            </Box>
                    
                            <Box
                                sx={{
                                    pt: 3,
                                    textAlign: "center",
                                }}
                            >

                                <Button
                                    sx={{
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
                                >
                                    Cancel
                                </Button>
                                <Button
                                    sx={{
                                        position: "relative",
                                        minWidth: 100,
                                        marginRight: 2
                                    }}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </Box>
    )
}

export default FileUpload;