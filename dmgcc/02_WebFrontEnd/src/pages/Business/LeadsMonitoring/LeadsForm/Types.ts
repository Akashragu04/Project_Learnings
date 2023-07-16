
import moment from 'moment';

export const formSchmFields:formSchmFieldsKey = {
    request_date: moment(new Date()).format('YYYY-MM-DD'),
    receiver_short_id:"",
    receiver_contact_name: "",
    receiver_email_id: "",
    receiver_department: "",
    receiver_entity: "",
    project_name: "",
    provider_short_id: "",
    provider_name: "",
    provider_email: "",
    provider_department: "",
    short_description: "",
    service_provider_cost_center:"",
    service_receiver_cost_center:""
  }

 export interface formSchmFieldsKey {
    request_date: any,
    receiver_short_id:string,
    receiver_contact_name: string,
    receiver_email_id: string,
    receiver_department: string,
    receiver_entity: string,
    project_name: string,
    provider_short_id: string,
    provider_name: string,
    provider_email: string,
    provider_department: string,
    short_description: string,
    service_provider_cost_center:string,
    service_receiver_cost_center:string

  }

  
interface leadValidation {
  receiverShort:string,
  receiverContactName:string,
  receiverEntity:string,
  receiverEntityCharacters2:string,
  receiverEntityCharacters150:string,
  projectName:string,
  projectNameCharacters2:string,
  projectNameCharacters150:string,
  lengthMinMsg:string,
  lengthMaxMsg:string
}

export const leadValida: leadValidation = {
  receiverShort:"Please enter the receiver Short Id",
  receiverContactName:"Please enter the receiver Contact Name",
  receiverEntity:"Please enter the receiver entity",
  receiverEntityCharacters2:'Please enter at least 2 characters',
  receiverEntityCharacters150:'Receiver entity should not be more than 150 characters',
  projectName:"Please enter the project name",
  projectNameCharacters2:'Please enter at least 2 characters',
  projectNameCharacters150:'Project name should not be more than 12 characters',
  lengthMinMsg: "Please enter at least 3 characters",
  lengthMaxMsg: "Should not be more than 150 characters",

}