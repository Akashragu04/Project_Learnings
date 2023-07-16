import React, { useEffect, useState } from 'react'
import { Box, Grid, Button, TextField } from "@mui/material";
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { AppList, AppLoader } from '@crema';
import { useDropzone } from 'react-dropzone';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { connect } from "react-redux"
import { setJDFileUploadAction, setJDFileUploadResetAction } from 'saga/Actions';
import FileRowCustom from '@crema/core/thirdParty/reactDropzone/components/FileRow/FileRowCustom';
import { commonInformationDetails, formValidationSizeMsg } from 'services/Constants';

const JDMappingUpload = (props?: any) => {
    const [jdDesc, setJdDesc]: any = useState('');
    const [editUploadedFiles, setEditUploadedFiles]: any = useState([]);
    const [uploadedFiles, setUploadedFiles]: any = useState([]);
    const dropzone = useDropzone({
        accept: 'image/jpeg, image/png, .csv, application/vnd.ms-excel, text/csv, .pdf, .doc',
        maxFiles: 5,
        maxSize:10000000
    });
    const { acceptedFiles } = dropzone;
    const { jdFileResponse }: any = props;
    
    // const { jdProjectDetail, isLoading, jdMappingDetail }: any = props;

    useEffect(() => {
        if (props.action === 'upload') {
            if (props.values.jd_information[props.index].supporting_files) {
                setEditUploadedFiles(props.values.jd_information[props.index].supporting_files);
            }
        } else if (props.action === 'create') {
            if (props.values.jd_information[props.index].jd_description) {
                setJdDesc(props.values.jd_information[props.index].jd_description);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (jdFileResponse && jdFileResponse.status) {
            props.resetJDFileUpload({})
            const jdFileInfoList = editUploadedFiles;
            jdFileResponse.data.forEach((element) => {
                jdFileInfoList.push(element)
            });
            props.onJDMapConditionalUpload(props.action, props.index, jdDesc, jdFileInfoList);
            props.onJDMapUploadClose(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jdFileResponse]);

    useEffect(() => {
        if (dropzone.acceptedFiles.length) {
            setUploadedFiles(dropzone.acceptedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropzone.acceptedFiles]);

    const onDeleteUploadFile = (file) => {
        acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
        setUploadedFiles([...acceptedFiles]);
    };
    const onDeleteExcistingUploadFile = (file) => {
    };

    const onJDMapBind = () => {
        if (props.action === 'upload') {
            if(dropzone.acceptedFiles.length) {
                const jdFileUploadFormData: any = new FormData();
                for (let i = 0; i < dropzone.acceptedFiles.length; i++) {
                    jdFileUploadFormData.append("file", dropzone.acceptedFiles[i]);
                }
                props.setJDFileUpload({ data: jdFileUploadFormData })
            }            
        } else if (props.action === 'create') {
            props.onJDMapConditionalUpload(props.action, props.index, jdDesc, '');
            props.onJDMapUploadClose(false);
        }

    }

    return (
        <AppDialog
            sxStyle={{
                "& .MuiDialog-paperWidthSm": {
                    maxWidth: 800,
                    width: "100%",
                    height: "auto"
                },
                "& .MuiTypography-h6": {
                    fontWeight: Fonts.SEMI_BOLD,
                    backgroundColor: "#00677F",
                    color: "#ffffff"
                },
            }}
            dividers
            open={props.show}
            onClose={() => props.onJDMapUploadClose(false)}
            title={(props.action === 'create') ? "Create JD" : "Upload JD"}
        >
            <Box sx={{ m: 2 }} >
            {(props.isLoading) && <AppLoader />}
                <Grid container spacing={{ xs: 2, md: 8 }} >
                    {(props.action === 'create') && <Grid item xs={12} md={12}>
                        <TextField
                            id='jd_description'
                            label='JD Description'
                            multiline
                            rows={4}
                            minRows={1}
                            maxRows={4}
                            variant='outlined'
                            fullWidth
                            onChange={(event) => setJdDesc(event.target.value)}
                            value={jdDesc}
                        />
                    </Grid>}
                    {(props.action === 'upload') && <Grid item xs={12} md={12}>
                   
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
                        {props.values.jd_information[props.index].supporting_files.map((fileInfo, fileIndex) => (
                            <React.Fragment key={fileIndex}>
                                <FileRowCustom
                                    key={fileIndex + fileInfo.supporting_files_url}
                                    file={fileInfo}
                                    onDeleteUploadFile={onDeleteExcistingUploadFile}
                                />
                            </React.Fragment>
                        ))}
                    </Grid>}
                </Grid>
                <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                        color="inherit" onClick={(event) => { props.onJDMapUploadClose(false); }}>Cancel</Button>
                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                        color="primary" onClick={(event) => { onJDMapBind(); }}>Save</Button>
                </Box>
            </Box>
        </AppDialog>
    )
}

const mapStateToProps = (state: any) => ({
    loading: state.jdmapping.loading,
    error: state.jdmapping.errors,
    isLoading: state.jdmapping.isLoading,
    jdFileResponse: state.jdmapping.fileResponse
})

const mapDispatchToProps = (dispatch: any) => ({    
    resetJDFileUpload: (data: any) => {
        dispatch(setJDFileUploadResetAction(data))
    },
    setJDFileUpload: (data: any) => {
        dispatch(setJDFileUploadAction(data))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(JDMappingUpload);