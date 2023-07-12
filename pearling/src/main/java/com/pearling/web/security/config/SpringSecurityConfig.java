package com.pearling.web.security.config;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private MemberOauth2UserService memberOauth2UserService;

	@Autowired
    private CustomLoginSuccessHandler customLoginSuccessHandler;

	
    @Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http
		.csrf(csrf->csrf.disable())
		.sessionManagement(session -> session
            .maximumSessions(1) // 동시 로그인 세션 수 설정
            .maxSessionsPreventsLogin(false) // 동시 로그인 제한에 대한 처리 설정 (true: 새로운 세션 로그인 거부, false: 이전 세션 만료)
            .expiredUrl("/logout") // 세션 만료 시 리다이렉트될 URL
        )
		.authorizeHttpRequests(
				auth->auth
					.requestMatchers( "/diary/**", "/follow/**", "/guestbook/**", "/notice/**", "/qa/**", 
													"/schedule/**", "/search/**", "/setting/**", "/shell/**").hasAnyRole("ADMIN", "MEMBER")
					.requestMatchers("/admin/**").hasAnyRole("ADMIN")
					.requestMatchers("/api/diaryComments").permitAll()
					.anyRequest().permitAll()
				)
				.formLogin(
						form->form
							.loginPage("/login")
							.loginProcessingUrl("/login")
                            .successHandler(customLoginSuccessHandler)
                        	)
                            .logout(logout->logout.logoutUrl("/logout")
							.logoutSuccessUrl("/")
                        	)
                    .oauth2Login(customizer -> customizer
                            .loginPage("/login")
                            .successHandler(customLoginSuccessHandler)
                            .userInfoEndpoint()
                            .userService(memberOauth2UserService)
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