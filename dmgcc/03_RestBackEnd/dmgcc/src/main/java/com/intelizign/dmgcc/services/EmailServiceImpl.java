package com.intelizign.dmgcc.services;

import java.io.IOException;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.intelizign.dmgcc.models.SLAModel;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
@EnableAsync
public class EmailServiceImpl {

	@Autowired
	private JavaMailSender javaMailSender;

	@Autowired
	private Environment env;

	@Autowired
	private Configuration config;

	public final Logger LOGGER = LogManager.getLogger(EmailServiceImpl.class);

	@Autowired
	public EmailServiceImpl(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	public void sendForgetMail(String to, Map<String, Object> model) {

		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject("G3C Your new password is just a few clicks away");
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("ForgotPassword.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
			mimeMessageHelper.setText(html, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {

			LOGGER.error("Error while sending mail" + e.getMessage());

		}
	}

	@Async
	public void sendLeadMail(String to, String subject, Map<String, Object> model) {

		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("LeadsMail.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

			mimeMessageHelper.setText(html, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error("Error while sending mail" + e.getMessage());

		}
	}

	@Async
	public void sendLeadMailToCustomer(String to, String subject, Map<String, Object> model) {

		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("CustomerAcknowlgmnt.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);

			mimeMessageHelper.setText(html, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error("Error while sending mail" + e.getMessage());

		}
	}

	@Async
	public void sendSubModelMail(String to, String subject, Map<String, Object> model) {

		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("BizCaseNotify.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
			mimeMessageHelper.setText(html, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error("Error while sending mail" + e.getMessage());

		}
	}

	@Async
	public void sendAssignFinanceMail(String to, String subject, Map<String, Object> model) {

		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("AssignFinance.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
			mimeMessageHelper.setText(html, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error("Error while sending mail" + e.getMessage());

		}
	}

	@Async
	public void sendBizCaseSetupMail(String to, String subject, Map<String, Object> model) {

		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("BizCaseSetupMail.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
			mimeMessageHelper.setText(html, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error("Error while sending mail" + e.getMessage());

		}
	}

	@Async
	public void sendProviderApproveMail(String to, String subject, Map<String, Object> model) {

		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("ApproveMail.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
			mimeMessageHelper.setText(html, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error("Error while sending mail" + e.getMessage());

		}
	}

	@Async
	public void sendApprovalConfirmatinMail(String to, String subject, Map<String, Object> model) {

		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("ApprovalConfirmation.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
			mimeMessageHelper.setText(html, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error("Error while sending mail" + e.getMessage());

		}
	}

	@Async
	public void sendSLAApproveMail(String to, String subject, Map<String, Object> model, SLAModel sladata,
			String outputFilename) {

		final String file_input = "uploads/files/" + outputFilename + ".pdf";

		try {
//			FileSystemResource fileSystem = new FileSystemResource(new File(file_input));
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("SLAApproval.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
			mimeMessageHelper.setText(html, true);

//			mimeMessageHelper.addAttachment(outputFilename + ".pdf", fileSystem);

			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error("Error while sending mail" + e.getMessage());

		}
	}

	@Async
	public void sendTaskAssignedMail(String to, String subject, Map<String, Object> task_asignee_model) {
		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("TaskMail.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, task_asignee_model);
			mimeMessageHelper.setText(html, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error("Error while sending mail" + e.getMessage());

		}

	}

	@Async
	public void sendFinanceMail(String to, String subject, Map<String, Object> project_model) {
		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("Finance.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, project_model);
			mimeMessageHelper.setText(html, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error("Error while sending mail" + e.getMessage());

		}

	}

	@Async
	public void sendFeedBackRemainderMail(String to, String subject, Map<String, Object> feedback_model) {
		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("FeedbackReminderMail.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, feedback_model);
			mimeMessageHelper.setText(html, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error("Error while sending mail" + e.getMessage());

		}

	}

	public void sendBizPerformanceLeadMail(String to, String subject, Map<String, Object> biz_setup_model) {
		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setTo(to);
			mimeMessageHelper.setSubject(subject);
			mimeMessageHelper.setFrom(env.getProperty("spring.mail.fromaddress"));

			Template t = config.getTemplate("BizCaseSetupPerformance.ftl");
			String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, biz_setup_model);
			mimeMessageHelper.setText(html, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException | IOException | TemplateException e) {
			LOGGER.error("Error while sending mail" + e.getMessage());

		}

	}

}
