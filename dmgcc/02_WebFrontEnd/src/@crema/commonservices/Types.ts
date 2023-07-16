
import { makeStyles } from '@mui/styles';

export const projectData = [
    {
        id: 1,
        proj_id: 1,
        project_code: "PRO1945544",
        project_name: "XYZ",
        customer: "Mitsubishi FUSO",
        status: "Active",
        sla_values: "10000",
        invoice_values: "6000",
        sla: 'With out SLA',
        invoice_status: "Pending for Mar 10",
        business_case: 'Yes',
        employee_details: [
            {
                id: 1,
                hr_id: 'HR1',
                name: 'saleem',
                capacity: 50
            },
            {
                id: 2,
                hr_id: 'HR2',
                name: 'karthik',
                capacity: 20
            },
            {
                id: 3,
                hr_id: 'HR3',
                name: 'sudhakar',
                capacity: 30
            },
            {
                id: 4,
                hr_id: 'HR4',
                name: 'sathish',
                capacity: 40
            },
            {
                id: 5,
                hr_id: 'HR5',
                name: 'saleem',
                capacity: 50
            }
        ],
        timeSheet: [
            {
                date: '13/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                date: '14/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                date: '15/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                date: '16/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            }
        ],
        total: 40,
        open: 15
    },
    {
        id: 2,
        proj_id: 2,
        project_code: "A202203011002",
        project_name: "XYZ",
        customer: "Mitsubishi FUSO",
        status: "Active",
        sla_values: "10000",
        invoice_values: "6000",
        sla: 'With out SLA',
        invoice_status: "Pending for Mar 1",
        business_case: 'No',
        employee_details: [],
        timeSheet: [
            {
                id: 1,
                date: '13/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                id: 2,
                date: '14/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                id: 3,
                date: '15/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                id: 4,
                date: '16/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            }
        ],
        total: 40,
        open: 15
    },
    {
        id: 3,
        proj_id: 3,
        project_code: "A202203011003",
        project_name: "XYZ",
        customer: "Mitsubishi FUSO",
        status: "Active",
        sla_values: "10000",
        invoice_values: "6000",
        sla: 'With out SLA',
        invoice_status: "Pending for Mar 1",
        business_case: 'Yes',
        employee_details: [
            {
                id: 1,
                hr_id: 'HR1',
                name: 'saleem',
                capacity: 50
            },
            {
                id: 2,
                hr_id: 'HR2',
                name: 'karthik',
                capacity: 20
            },
            {
                id: 3,
                hr_id: 'HR3',
                name: 'sudhakar',
                capacity: 30
            },
            {
                id: 4,
                hr_id: 'HR4',
                name: 'sathish',
                capacity: 40
            },
            {
                id: 5,
                hr_id: 'HR5',
                name: 'saleem',
                capacity: 50
            }
        ],
        timeSheet: [
            {
                id: 1,
                date: '13/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                id: 2,
                date: '14/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                id: 3,
                date: '15/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                id: 4,
                date: '16/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            }
        ],
        total: 40,
        open: 15
    },
    {
        id: 4,
        proj_id: 4,
        project_code: "A202203011004",
        project_name: "XYZ",
        customer: "Mitsubishi FUSO",
        status: "Active",
        sla_values: "10000",
        invoice_values: "6000",
        sla: 'With out SLA',
        invoice_status: "Pending for Mar 12",
        business_case: 'No',
        employee_details: [],
        timeSheet: [
            {
                id: 1,
                date: '13/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                id: 2,
                date: '14/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                id: 3,
                date: '15/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                id: 4,
                date: '16/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            }
        ],
        total: 40,
        open: 15
    },
    {
        id: 5,
        proj_id: 5,
        project_code: "A202203011005",
        project_name: "XYZ",
        customer: "Mitsubishi FUSO",
        status: "Active",
        sla_values: "10000",
        invoice_values: "6000",
        sla: 'With out SLA',
        invoice_status: "Pending for Mar 14",
        business_case: 'No',
        employee_details: [],
        timeSheet: [
            {
                id: 1,
                date: '13/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                id: 2,
                date: '14/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                id: 3,
                date: '15/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            },
            {
                id: 4,
                date: '16/04/2022',
                working_hours: '8',
                start_time: '09:00 AM',
                end_time: '06:00 PM',
                Working_Type: 'Full Time',
                project: 'Car Development',
                sla: 'With SLA',
                task: 'Development',
                comments: 'Good'
            }
        ],
        total: 40,
        open: 15
    },
]

export const timeSheetList: any = [
    {
        id: 1,
        date: '13/04/2022',
        working_hours: '8',
        start_time: '09:00 AM',
        end_time: '06:00 PM',
        Working_Type: 'Full Time',
        project: 'Car Development',
        sla: 'With SLA',
        task: 'Development',
        comments: 'Good'
    },
    {
        id: 2,
        date: '14/04/2022',
        working_hours: '8',
        start_time: '09:00 AM',
        end_time: '06:00 PM',
        Working_Type: 'Full Time',
        project: 'Car Development',
        sla: 'With SLA',
        task: 'Development',
        comments: 'Good'
    },
    {
        id: 3,
        date: '15/04/2022',
        working_hours: '8',
        start_time: '09:00 AM',
        end_time: '06:00 PM',
        Working_Type: 'Full Time',
        project: 'Car Development',
        sla: 'With SLA',
        task: 'Development',
        comments: 'Good'
    },
    {
        id: 4,
        date: '16/04/2022',
        working_hours: '8',
        start_time: '09:00 AM',
        end_time: '06:00 PM',
        Working_Type: 'Full Time',
        project: 'Car Development',
        sla: 'With SLA',
        task: 'Development',
        comments: 'Good'
    }
]
export const useStyles = makeStyles({
    root: {
        '& .app-data-grid--header': {
            color: '#00677F'
        },
    },
});

export const projectViewDetails: any = [
    {
        "id": 1,
        "project_name": "Car Development",
        "project_id": "PRO1945544",
        "service_provider_shortid": "BUS001",
        "service_receiver_shortid": "CUS001",
        "service_provider": "business",
        "service_receiver": "customer",
        "currency": "USD",
        "sla_value": 20000,
        "invoice_value": 10000,
        "invoice_persentage": 50,
        "invoice_status": "pending",
        "payment_value": 4000,
        "payment_persentage": 20,
        "status": "Active",
        "active": "true",
        "cost_center": null,
        "isActive": true,
        "is_new": false,
        "sla": [
            {
                "id": 3,
                "slaid": "4165/0806",
                "slaname": 'test1',
                "customer_company": "Intelizign Engineering pvt.ltd",
                "customer_address": "1st floor, New No.9,Old, No.5, Murrays Gate Rd, Venus Colony, Alwarpet, Chennai, Tamil Nadu",
                "customer_postal_code": null,
                "customer_name": null,
                "provider_company": "Daimler India Commercial Vehicles Pvt. Ltd",
                "provider_address": "SIPCOT Industrial Growth Centre, Oragadam, Mathur Post, Sriperumbudur Taluk, Kancheepuram District, ",
                "provider_postal_code": "602105 Chennai, India",
                "provider_name": null,
                "project_name": "Car Development",
                "project_code": "PRO1945544",
                "team": null,
                "provider_cost_center": "485690",
                "currency": "Dollar",
                "start_date": "20-09-2022",
                "end_date": "21-08-2029",
                "effective_date": "21-08-2029",
                "contract_status": null,
                "contract_option": "yearly",
                "customer_cost_center": "1245453",
                "customer_cost_center_manager": "Saleem",
                "organization_type": "Other",
                "service_description": "Test Description",
                "billing_cycle": "ONCE",
                "markup_value": null,
                "total_budget": 20000,
                "capnitienable": false,
                "taskenable": false,
                "sla_tariffsheet": [
                    {
                        "cost_center_code": "120958",
                        "material_description": "Material Application",
                        "units": "4",
                        "estimated_quantity": "10",
                        "rate": "150",
                        "amount": "1400",
                        "markup_value": "1.5"
                    },
                    {
                        "cost_center_code": "120958",
                        "material_description": "Internal Power",
                        "units": "4",
                        "estimated_quantity": "10",
                        "rate": "150",
                        "amount": "1800",
                        "markup_value": "1.5"
                    }
                ],
                "sla_io": null,
                "sla_po": [
                    {
                        "po_numner": null,
                        "vendor": "customer",
                        "value": "chennai"
                    }
                ],
                "sla_contacts": [
                    {
                        "short_name": "BUS001",
                        "name": "kishore",
                        "email": "business001@mailinator.com",
                        "customer_type": "PROVIDER",
                        "primary": null,
                        "key_person": false,
                        "is_pre_invoice": true,
                        "is_sla": true
                    },
                    {
                        "short_name": "FAC001",
                        "name": "sudhakar",
                        "email": "facility001@mailinator.com",
                        "customer_type": "PROVIDER",
                        "primary": null,
                        "key_person": false,
                        "is_pre_invoice": true,
                        "is_sla": true
                    },
                    {
                        "short_name": "CUS001",
                        "name": "kamal",
                        "email": "customer001@mailinator.com",
                        "customer_type": "PROVIDER",
                        "primary": null,
                        "key_person": false,
                        "is_pre_invoice": true,
                        "is_sla": true
                    },
                    {
                        "short_name": "CUS001",
                        "name": "thiru",
                        "email": "customer001@mailinator.com",
                        "customer_type": "CUSTOMER",
                        "primary": null,
                        "key_person": false,
                        "is_pre_invoice": true,
                        "is_sla": true
                    },
                    {
                        "short_name": "CUS001",
                        "name": "akil",
                        "email": "customer001@mailinator.com",
                        "customer_type": "CUSTOMER",
                        "primary": null,
                        "key_person": false,
                        "is_pre_invoice": true,
                        "is_sla": true
                    }
                ],
                "sla_terms_and_conditions": [],
                "attachments": [],
                "sla_argeement_document": null,
                "sla_signed_argeement_document": null,
                "status": "Approve In-Progress",
                "is_active": true,
                "active": "inactive",
                "invoice_cycle": null,
                "slapreinvoice": [],
                "resources": [
                    {
                        "id": 5,
                        "project_name": "Car Development",
                        "projectid": 3,
                        "slaid": 3,
                        "sla_name": "4165/0806",
                        "userid": 5,
                        "hrid": null,
                        "resource_name": "User HR",
                        "resource_email": "hr001@mailinator.com",
                        "resource_shortid": "HR001",
                        "capcity": 10,
                        "level": "3"
                    },
                    {
                        "id": 4,
                        "project_name": "Car Development",
                        "projectid": 3,
                        "slaid": 3,
                        "sla_name": "4165/0806",
                        "userid": 4,
                        "hrid": null,
                        "resource_name": "User IT",
                        "resource_email": "it001@mailinator.com",
                        "resource_shortid": "IT001",
                        "capcity": 80,
                        "level": "3"
                    }
                ],
                "invoice_value": null,
                "invoice_status": null,
                "invoice_percentage": null,
                "payments": null,
                "payments_percentage": null
            }
        ]
    },
    {
        "id": 2,
        "project_name": "Car Development",
        "project_id": "PRO1945544",
        "service_provider_shortid": "BUS001",
        "service_receiver_shortid": "CUS001",
        "service_provider": "business",
        "service_receiver": "customer",
        "currency": "USD",
        "sla_value": 20000,
        "invoice_value": 10000,
        "invoice_persentage": 50,
        "invoice_status": "pending",
        "payment_value": 4000,
        "payment_persentage": 20,
        "status": "Active",
        "active": "true",
        "cost_center": null,
        "isActive": true,
        "is_new": false,
        "sla": [
            {
                "id": 3,
                "slaid": "4165/0806",
                "slaname": 'test1',
                "customer_company": "Intelizign Engineering pvt.ltd",
                "customer_address": "1st floor, New No.9,Old, No.5, Murrays Gate Rd, Venus Colony, Alwarpet, Chennai, Tamil Nadu",
                "customer_postal_code": null,
                "customer_name": null,
                "provider_company": "Daimler India Commercial Vehicles Pvt. Ltd",
                "provider_address": "SIPCOT Industrial Growth Centre, Oragadam, Mathur Post, Sriperumbudur Taluk, Kancheepuram District, ",
                "provider_postal_code": "602105 Chennai, India",
                "provider_name": null,
                "project_name": "Car Development",
                "project_code": "PRO1945544",
                "team": null,
                "provider_cost_center": "485690",
                "currency": "Dollar",
                "start_date": "20-09-2022",
                "end_date": "21-08-2029",
                "effective_date": "21-08-2029",
                "contract_status": null,
                "contract_option": "yearly",
                "customer_cost_center": "1245453",
                "customer_cost_center_manager": "Saleem",
                "organization_type": "Other",
                "service_description": "Test Description",
                "billing_cycle": "ONCE",
                "markup_value": null,
                "total_budget": 20000,
                "capnitienable": false,
                "taskenable": false,
                "sla_tariffsheet": [
                    {
                        "cost_center_code": "120958",
                        "material_description": "Material Application",
                        "units": "4",
                        "estimated_quantity": "10",
                        "rate": "150",
                        "amount": "1400",
                        "markup_value": "1.5"
                    },
                    {
                        "cost_center_code": "120958",
                        "material_description": "Internal Power",
                        "units": "4",
                        "estimated_quantity": "10",
                        "rate": "150",
                        "amount": "1800",
                        "markup_value": "1.5"
                    }
                ],
                "sla_io": null,
                "sla_po": [
                    {
                        "po_numner": null,
                        "vendor": "customer",
                        "value": "chennai"
                    }
                ],
                "sla_contacts": [
                    {
                        "short_name": "BUS001",
                        "name": "kishore",
                        "email": "business001@mailinator.com",
                        "customer_type": "PROVIDER",
                        "primary": null,
                        "key_person": false,
                        "is_pre_invoice": true,
                        "is_sla": true
                    },
                    {
                        "short_name": "FAC001",
                        "name": "sudhakar",
                        "email": "facility001@mailinator.com",
                        "customer_type": "PROVIDER",
                        "primary": null,
                        "key_person": false,
                        "is_pre_invoice": true,
                        "is_sla": true
                    },
                    {
                        "short_name": "CUS001",
                        "name": "kamal",
                        "email": "customer001@mailinator.com",
                        "customer_type": "PROVIDER",
                        "primary": null,
                        "key_person": false,
                        "is_pre_invoice": true,
                        "is_sla": true
                    },
                    {
                        "short_name": "CUS001",
                        "name": "thiru",
                        "email": "customer001@mailinator.com",
                        "customer_type": "CUSTOMER",
                        "primary": null,
                        "key_person": false,
                        "is_pre_invoice": true,
                        "is_sla": true
                    },
                    {
                        "short_name": "CUS001",
                        "name": "akil",
                        "email": "customer001@mailinator.com",
                        "customer_type": "CUSTOMER",
                        "primary": null,
                        "key_person": false,
                        "is_pre_invoice": true,
                        "is_sla": true
                    }
                ],
                "sla_terms_and_conditions": [],
                "attachments": [],
                "sla_argeement_document": null,
                "sla_signed_argeement_document": null,
                "status": "Approve In-Progress",
                "is_active": true,
                "active": "inactive",
                "invoice_cycle": null,
                "slapreinvoice": [],
                "resources": [
                    {
                        "id": 5,
                        "project_name": "Car Development",
                        "projectid": 3,
                        "slaid": 3,
                        "sla_name": "4165/0806",
                        "userid": 5,
                        "hrid": null,
                        "resource_name": "User HR",
                        "resource_email": "hr001@mailinator.com",
                        "resource_shortid": "HR001",
                        "capcity": 10,
                        "level": "3"
                    },
                    {
                        "id": 4,
                        "project_name": "Car Development",
                        "projectid": 3,
                        "slaid": 3,
                        "sla_name": "4165/0806",
                        "userid": 4,
                        "hrid": null,
                        "resource_name": "User IT",
                        "resource_email": "it001@mailinator.com",
                        "resource_shortid": "IT001",
                        "capcity": 80,
                        "level": "3"
                    }
                ],
                "invoice_value": null,
                "invoice_status": null,
                "invoice_percentage": null,
                "payments": null,
                "payments_percentage": null
            }
        ]
    }
]