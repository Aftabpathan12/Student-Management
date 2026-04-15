//package com.student.managment.security;
//
//import java.util.List;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.*;
//
//@Configuration
//public class CorsConfig {
//
//	@Bean
//	public CorsConfigurationSource corsConfigurationSource() {
//	    CorsConfiguration config = new CorsConfiguration();
//
//	    config.setAllowedOrigins(List.of("http://localhost:3000"));
//	    config.setAllowedMethods(List.of("*"));
//	    config.setAllowedHeaders(List.of("*"));
//	    config.setAllowCredentials(true);
//
//	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//	    source.registerCorsConfiguration("/**", config);
//
//	    return source;
//	}
//}
package com.student.managment.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.cors.*;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {

        CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOrigin("*"); // ✅ allow all
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}