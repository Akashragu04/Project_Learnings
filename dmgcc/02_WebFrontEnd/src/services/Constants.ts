export enum LandingPageURL {
  homepage = '/',
  aboutusPage = '/about_us',
  brochurePage = '/brochure',
  newsletterPage = '/newsletter',
  contentPage = '/content',
  GccVertical = '/gcc_vertical',
  g3cadmin='https://dmg3c-dev.izserver8.in/'
}

export interface notificationMessage {
  position: string,
  duration: number,
  getDuration: number
}

export const notificationMsg: notificationMessage = {
  position: "top-right",
  duration: 2000,
  getDuration: 500
}

//reg.exp pattens
export interface validationPatten {
  nameCommonPatten: RegExp,
  emailPatten: RegExp,
  passwordPatten: RegExp,
  phoneRegExp: RegExp,
  emailIdPhoneNo: RegExp,
  address: RegExp,
  NamePattern: RegExp,
  alphanumericTest: RegExp,
  numberPatten: RegExp,
  onlynumber:RegExp
}
export const formValidationPatten: validationPatten = {
  nameCommonPatten: /^[a-zA-z]+([\s][a-zA-Z]+)*$/,  //NOSONAR
  NamePattern: /^([a-zA-Z@_&.,'-]+\s)*[a-zA-Z@_&.,'-]+$/,  //NOSONAR
  numberPatten: /^[0-9]+$/,  //NOSONAR
  // eslint-disable-next-line
  emailPatten: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,  //NOSONAR
  passwordPatten: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,  //NOSONAR
  phoneRegExp: /^[^-\s][0-9_\s-]+$/,  //NOSONAR
  emailIdPhoneNo: /^([_+a-z0-9]+(\.[_+a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3}))|(\d+$)$/,  //NOSONAR
  address: /^\S+(?: \S+)*$/,  //NOSONAR
  alphanumericTest: /^[A-Za-z0-9_\s-]+$/,  //NOSONAR,
  onlynumber:/^[0-9]/
  
}


export interface validationSize {
  nameMinSize: number,
  nameMaxSize: number,
  addressMaxSize: number,
  mobileNoSize: number,
  schoolMaxSize: number,
  subjectNameMaxSize: number,
  subjectNameMinSize: number,
  shortNameMaxSize: number,
  shortNameMinSize: number,
  schoolIdMaxSize: number,
  designation: number,
  mobileNoMax: number,
  categoryMax: number,
  maxpassword: number,
  minpassword: number,
  phoneNo: number,
  otpMax: number,
  otpMin: number,
  minLastName: number,
  maxlengthpassword: number,
  minlengthpassword: number,
  lengthMinMsg:number,
  lengthMaxMsg:number,
  lengthten:number
}

export const formValidationSize: validationSize = {
  nameMinSize: 3,
  schoolMaxSize: 50,
  nameMaxSize: 50,
  addressMaxSize: 250,
  mobileNoSize: 10,
  subjectNameMaxSize: 50,
  subjectNameMinSize: 2,
  shortNameMaxSize: 10,
  shortNameMinSize: 2,
  schoolIdMaxSize: 150,
  designation: 75,
  mobileNoMax: 10,
  categoryMax: 50,
  maxpassword: 12,
  minpassword: 8,
  phoneNo: 10,
  otpMax: 6,
  otpMin: 6,
  minLastName: 1,
  maxlengthpassword: 12,
  minlengthpassword: 8,
  lengthMinMsg:3,
  lengthMaxMsg:150,
  lengthten:10
}

interface commonValidation {
  invalidemailid: string,
  commonEmail:string,
  commonmessage:string
}

export const commonValida: commonValidation = {
  invalidemailid: 'Please enter a valid Email Id',
  commonEmail:'Please enter the Email Id',
  commonmessage:'Invalid numbers'
}

export interface validationSizeMessage {
  lengthMinMsg: string,
  lengthMaxMsg: string,
  lengthTenMaxMsg:string,
  lengthOneMinMsg:string,
  lengthfiftyMaxMsg:string,
  fileUploadMaxSize:string
}

export const formValidationSizeMsg: validationSizeMessage = {
  lengthMinMsg: "Please enter at least 3 characters",
  lengthMaxMsg: "should not be more than 150 characters",
  lengthTenMaxMsg: "should not be more than 10 characters",
  lengthOneMinMsg: "Please enter at least 1 characters",
  lengthfiftyMaxMsg: "should not be more than 50 characters",
  fileUploadMaxSize:'Should not be more than 10MB upload'
}
export const sequenceList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

export const yearList:any = [
  {
    id:1,
    year:"2022"
  },
  {
    id:2,
    year:"2023"
  },
  {
    id:3,
    year:"2024"
  },
  {
    id:4,
    year:"2025"
  },
  {
    id:5,
    year:"2026"
  },
  {
    id:6,
    year:"2027"
  },
  {
    id:7,
    year:"2028"
  },
  {
    id:8,
    year:"2029"
  },
  {
    id:9,
    year:"2030"
  }
]

export const LevelList:any = [
  {
    id:1,
    name:"L1"
  },
  {
    id:2,
    name:"L2"
  },
  {
    id:3,
    name:"L3"
  },
  {
    id:4,
    name:"L4"
  },
  {
    id:5,
    name:"L5"
  },
  {
    id:6,
    name:"L6"
  },
  {
    id:7,
    name:"L7"
  }
]

export const pushProvisionJsonValues:any = {
  "costcenter": "",
  "team": "",
  "month": "",
  "numeric_month": 0,
  "year": "",
  "sla_name": "",
  "slaid": "",
  "project_name": "",
  "vendor_name": "",
  "po_ro_number": "",
  "io_number": "",
  "total_provision": null,
  "status": "",
  "comments": "",
  "invoice_reference_no": "",
  "thirdparty_manpower_provision": null,
  "thirdparty_service_provision": null,
  "cross_charges_provision": null,
  "software_provision": null,
  "prototype_provision": null,
  "other_provisions": null,
  "previous_provisions": "",
  "thirdparty_manpower_provision_remarks": null,
  "thirdparty_service_provision_remarks": null,
  "cross_charges_provision_remarks": null,
  "software_provision_remarks": null,
  "prototype_provision_remarks": null,
  "other_provisions_remarks": null,
  "previous_provisions_remarks": null,
  "created_date": "",
  "updated_date": null,
  "iseditable": null
}

export const dataNotFount:any = 'Data Not Found';

export const informationTech:any =   {
    title:'Your way to real world solutions',
    description:'IT has become indispensable for the automobile industry.',
    sub_content:[
      {
        content:'Digitalization strategy & implementation'
      },
      {
        content:'IOT, connectiviy, Data 7 Analytics'
      }
    ]
  }

  export const commonInformationDetails:any = {
    drapanddrop:"Drag and drop some files here, or click to select files"
  }