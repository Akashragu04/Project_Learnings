import { AuthUser } from "../../types/models/AuthUser";
import * as yup from "yup";

export const currentDate = new Date();

export const authRole = {
  admin: ["ADMIN", "SUPERADMIN"],
  Business: ["BUSINESS", "ADMIN", "SUPERADMIN", "CUSTOMER"],
  Customer: ["CUSTOMER"],
  Employee: ["EMPLOYEE"]
};

export enum RoutePermittedRole {
  Admin = "ADMIN",
  Business = "BUSINESS",
  Customer = "CUSTOMER",
  Superadmin = "SUPERADMIN",
  Operation = "OPERATION",
  Facility = "FACILITY",
  IT = "IT",
  Finance = "FINANCE",
  HR = "HR",
  EMPLOYEE = "EMPLOYEE",
  unauthorized = "unauthorized",
  Common = 'COMMON',
  AdminBusiness = 'AdminBusiness'
}

export const validationConstants: any = {
  minIntLength: 1,
  maxIntLength: 15,
  minStringLength: 3,
  maxStringLength: 50,
  minDescriptionLength: 3,
  maxDescriptionLength: 500
}
export const productEngineering:any = [
  {
    id:1,
    title: "Homologation",
    sub_list: [
        {
            "content": "DTA LEVEL Certification For ASEAN Markets"
        },
        {
            "content": "Country-wise regulations & Certification Expertise available"
        }
    ]
},
{
  id:2,
  title: "Testing",
  sub_list: [
      {
          "content": "Durability, functional test of components & Vehicles, reliability test on vehicles [both internal and target market]"
      },
      {
          "content": "PTI - Bench test, emission calibration and durability test"
      }
  ]
},
{
  id:3,
  title: "Testing",
  sub_list: [
      {
          "content": "Durability, functional test of components & Vehicles, reliability test on vehicles [both internal and target market]"
      },
      {
          "content": "PTI - Bench test, emission calibration and durability test"
      }
  ]
}
]
export const defaultUser: AuthUser = {
  uid: "john-alex",
  displayName: "John Alex",
  email: "demo@example.com",
  token: "access-token",
  role: "user",
  photoURL: "/assets/images/avatar/A11.jpg",
};
export const initialUrl = "/dashboard"; // this url will open after login
export const guestRole = "COMMON"; // this url will open after login

export const appConstants = {
  sequenceExistMsg: "The Sequence already included!",
  bizCaseDateValdationMsg: "Please choose the Biz Start and End date",
  sectionTypeRequired: "Please choose the Customer Expense Section",
  bizIteration: "Iteration has been selected for business setup successfully",
  jdMapFTELevelValidationMsg: "FTE Quanity is more than the monthly total",
  bizCaseRequirementDateReq: "Business Case start and end date is required",
  totalCost: 'Total Cost',
  dataGridAppDataHeader: 'app-data-grid--header',
  specifyNumber: 'You must specify a number',
  dateFormat: 'YYYY-MM-DD',
  dateFormatIN: 'DD-MM-YYYY',
  dateFormatINSt: 'DD/MM/YYYY',
  bottomRight: 'bottom-right',
  somethingWrong: 'Something went wrong, Please try again!',
  markupValue: 13.5,
  invalidToken: 'Invalid Token'
};

export const appRequirementProperty = {
  property_name: "",
  property_value: "",
  property_date: "",
  year: ""
}

