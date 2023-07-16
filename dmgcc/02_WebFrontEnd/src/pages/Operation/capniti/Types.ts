export interface fieldCapnitiKey {
    timesheet_date: any,
    working_hours: string,
    start_time: string,
    end_time: string,
    Working_Type: string,
    project: string,
    sla: string,
    task: string,
    comments: string,
    captinityleave: any
}

export const fieldCapniti:fieldCapnitiKey = {
    timesheet_date: new Date(),
    working_hours: '',
    start_time: '',
    end_time: '',
    Working_Type: '',
    project: '',
    sla: '',
    task: '',
    comments: '',
    captinityleave: false
}

export const WorkingType = [
    {
        id:1,
        Working_Type:'Full Time',
        project:'project 1',
        tasks:'Task 1',
        sla_task:'SLA 1'
    },
    {
        id:2,
        Working_Type:'Part Time',
        project:'project 2',
        tasks:'Task 1',
        sla_task:'SLA 2'
    }
]