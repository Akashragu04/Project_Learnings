import React, { useEffect, useState } from 'react'
import { Box, Grid, Button, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import AppDialog from "@crema/core/AppDialog";
import { Fonts } from "shared/constants/AppEnums";
import { AppList, AppLoader } from '@crema';
import { useDropzone } from 'react-dropzone';
import FileRow from '@crema/core/thirdParty/reactDropzone/components/FileRow';
import UploadModern from '@crema/core/thirdParty/reactDropzone/components/UploadModern';
import { connect } from "react-redux"
import { reqBillingcycle, setCommonFileUploadAction, setCommonUploadResetAction } from 'saga/Actions';
import { toast } from 'react-toastify';
import { commonInformationDetails, formValidationSizeMsg } from 'services/Constants';

const SlaUpload = (props?: any) => {
    const [billingCycle, setBillingCycle]: any = useState('');
    const [uploadedFiles, setUploadedFiles]: any = useState([]);
    const dropzone = useDropzone({
        accept: '.pdf',
        maxFiles: 1,
        maxSize: 10000000
    });
    const { acceptedFiles } = dropzone;

    const { BillingcycleData, commonFileResponse }: any = props;

    useEffect(() => {
        props.resetCommonFileUpload();
        props.getBillingcycle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (dropzone.acceptedFiles.length) {
            setUploadedFiles(dropzone.acceptedFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropzone.acceptedFiles]);


    useEffect(() => {
        if (commonFileResponse && commonFileResponse.status) {
            let slaResponse: any = {};
            slaResponse['billing_cycle'] = billingCycle;
            slaResponse['file'] = commonFileResponse.data;
            slaResponse['project_id'] = props.projectId;
            props.slaUploadSubmit(slaResponse)
            props.resetCommonFileUpload();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commonFileResponse]);

    const onDeleteUploadFile = (file) => {
        acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
        setUploadedFiles([...acceptedFiles]);
    };

    const onSLAUploadData = () => {
        if (billingCycle) {
            if (dropzone.acceptedFiles.length) {
                const fileUploadFormData: any = new FormData();
                for (let i = 0; i < dropzone.acceptedFiles.length; i++) {
                    fileUploadFormData.append("file", dropzone.acceptedFiles[i]);
                }
                props.setCommonFileUpload({ data: fileUploadFormData })
            }
        } else {
            toast.warn("Please choose the Billing Cycle", { position: toast.POSITION.BOTTOM_RIGHT })
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
            onClose={() => {
                props.onSLAUploadClose(false);
                props.resetCommonFileUpload();
            }}
            title={"Upload C4D SLA"}
        >
            <Box sx={{ m: 2 }} >
                {(props.loading) && <AppLoader />}
                <Grid container spacing={{ xs: 2, md: 8 }} >
                    <Grid item xs={12} md={12}>
                       
                        <UploadModern
                            uploadText={commonInformationDetails.drapanddrop}
                            dropzone={dropzone}
                        />
                         <Box sx={{ color: '#ff0000', fontSize: 12, paddingLeft: 2, marginBottom: 2 }}>{formValidationSizeMsg.fileUploadMaxSize}</Box>
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
                        <Box sx={{ display: 'flex', marginTop: 2 }}>Note: <Box sx={{ color: '#ff0000', marginLeft: 2, fontSize: 14 }}>please upload only approved C4D SLAs in PDF Format</Box></Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box>
                        <FormControl fullWidth component='fieldset' variant='outlined'>
                            <InputLabel id={`billing_cycle-label`}>Billing Cycle</InputLabel>
                            <Select
                                fullWidth
                                labelId={`billing_cycle-label`}
                                id={`billing_cycle-label-standard`}
                                name={`billing_cycle`}
                                value={billingCycle}
                                onChange={(event) => setBillingCycle(event.target.value)}
                                label='Billing Cycle'>
                                <MenuItem value=''><em>None</em></MenuItem>
                                {(BillingcycleData && BillingcycleData.length) && BillingcycleData.map((option, index) => (
                                    <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ pt: 3, textAlign: "right", marginTop: 8 }}>
                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                        color="inherit" onClick={(event) => {
                            props.onSLAUploadClose(false);
                            props.resetCommonFileUpload();
                        }}>Cancel</Button>
                    <Button sx={{ position: "relative", minWidth: 100, marginRight: 2 }} variant="contained"
                        color="primary" onClick={onSLAUploadData}>Save</Button>
                </Box>
            </Box>
        </AppDialog>
    )
}

const mapStateToProps = (state: any) => ({
    BillingcycleData: state.bizCaseSLAProcess.BillingcycleData,
    loading: state.common.loading,
    commonFileResponse: state.common.fileResponse
})

const mapDispatchToProps = (dispatch: any) => ({
    getBillingcycle: () => dispatch(reqBillingcycle()),
    resetCommonFileUpload: (data: any) => {
        dispatch(setCommonUploadResetAction(data))
    },
    setCommonFileUpload: (data: any) => {
        dispatch(setCommonFileUploadAction(data))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SlaUpload);