export const appRequirementSchema: any = {
  is_agree: false,
  business_days: [],
  bizcase_yearly_information: [],
  sla_business_case: true,
  is_customer_rampdown: false,
  isCalculating: false,
  isRampCalculating: false,
  business_case_start_date: null,
  business_case_end_date: null,
  currency: "",
  working_hours: 0,
  manpower_inflation: 0,
  rate_card_inflation: 0,
  existingratecard: [],
  hr_contact_person: "",
  hr_shortid: "",
  it_contact_person: "",
  it_shortid: "",
  fac_contact_person: "",
  fac_shortid: "",
  business_availability: "",
  ratecard_type: "",
  manpower_level: "",
  level_sequence: "",
  customer_expense_total: 0,
  active_iteration: '',
  active_iteration_section: '',
  manpower_requirements: [
    {
      level: "FTE",
      total: "",
      properties: []
    },
    {
      level: "Cost per Person",
      total: "",
      properties: []
    },
    {
      level: appConstants.totalCost,
      total: "",
      properties: []
    }
  ],
  manpower_hiringcost: [
    {
      level: "FTE",
      total: "",
      properties: []
    },
    {
      level: "Percentage(%) per Candidate",
      total: "",
      properties: []
    },
    {
      level: "Other Hiring Cost",
      total: "",
      properties: []
    },
    {
      level: "Total Hiring Cost",
      total: "",
      properties: []
    }
  ],
  rampups: [],
  hr_rampups: [],
  it_info: [
    {
      description: '',
      remark: '',
      quantity: 0,
      cost: 0,
      cost_type: "",
      amortization: 0,
      target_date: currentDate,
      business_year: '',
      isratecard: false
    }
  ],
  facility: [
    {
      description: '',
      remark: '',
      quantity: 0,
      cost: 0,
      cost_type: "",
      amortization: 0,
      target_date: currentDate,
      business_year: '',
      isratecard: false
    }
  ],
  system_access: [
    {
      description: '',
      quantity: '',
      cost: 0,
      cost_type: "",
      amortization: '',
      target_date: currentDate,
      business_year: '',
      isratecard: false
    }
  ],
  thirdparty_service: [
    {
      description: '',
      quantity: '',
      cost: 0,
      cost_type: "",
      amortization: '',
      target_date: currentDate,
      business_year: '',
      isratecard: false
    }
  ],
  other_cost: [
    {
      description: '',
      quantity: '',
      cost: 0,
      cost_type: "",
      amortization: '',
      target_date: currentDate,
      business_year: '',
      isratecard: false
    }
  ],
  thirdparty_cost: [
    {
      description: '',
      quantity: '',
      cost: 0,
      purchase_order: '',
      cost_type: "",
      amortization: '',
      target_date: currentDate,
      business_year: '',
      isratecard: false
    }
  ],
  travel_cost: [
    {
      description: '',
      cost: 0,
      cost_type: "",
      amortization: '',
      target_date: currentDate,
      business_year: "",
      isratecard: false
    }
  ],
  customer_expenses: [
    {
      section_type: "",
      description: "",
      remark: "",
      quantity: "",
      cost: 0,
      cost_type: "",
      amortization: '',
      target_date: currentDate
    }
  ],
  customer_rampdown: [],
};

export const customerExpenseSchema = {
  section_type: "",
  description: "",
  remark: "",
  quantity: "",
  cost: 0,
  cost_type: "",
  amortization: '',
  target_date: currentDate,
  isratecard: false
}
export const itRequirementSchema = {
  description: '',
  remark: '',
  quantity: 0,
  cost: 0,
  cost_type: "",
  amortization: 0,
  target_date: currentDate,
  business_year: '',
  isratecard: false
}
export const facilityRequirementSchema = {
  description: '',
  remark: '',
  quantity: '',
  cost: 0,
  cost_type: "",
  amortization: '',
  target_date: currentDate,
  business_year: '',
  isratecard: false
}
export const systemAccessRequirementSchema = {
  description: '',
  quantity: '',
  cost: 0,
  cost_type: "",
  amortization: '',
  target_date: currentDate,
  business_year: '',
  isratecard: false
}
export const thirdPartyServiceRequirementSchema = {
  description: '',
  quantity: '',
  cost: 0,
  cost_type: "",
  amortization: '',
  target_date: currentDate,
  business_year: '',
  isratecard: false
}
export const otherCostRequirementSchema = {
  description: '',
  quantity: '',
  cost: 0,
  cost_type: "",
  amortization: '',
  target_date: currentDate,
  business_year: '',
  isratecard: false
}
export const thirdPartyCostRequirementSchema = {
  description: '',
  quantity: '',
  cost: 0,
  purchase_order: '',
  cost_type: "",
  amortization: '',
  target_date: currentDate,
  business_year: '',
  isratecard: false
}
export const travelCostRequirementSchema = {
  description: '',
  cost: 0,
  cost_type: "",
  amortization: '',
  target_date: currentDate,
  business_year: '',
  isratecard: false

}

