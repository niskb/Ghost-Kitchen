package niskb.ghostKitchen.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld {

    @RequestMapping(value = "")
    public String sayHello() {
        return "Hello World!";
    }

}