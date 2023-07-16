export const externalResourceData:any =[
    {
        id:'1',
        "shortid": "THRIDPARTY001",
        "hrid": "HR0056",
        "employee_code": "EMP025",
        "hrwt_code": "HRT016",
        "emp_name": "Third Party Employee",
        "designation": "IT",
        "functions": "IT",
        "department_id": "Department0001",
        "date_of_join": "2015-03-30",
        "email": "thirdparty001@mailinator.com",
        "user_id": "10009",
        "category": "G3C",
        "business": "Yes"
        }
]

interface ExternalResourceValidation {
    shortid: string,
    hrid:string,
    emp_name:string,
    designation:string,
    functions:string,
    department_id:string,
    email:string,
    shortidPattenValid:string,
    hridPattenValid:string,
    empNamePattenValid:string
}



export const ExternalResourceValida: ExternalResourceValidation = {
    shortid: 'Please enter the Short Id',
    hrid:'Please enter the HR Id',
    emp_name:'Please enter the Employee Name',
    designation:'Please enter the Designation',
    functions:'Please enter the Function',
    department_id:'Please enter the Department',
    email:'Please enter the Email',
    shortidPattenValid:'Please enter Valid Short Id',
    hridPattenValid:'Please enter Valid HR Id',
    empNamePattenValid:'please enter valid Employee Name'
  }