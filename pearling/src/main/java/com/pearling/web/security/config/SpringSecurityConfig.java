package com.pearling.web.security.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import com.pearling.web.security.MyUserDetailsService;

@Configuration
public class SpringSecurityConfig {

        @Autowired
        private DataSource dataSource;

        @Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http
		.csrf(csrf->csrf.disable())
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
                                .logout(logout->logout.logoutUrl("/logout")
                                )                       
                                ;
		
		return http.build();
	}

        // 1. 인 메모리 사용자 정보
        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        //@Bean
        // public UserDetailsService jdbcUserDetailService() {
        //         JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
        //         manager.setUsersByUsernameQuery("select email username, pwd password, 2 enabled from member where email=?"); // username,
        //                                                                                                     // password,
        //                                                                                                     // enable
        //         manager.setAuthoritiesByUsernameQuery(
        //                         "select email username, r.name authority from role r join member m on r.id=m.roleId where email=?"); // username,

        //         return manager;
        // }

        @Bean
	public UserDetailsService myUserDetailService(){
		
		return new MyUserDetailsService();
	}
}