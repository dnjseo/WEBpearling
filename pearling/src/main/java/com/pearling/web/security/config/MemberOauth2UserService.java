package com.pearling.web.security.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    private BCryptPasswordEncoder encoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("getAttributes: {}", oAuth2User.getAttributes());

        OAuth2UserInfo oAuth2UserInfo = null;

        String provider = userRequest.getClientRegistration().getRegistrationId();

        if(provider.equals("google")) {
            log.info("구글 로그인 요청");
            oAuth2UserInfo = new GoogleUserInfo( oAuth2User.getAttributes() );
        } else if(provider.equals("kakao")) {
            log.info("카카오 로그인 요청");
            oAuth2UserInfo = new KakaoUserInfo( (Map)oAuth2User.getAttributes() );
        } else if(provider.equals("naver")) {
            log.info("네이버 로그인 요청");
            oAuth2UserInfo = new NaverUserInfo( (Map)oAuth2User.getAttributes().get("response") );
        } 

        String providerId = oAuth2UserInfo.getProviderId();
        String email = oAuth2UserInfo.getEmail();
        String loginId = provider + "_" + providerId;
        String name = oAuth2UserInfo.getName();

        Optional<Member> optionalUser = repository.findByLoginId(loginId);
        Member member = null;

        if (optionalUser.isEmpty()) {
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
