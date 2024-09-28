package xyz.mendesoft.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary(){


        return new Cloudinary(ObjectUtils.asMap(
                "xxxx",
                "api_key", "xxxx",
                "api_secret", "xxxx"
        ));
    }
}
