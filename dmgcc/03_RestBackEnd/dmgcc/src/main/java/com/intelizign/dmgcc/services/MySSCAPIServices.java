package com.intelizign.dmgcc.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intelizign.dmgcc.models.CostCenterModel;
import com.intelizign.dmgcc.models.SLAModel;
import com.intelizign.dmgcc.pojoclass.MySSCSLAModel;
import com.intelizign.dmgcc.request.MySLAApprovalRequest;
import com.intelizign.dmgcc.response.MySSCLapServerResponce;
import com.intelizign.dmgcc.response.SLAPreInvoiceResponse;
import com.intelizign.dmgcc.response.myssc.MySSCCostcenterResponse;
import com.intelizign.dmgcc.response.myssc.MySSCInvoiceResponse;
import com.intelizign.dmgcc.response.myssc.MySSCInvoiceStatus;
import com.intelizign.dmgcc.response.myssc.MySSCSLAApprovedResponce;
import com.intelizign.dmgcc.response.myssc.MySSCSLAPreInvoiceResponse;
import com.intelizign.dmgcc.response.myssc.MySSCSLAResponse;

@Service
@Transactional
public class MySSCAPIServices {

	@Autowired
	private Environment env;

	public MySSCSLAResponse getSlaidfromMySSC(MySSCSLAModel sla_data) {

		final String uri = env.getProperty("myssc.app.url") + "api/sla/add";

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<MySSCSLAModel> request = new HttpEntity<>(sla_data, headers);
		Object response_from_myssc = restTemplate.postForObject(uri, request, Object.class);
		ObjectMapper mapper = new ObjectMapper();
		return mapper.convertValue(response_from_myssc, MySSCSLAResponse.class);

	}

	public MySSCSLAResponse updateSla(MySSCSLAModel sla_data) {

		final String uri = env.getProperty("myssc.app.url") + "api/sla/updatesla";

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<MySSCSLAModel> request = new HttpEntity<>(sla_data, headers);
		Object response_from_myssc = restTemplate.postForObject(uri, request, Object.class);
		ObjectMapper mapper = new ObjectMapper();
		return mapper.convertValue(response_from_myssc, MySSCSLAResponse.class);

	}

	public MySSCSLAApprovedResponce updateSLAApprovalToMySSC(SLAModel sla_data) {
		final String uri = env.getProperty("myssc.app.url") + "api/sla/update";
		MySLAApprovalRequest request_data = new MySLAApprovalRequest(sla_data.getSlaid(),
				String.valueOf(sla_data.getId()), sla_data.getStatus(), sla_data.getSla_signed_argeement_document());

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<MySLAApprovalRequest> request = new HttpEntity<>(request_data, headers);
		Object response_from_myssc = restTemplate.postForObject(uri, request, Object.class);
		ObjectMapper mapper = new ObjectMapper();
		return mapper.convertValue(response_from_myssc, MySSCSLAApprovedResponce.class);

	}

	public MySSCSLAPreInvoiceResponse getSlaPreinvoiceIDfromMySSC(SLAPreInvoiceResponse preinvoice_sla_data) {
		final String uri = env.getProperty("myssc.app.url") + "api/slapreinvoice/add";

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<SLAPreInvoiceResponse> request = new HttpEntity<>(preinvoice_sla_data, headers);
		Object response_from_myssc = restTemplate.postForObject(uri, request, Object.class);
		ObjectMapper mapper = new ObjectMapper();
		return mapper.convertValue(response_from_myssc, MySSCSLAPreInvoiceResponse.class);

	}

	public MySSCInvoiceStatus updatePreinvoiceStatusfromMySSC(List<String> unapproved_preinvoice) {
		final String uri = env.getProperty("myssc.app.url") + "api/slapreinvoice/PreInvoiceStatus";

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<List<String>> request = new HttpEntity<>(unapproved_preinvoice, headers);
		Object response_from_myssc = restTemplate.postForObject(uri, request, Object.class);
		ObjectMapper mapper = new ObjectMapper();
		return mapper.convertValue(response_from_myssc, MySSCInvoiceStatus.class);

	}

	public MySSCInvoiceResponse getInvoiceForPreinvoicefromMySSC(List<String> approved_preinvoice) {
		final String uri = env.getProperty("myssc.app.url") + "api/invoice/InvoiceStatus";

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<List<String>> request = new HttpEntity<>(approved_preinvoice, headers);
		Object response_from_myssc = restTemplate.postForObject(uri, request, Object.class);
		ObjectMapper mapper = new ObjectMapper();
		return mapper.convertValue(response_from_myssc, MySSCInvoiceResponse.class);

	}

	public MySSCInvoiceStatus updateInvoiceStatusfromMySSC(List<String> incomplete_invoice) {
		final String uri = env.getProperty("myssc.app.url") + "api/invoice/GetPaymentResponse";

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<List<String>> request = new HttpEntity<>(incomplete_invoice, headers);
		Object response_from_myssc = restTemplate.postForObject(uri, request, Object.class);
		ObjectMapper mapper = new ObjectMapper();
		return mapper.convertValue(response_from_myssc, MySSCInvoiceStatus.class);

	}

	public MySSCCostcenterResponse saveCostcenterInMySSC(List<CostCenterModel> costcenters) {
		final String uri = env.getProperty("myssc.app.url") + "api/costcenter/add";

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<List<CostCenterModel>> request = new HttpEntity<>(costcenters, headers);
		Object response_from_myssc = restTemplate.postForObject(uri, request, Object.class);
		ObjectMapper mapper = new ObjectMapper();
		return mapper.convertValue(response_from_myssc, MySSCCostcenterResponse.class);

	}

	// Get User from LDAP Server
	public MySSCLapServerResponce getLDAPUsers(String shortid) {
		final String uri = env.getProperty("myssc.app.url") + "api/LDAP/GetUserDetailsFromLdap?ShortID=" + shortid;

		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		Object response_from_myssc = restTemplate.getForObject(uri, Object.class);
		ObjectMapper mapper = new ObjectMapper();
		return mapper.convertValue(response_from_myssc, MySSCLapServerResponce.class);

	}

}