export const updateBizCaseSchema: any = {
  isCalculating: false,
  isRampCalculating: false,
  is_customer_rampdown: false,
  business_case_start_date: new Date(),
  business_case_end_date: new Date(),
  man_power_inflation: 0,
  rate_card_inflation: 0,
  manpower_level: "",
  level_sequence: "",
  manpower_requirements: [
    {
      level: "FTE",
      total: "",
      properties: []
    },
    {
      level: "Cost per Person",
      total: "",
      properties: []
    },
    {
      level: appConstants.totalCost,
      total: "",
      properties: []
    }
  ],
  manpower_hiringcost: [
    {
      level: "FTE",
      total: "",
      properties: []
    },
    {
      level: "Percentage(%) per Candidate",
      total: "",
      properties: []
    },
    {
      level: "Other Hiring Cost",
      total: "",
      properties: []
    },
    {
      level: "Total Hiring Cost",
      total: "",
      properties: []
    }
  ],
  rampups: [],
  customer_rampdown: [],
};

export const manpowerLevelConstant = [
  { id: "L1", name: "L1" },
  { id: "L2", name: "L2" },
  { id: "L3", name: "L3" },
  { id: "L4", name: "L4" },
  { id: "L5", name: "L5" },
  { id: "L6", name: "L6" },
  { id: "L7", name: "L7" },
];

export const capexConstant = 'capex';
export const capexOnetimeConstant = 'capex_onetime';
export const costTypeConstant = [
  { id: "opex", name: "Opex" },
  { id: "capex", name: "Capex" },
  { id: "opex_onetime", name: "Opex One Time" },
  { id: "capex_onetime", name: "Capex One Time" }
];

export const levelSequenceConstant = [
  { id: "A", name: "A" },
  { id: "B", name: "B" },
  { id: "C", name: "C" },
  { id: "D", name: "D" }
];

export const currencyConstants = [
  { id: "INR", name: "INR" },
  { id: "EUR", name: "EUR" },
  { id: "USD", name: "USD" }
];

export const positionCodeConstants = [
  { id: "L1", name: "L1" },
  { id: "L2", name: "L2" }
];

export const jdDetailProperty = {
  jd_code: "",
  jd_role: "",
  upload_action: "",
  isUploaded: false,
  jd_description: "",
  supporting_files: [],
  position_code: ""
}

export const jdAssignProperty = {
  jdcode: "",
  jdlist: "",
  quantity: '',
  remarks: '',
  quantitydisabled: false
}

export const jdMapAssignProperty = {
  isLoading: false,
  jd_assign: [
    {
      jdcode: "",
      jdlist: "",
      quantity: '',
      remarks: '',
      quantitydisabled: false
    }
  ],
}

export const bizJDMappingSchema: any = {
  project_code: "",
  project_name: "",
  jd_information: [
    {
      jd_code: "",
      jd_role: "",
      upload_action: "",
      isuploaded: false,
      jd_description: "",
      supporting_files: [],
      position_code: ""
    }
  ],
  jd_assign: [],
};

