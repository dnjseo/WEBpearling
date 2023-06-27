package com.pearling.web.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.pearling.web.security.MyUserDetailsService;

@Configuration
public class SpringSecurityConfig {
	
    @Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http
		.csrf(csrf->csrf.disable())
		.authorizeHttpRequests(
				auth->auth
					.requestMatchers("/api/diaryComments").permitAll()
					.requestMatchers("/shell/**").hasAnyRole("ADMIN", "MEMBER")
					.requestMatchers("/admin/**").hasAnyRole("ADMIN")
					.anyRequest().permitAll()
				)
				.formLogin(
						form->form
							.loginPage("/login")
							.loginProcessingUrl("/login")
                            .defaultSuccessUrl("/shell/ourshell")
                        	)
                            .logout(logout->logout.logoutUrl("/logout")
							.logoutSuccessUrl("/")
                        	);
		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
			return new BCryptPasswordEncoder();
	}

	@Bean
	public UserDetailsService myUserDetailService(){
		return new MyUserDetailsService();
	}
}