import { Box, Typography } from '@mui/material';
import React from 'react'

const HumanResources = (props?: any) => {
  const [getHumanResourceData, setHumanResourceData] = React.useState<any>(null)

  React.useEffect(()=>{
    getHumanSubCnt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const getHumanSubCnt = ()=>{
    if (props.putSubContent && props.putSubContent.length) {
      let getHumanResource: any = []
      props.putSubContent.forEach((items: any) => {
        if (items && items.sub_list) {
          items.sub_list.forEach((item: any) => {
            getHumanResource.push(item)
          })
        }
      })
      setHumanResourceData(getHumanResource)
    }
  }
  return (
    <React.Fragment>
      <section className="sectionBg">
        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center mx-auto mb-3 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "500px;" }}>
              {/* <div className="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Supplier Management</div> */}
              <h1 className="display-6 mb-5">Human Resources</h1>
            </div>
            <Box>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
                {props.putMainContent ? props.putMainContent.title : ''}
              </Typography>
              <Box sx={{ padding: 2 }}>
                {props.putMainContent ? props.putMainContent.description : ''}
              </Box>
            </Box>
            <Box sx={{ padding: 2 }}>
              <ul>
                {
                  props.putMainContent && props.putMainContent.sub_list ?
                    props.putMainContent.sub_list.map((items: any, index?: any) => (
                      <li key={index}>{items.content}</li>
                    ))
                    : null
                }
              </ul>
            </Box>
            <div className="row g-4 justify-content-center">
              {
                getHumanResourceData ?
                getHumanResourceData.map((items: any, index?: any) => (
                    <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={index}>
                      <div className="service-item bg-white text-center h-100 p-4 p-xl-5">
                        {/* <h4 className="mb-1">{items.description}</h4> */}
                        <p className="mb-2">{items.content}</p>
                      </div>
                    </div>
                  ))
                  : null
              }
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default HumanResources;