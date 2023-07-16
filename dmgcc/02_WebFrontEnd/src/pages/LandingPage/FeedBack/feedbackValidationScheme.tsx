import * as yup from "yup";


export const feedbackValidationSchema = yup.object({
    designation_level: yup
      .string()
      .required(String("Please choice the designation/level.")),
      project_name: yup
      .string()
      .required(String("Please choice the project name.")),
      project_id: yup
      .string()
      .required(String("Please enter the project id.")),
      cost_center: yup
      .string()
      .required(String("Please enter the cost cchoice.")),
      department: yup
      .string()
      .required(String("Please enter the department.")),
      orgranization: yup
      .string()
      .required(String("Please enter the orgranization.")),
    //   quality_status: yup
    //   .string()
    //   .required(String("Please choice the quality of the project deliverables")),
    //   adherence_status: yup
    //   .string()
    //   .required(String("Please choice the adherence to the project delivery timeline.")),
    //   quality_timeLine_status: yup
    //   .string()
    //   .required(String("Please choice the quality and timeliness of progress updates and reports")),
    //   knowledge_status: yup
    //   .string()
    //   .required(String("Please choice the knowledge of the team")),
    //   responsiveness_status: yup
    //   .string()
    //   .required(String("Please choice the responsiveness of the team")),
    //   communication_skills_status: yup
    //   .string()
    //   .required(String("Please choice the communication skills of the team")),
    //   overall_plan_status: yup
    //   .string()
    //   .required(String("please choice the overall planning and execution of project")),
    //   sustainability_status: yup
    //   .string()
    //   .required(String("Please choice the sustainability and handover of the project")),
      short_id: yup
      .string()
      .required(String("Please choice the short Id")),
    //   adherence_remark: yup
    //   .string()
    //   .required(String("")),
    //   quality_timeLine_remark: yup
    //   .string()
    //   .required(String("")),
    //   knowledge_remark: yup
    //   .string()
    //   .required(String("")),
    //   responsiveness_remark: yup
    //   .string()
    //   .required(String("")),
    //   communication_skills_remark: yup
    //   .string()
    //   .required(String("")),
    //   overall_plan_remark: yup
    //   .string()
    //   .required(String("")),
    //   sustainability_remark: yup
    //   .string()
    //   .required(String("")),
    //   recommend_counterpart_state: yup
    //   .string()
    //   .required(String("")),
    //   recommend_counterpart: yup
    //   .string()
    //   .required(String("Please choice the would you recommend us to your counterparts/colleagues?")),
      suggestions_improvement_areas: yup
      .string()
      .required(String("Please choice the any suggestions or improvement areas that you would recommend")),
    });