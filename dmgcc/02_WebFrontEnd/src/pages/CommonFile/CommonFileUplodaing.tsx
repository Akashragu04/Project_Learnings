import React from 'react'
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { AppList } from '@crema';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import { useDropzone } from 'react-dropzone';
import { FormControl, Grid, InputLabel } from '@mui/material';
import { connect } from 'react-redux';
import { reqCommonUploadLandingPage } from 'saga/Actions/aboutus.action';
import { commonInformationDetails } from 'services/Constants';
// import { reqCommonUploadLandingPage } from 'saga/Actions';

const CommonFileUplodaing = (props: any) => {
    const dropzone = useDropzone({
        accept: "image/jpeg, image/png, .pdf,",
        maxFiles: 1,
        maxSize:10000000
    });
    const { acceptedFiles } = dropzone;
    const [uploadedFiles, setUploadedFiles]: any = React.useState([]);

    React.useEffect(() => {
        setUploadedFiles(dropzone.acceptedFiles);
       onUploadImage(dropzone.acceptedFiles)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropzone.acceptedFiles])

    React.useEffect(() => {
        if (props.resCommonUploadLandingPage) {
            props.setUploadedBrochure(props.resCommonUploadLandingPage)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.resCommonUploadLandingPage])


    const onDeleteUploadFile = (file?: any) => {
        acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
        setUploadedFiles([...acceptedFiles]);
        props.setUploadedBrochure([])
    };
    
const onUploadImage = (uploadedFilesData?: any) => {
    const formData = new FormData();
    if (uploadedFilesData.length) {
        for (const tcUpload in uploadedFilesData) {
            formData.append("file", uploadedFilesData[tcUpload]);
        }
        if(props.postURL){
            let postValues: any = {
                url: props.postURL,
                files: formData
            }
            props.reqCommonUploadLanding(postValues)
        }
    }
}

    return (
        <React.Fragment>
            <Grid item xs={12} md={12}>
                <FormControl variant="outlined" fullWidth margin='dense' sx={{ display: props.showViewContent ? 'none' : 'block' }}>
                    <InputLabel id={`rating`}>Upload</InputLabel>
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
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        resCommonUploadLandingPage: state.aboutUsDetails.resCommonUploadLandingPage,
    }
}

const mapDispatchToProps = (dispatch?: any) => {
    return {
      reqCommonUploadLanding: (getPostURL?: any) => dispatch(reqCommonUploadLandingPage(getPostURL)),
    }
    }

export default connect(mapStateToProps, mapDispatchToProps)(CommonFileUplodaing)