export const contractStatusConstants = [
  { id: "live", name: "Live" },
  { id: "closed", name: "Closed" },
  { id: "cancelled", name: "Cancelled" }
];
export const contractOptionConstants = [
  { id: "OnSite", name: "OnSite" },
  { id: "OffSite", name: "OffSite" },
  { id: "Both", name: "Both" }
];
export const tariffUnitConstants = [
  { id: "mandays", name: "Mandays" },
  { id: "manhour", name: "Manhours" }
];
export const ioCategoryConstants = [
  { id: "capex", name: "Capex" },
  { id: "opex", name: "Opex" }
];
export const slaCreationRequirementSchema: any = {
  customer: {},
  costcenter: {},
  customer_company: '',
  customer_address: '',
  project_name: '',
  team: '',
  cost_center: '',
  currency: '',
  start_date: '',
  end_date: '',
  effective_date: '',
  contract_status: '',
  contract_option: '',
  customer_cost_center: '',
  customer_cost_center_manager: '',
  organization_type: '',
  service_description: '',
  billing_cycle: '',
  tariff_sheet_fte: '',
  tariff_sheet: {
    cost_center_code: '',
    material_description: '',
    units: '',
    estimated_quantity: '',
    rate: '',
    amount: '',
    markup_value: '13.5'
  },
  io: {
    io_number: '',
    io_category: '',
    value: ''

  },
  po: {
    po_number: '',
    value: '',
    vendor: ''
  },
  contacts: {
    short_name: '',
    name: '',
    email: '',
    customer_type: '',
    primary: false,
    key_person: false,
    is_pre_invoice: false,
    is_sla: false,
  },
  sla_po: [

  ],
  sla_io: [

  ],
  sla_contacts: [

  ],
  sla_tariffsheet: [
  ],
  sla_terms_and_conditions: [],
  attachments: [],
}

export const preInvoiceRequirementSchema: any = {
  sla: '',
  customer: '',
  project_name: '',
  cost_center: '',
  currency: '',
  service_description: "",
  address: "",
  start_date: "",
  end_date: "",
  billing_cycle: "",
  po_number: "",
  date_of_service: "",
  remarks: "",
  total_budget: 0,
  preinvoice_cycle: '',
  fte: '',
  sla_preinvoice_tariffsheet: [
  ],
  attachments: [],
}

export const appRateCardConstants: any = {
  requirement_cost: '',
  thirdparty_cost: '',
  manpower_inflation: 0,
  manpower_total_cost: '',
  thirdparty_service_cost: '',
  manpower_other_cost: '',
  it_cost: '',
  facility_cost: '',
  system_access_cost: '',
  travel_cost: '',
  non_manpower_total_cost: '',
  other_costs: [],
  finance_manpower_cost: [],
  markup_value: 13.5,
  fx_risk: 0,
  wht_value: 0,
  inflation_value: 0,
  business_days: [],
  business_case_start_date: null,
  business_case_end_date: null,
  bizit_info: [],
  bizfacility: [],
  bizsystem_access: [],
  bizthirdparty_service: [],
  bizother_cost: [],
  bizthirdparty_cost: [],
  biztravel_cost: []
};

export const rateCardOtherCostConstant: any = {
  description: '',
  quantity: '',
  cost: '',
  business_year: "",
}

export const financeManpowerCostConstant: any = {
  cost: '',
  business_year: ''
}

export const appRateCardValidationSchema = yup.object({
  business_case_start_date: yup
    .date()
    .nullable()
    .required(String("Biz.Case Start Date is required")),
  business_case_end_date: yup
    .date()
    .nullable()
    .required(String("Biz.Case End Date is required")),
  markup_value: yup.number().required(String("Markup is required")),
  fx_risk: yup.number().required(String("FX Risk is required")),
  wht_value: yup.number().required(String("WHT is required")),
  inflation_value: yup.number().required(String("Inflation is required")),
  business_days: yup.array().of(
    yup.object().shape({
      days: yup.number().required(String("Business Days is required"))
    })
  )
});

