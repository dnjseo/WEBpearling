package com.pearling.web.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurityConfig {

        @Autowired
        private DataSource dataSource;

        // 권한을 위한 필터 객체
        @Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http
//		.cors(cors->cors.disable())
		.csrf(csrf->csrf.disable())
//		.authorizeHttpRequests().requestMatchers("").hasAnyRole("");
		.authorizeHttpRequests(
				auth->auth
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
                                // .logout(logout->logout.logoutUrl("/logout")
                                // )                       
                                ;
		
		return http.build();
	}

        // 사용자 정보를 위한 서비스 객체
        // 1. 인 메모리 사용자 정보
        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        // @Bean
        public UserDetailsService userDetailsService() {

                UserDetails newlec = User.builder()
                                .username("hahaha@naver.com")
                                .password(passwordEncoder().encode("1234"))
                                .build();

                return new InMemoryUserDetailsManager(newlec);
        }

        @Bean
        public UserDetailsService jdbcUserDetailService() {
                JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
                // manager.setUsersByUsernameQuery("select email, pwd, 1 enable from member
                // where username=?"); // username, password, enable
                manager.setUsersByUsernameQuery("select email username, pwd password, 1 enabled from member where email=?"); // username,
                                                                                                            // password,
                                                                                                            // enable
                manager.setAuthoritiesByUsernameQuery(
                                "select email username, r.name authority from role r join member m on r.id=m.roleId where email=?"); // username,
                                                                                                                          // authority
                // username이 newlec 이라면
                // username, password enable
                // newlec | 111
                System.out.println(passwordEncoder().encode("1234"));
                // username, autority
                // newlec | ROLE_MEMBER
                // dragon | ROLE_MEMBER

                return manager;
        }
}