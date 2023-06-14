package com.pearling.web.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class MyUserDetails implements UserDetails{

    private int id;
	private String email;
	private String username;
	private String name;
	private String password;
	private String nickname;
	private List<GrantedAuthority> authorities;
	
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

	// 권한 getter setter
	public void setAuthorities(List<GrantedAuthority> authorities) {
		this.authorities = authorities;
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
    
}