export const costLabelList: any = [
  {
    label: "Manpower Cost",
    key: 'manpower_cost'
  },
  {
    label: "Non Manpower Cost",
    key: 'non_manpower_cost'
  },
  {
    label: "Other Cost (F&C)",
    key: 'other_cost'
  },
  {
    label: "Transition Cost",
    key: 'transition_cost'
  },
  {
    label: "Hiring Cost",
    key: 'hiring_cost'
  },
  {
    label: appConstants.totalCost,
    key: 'total_cost'
  }
]

export const revenueLabelList: any = [
  {
    label: "Billable Hours",
    key: 'billable_hours',
    note:''
  },
  {
    label: "SLA Payout cost without markup",
    key: 'rate_card',
    note:''
  },
  {
    label: "Other cost (Travel & uncheck items by F&C)",
    key: 'other_costs',
    note:''
  },
  {
    label: "Markup",
    key: 'markup',
    note:''
  },
  {
    label: "Inflation",
    key: 'inflaction',
    note:''
  },
  {
    label: "Total SLA Payout cost",
    key: 'sla_payout_cost',
    note:''
  },
  {
    label: "RoS",
    key: 'ros',
    note:''
  },
  {
    label: "FX Risk",
    key: 'fx_rist_cost',
    note:''
  },
  {
    label: "Net Profit",
    key: 'net_profit_value',
    note:''
  },
  {
    label: "WHT",
    key: 'wht_cost',
    note:''
  },
  {
    label: "Customer Expense",
    key: 'customer_expense_cost',
    note:''
  },
  {
    label: "Customer Savings",
    key: 'customer_expense_saving',
    note:'Available only if Customer Expense & customer ramp down is updated'
  }
]

export const entityMasterConst: any = {
  customername: '',
  customerid: '',
  shortname: '',
  address: '',
  telephone: '',
  fax: '',
  code: '',
  country: '',
  currency: '',
  genesiscode: '',
  gstin: '',
  state: ''
}

export const accuralSLAConst: any = {
  accuralsList: [
    {
      id: '',
      slaid: '',
      sla_name: '',
      billing_cycle: '',
      total_revenue: '0',
      invoice_revenue: '0',
      accurals_tarriff_data: [
        {
          tarrif_name: '',
          monthly_datas: [
            {
              month: 'Jan-2022',
              active: 'true',
              value: '0',
            },
            {
              month: 'Feb-2022',
              active: 'true',
              value: '0',
            },
            {
              month: 'Mar-2022',
              active: 'true',
              value: '0',
            },
          ],
        },
        {
          tarrif_name: 'Chair',
          monthly_datas: [
            {
              month: 'Jan-2022',
              active: 'true',
              value: '0',
            },
            {
              month: 'Feb-2022',
              active: 'true',
              value: '0',
            },
            {
              month: 'Mar-2022',
              active: 'true',
              value: '0',
            },
          ],
        },
        {
          tarrif_name: 'Total',
          monthly_datas: [
            {
              month: 'Jan-2022',
              active: 'true',
              value: '0',
            },
            {
              month: 'Feb-2022',
              active: 'true',
              value: '0',
            },
            {
              month: 'Mar-2022',
              active: 'true',
              value: '0',
            },
          ],
        },
      ],
    },
  ],
};

export const provisionsFilterConst:any = {
  costcenter: '',
  year: '',
  month: '',
  status:'',
  team:''
};

export const provisionListAddConst:any = {
  "id": 0,
  "costcenter": "",
  "team": "",
  "month": "",
  "year": "",
  "sla_name": "",
  "slaid": '',
  "project_name": "",
  "vendor_name": "",
  "po_ro_number": '',
  "io_number": "",
  "total_provision": '',
  "status": "",
  "comments": "",
  "thirdparty_manpower_provision": '',
  "thirdparty_service_provision": '',
  "cross_charges_provision": '',
  "software_provision": '',
  "prototype_provision": '',
  "other_provisions": '',
  "previous_provisions": "",
  "invoice_reference_no": ''
};

export const provisionsConst:any = {
  provisions_info: []
}
