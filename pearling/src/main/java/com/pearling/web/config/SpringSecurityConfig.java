
package com.pearling.web.config;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/login", "/signup").permitAll()
                        .requestMatchers("/images/**", "/js/**", "/css/**").permitAll()
                        .anyRequest().authenticated());
        http
                .formLogin(login -> login
                        .loginPage("/login") // GET 요청 (login form을 보여줌)
                        .loginProcessingUrl("/shell/ourshell") // POST 요청 (login 창에 입력한 데이터를 처리)
                        .usernameParameter("email") // login에 필요한 id 값을 email로 설정 (default는 username)
                        .passwordParameter("pwd") // login에 필요한 password 값을 password(default)로 설정
                        .defaultSuccessUrl("/shell/ourshell", true).permitAll());
        http
                .logout(withDefaults());
                        // .logoutUrl("/logout")
                        // .logoutSuccessUrl("/")); // logout에 성공하면 /로 redirect

        return http.build();
    }
}
