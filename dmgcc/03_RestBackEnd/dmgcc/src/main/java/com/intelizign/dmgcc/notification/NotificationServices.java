package com.intelizign.dmgcc.notification;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.intelizign.dmgcc.models.NotificationModel;
import com.intelizign.dmgcc.repositories.NotificationRepository;

@Service
@Transactional
public class NotificationServices {

	@Autowired
	private NotificationRepository notificationRepository;

	@Autowired
	SimpMessagingTemplate template;

	@Autowired
	private Environment env;

	public NotificationModel NotificationPojo(String sendby, String sendto, String shortid, String message,
			String url) {

		NotificationModel newNotificationModel = new NotificationModel();
		newNotificationModel.setMessage(message);
		newNotificationModel.setSend_by(sendby);
		newNotificationModel.setSend_to(sendto);
		newNotificationModel.setUrl(url);
		newNotificationModel.setCreate_date(LocalDateTime.now(ZoneId.of(env.getProperty("spring.app.timezone"))));
		newNotificationModel.setIs_active(true);
		newNotificationModel.setShortid(shortid);
		notificationRepository.save(newNotificationModel);

		List<NotificationModel> listnotificationdataList = notificationRepository.findByShortidAndActive(shortid, true);

		template.convertAndSendToUser(shortid, "/messages", listnotificationdataList);

		return newNotificationModel;
	}

}
