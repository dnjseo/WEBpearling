package com.pearling.web.security.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.pearling.web.entity.Member;
import com.pearling.web.entity.Role;
import com.pearling.web.repository.MemberRepository;
import com.pearling.web.security.MyUserDetails;
import com.pearling.web.service.RoleService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private MemberRepository repository;

    @Autowired
    private RoleService service;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("getAttributes: {}", oAuth2User.getAttributes());

        String provider = userRequest.getClientRegistration().getRegistrationId();
        String providerId = oAuth2User.getAttribute("sub");
        String loginId = provider + "_" + providerId;

        Optional<Member> optionalUser = repository.findByLoginId(loginId);
        Member member;

        if (optionalUser.isEmpty()) {
            String email = oAuth2User.getAttribute("email");
            String name = oAuth2User.getAttribute("name");
            member = Member.builder()
                    .loginId(loginId)
                    .email(email)
                    .name(name)
                    .roleId(2)
                    .provider(provider)
                    .providerId(providerId)
                    .build();
            repository.insertMember(member);
        } else {
            member = optionalUser.get();
            log.info("Member: {}", member);
        }

        Role role = service.getRoleById(member.getRoleId());
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.getName()));

        // Create MyUserDetails with additional attributes
        MyUserDetails userDetails = new MyUserDetails(member, oAuth2User.getAttributes(), authorities);
		userDetails.setEmail(member.getEmail());
        userDetails.setName(member.getName());
		userDetails.setNickname(member.getNickname());
		userDetails.setProfileImage(member.getProfileImage());

        return userDetails;
    }
}
