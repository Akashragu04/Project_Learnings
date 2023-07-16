package com.intelizign.dmgcc.notification;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;


@Component
public class WebSocketEventListener {


	  public final Logger LOGGER = LogManager.getLogger(WebSocketEventListener.class);
	  
	@EventListener
    private void handleSessionConnected(SessionConnectEvent event) {

		LOGGER.info("Session Connected: " + event);
    }

    @EventListener
    private void handleSessionDisconnect(SessionDisconnectEvent event) {

		LOGGER.info("Session Disconnected: " + event);
    }
	@EventListener
    private void handleSessionConnected(SessionConnectedEvent event) {

		LOGGER.info("Session ConnectedEvent: " + event);
    }

    @EventListener
    private void handleSessionDisconnect(SessionSubscribeEvent event) {

		LOGGER.info("Session Subscribe: " + event);
    }

    @EventListener
    private void handleSessionDisconnect(SessionUnsubscribeEvent event) {

		LOGGER.info("Session UnSubscribe: " + event);
    }
    
}
