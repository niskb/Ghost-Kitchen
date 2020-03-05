package niskb.GhostKitchen.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld {
	
	@RequestMapping(value= "")
	public String helloWorld() {
		return "Hello World!";
	}
}
