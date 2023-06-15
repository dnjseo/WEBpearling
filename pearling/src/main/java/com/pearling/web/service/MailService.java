package com.pearling.web.service;

import java.io.UnsupportedEncodingException;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

public interface MailService {
    MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException;
    String createKey();
    String sendSimpleMessage(String to) throws Exception;
}
