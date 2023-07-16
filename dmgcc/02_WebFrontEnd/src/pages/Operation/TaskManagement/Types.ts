export const taskManagementDetails = [
    {
        id: 1,
        task_no: 'ABC 123',
        task: 'Car',
        SLA: '1000-1111-111',
        status: 'in-progress',
        assigned_to: 'Management',
        hours: '8 hrs',
        remarks: '-'
    },
    {
        id: 2,
        task_no: 'ABC 123',
        task: 'Car',
        SLA: '1000-1111-111',
        status: 'in-progress',
        assigned_to: 'Management',
        hours: '8 hrs',
        remarks: '-'
    },
    {
        id: 3,
        task_no: 'ABC 123',
        task: 'Car',
        SLA: '1000-1111-111',
        status: 'in-progress',
        assigned_to: 'Management',
        hours: '8 hrs',
        remarks: 'test'
    },
    {
        id: 4,
        task_no: 'ABC 123',
        task: 'Car',
        SLA: '1000-1111-111',
        status: 'in-progress',
        assigned_to: 'Management',
        hours: '8 hrs',
        remarks: '-'
    },
    {
        id: 5,
        task_no: 'ABC 123',
        task: 'Car',
        SLA: '1000-1111-111',
        status: 'in-progress',
        assigned_to: 'Management',
        hours: '8 hrs',
        remarks: 'test'
    }
]

interface TaskMngValidation {
taskName:string,
invlidTaskName:string
}

export const taskNameValida:TaskMngValidation = {
    taskName:'Please enter the Task name',
    invlidTaskName:'Invalid Task Name'
}

export const statusList:any = [
    {
        id:1,
        name:'Open'
    },
    {
        id:2,
        name:'Inprogress'
    },
    {
        id:3,
        name:'Hold'
    },
    {
        id:4,
        name:'Closed'
    },
    {
        id:5,
        name:'Re-Open'
    }
]