package com.pearling.web.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.pearling.web.entity.Member;
import com.pearling.web.entity.Role;
import com.pearling.web.service.MemberService;
import com.pearling.web.service.RoleService;

public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	private MemberService memberService;

	@Autowired
	private RoleService roleService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Member member = memberService.getByUsername(username);
		Role role = roleService.getRoleById(member.getRoleId());
		MyUserDetails userDetails = new MyUserDetails(member, null, null);

		userDetails.setId(member.getId());
		userDetails.setEmail(member.getEmail());
		userDetails.setUsername(username);
		userDetails.setName(member.getName());
		userDetails.setPassword(member.getPwd());
		userDetails.setNickname(member.getNickname());
		userDetails.setProfileImage(member.getProfileImage());
		userDetails.setRoleId(member.getRoleId());
		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(role.getName()));
		userDetails.setAuthorities(authorities);

		return userDetails;
	}
}