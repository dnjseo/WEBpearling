package com.pearling.web.security;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.pearling.web.entity.Member;

public class MyUserDetails implements UserDetails, OAuth2User{

    private int id;
	private String email;
	private String username;
	private String name;
	private String password;
	private String nickname;
	private String profileImage;
	private List<GrantedAuthority> authorities;
	private Member member;
	private Map<String, Object> attributes;
	
	// 아이디 getter setter
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	// 이메일 getter setter
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	// username setter
	public void setUsername(String username) {
		this.username = username;
	}

	// name getter setter
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	// 비밀번호 setter
	public void setPassword(String password) {
		this.password = password;
	}

	// 닉네임 getter setter
	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	// 이미지 getter setter
	public String getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	// 권한 getter setter
	public void setAuthorities(List<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public MyUserDetails(Member member, Map<String, Object> attributes, List<GrantedAuthority> authorities) {
		this.member = member;
		this.attributes = attributes;
		this.authorities = authorities;
		this.username = member.getEmail(); // 이메일 값을 주요 사용자 이름으로 설정
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public String getPassword() {
		return password;
	}
	
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}
}