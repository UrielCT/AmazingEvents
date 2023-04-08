package AmazingEventTesting;

import static org.junit.Assert.assertEquals;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Given;

public class CardsTest {
	WebDriver driver;
	@Given("user open browser.")
	public void user_open_browser() {
		System.out.println("Inside Step- Browser is Open");
		System.setProperty("webdriver.chrome.driver", 
		"C:\\Users\\Dieguillo\\Desktop\\Api testing\\chromedriver_win32\\chromedriver_win32\\chromedriver.exe");
		driver = new ChromeDriver();
		
	}

	@And("enter into the website.")
	public void enter_into_the_website() {
		driver.navigate().to("https://amazing-events-uct.netlify.app/index.html");
	}

	@When("user clicks the button -Ver Mas...-")
	public void user_clicks_the_button() throws InterruptedException {
		Thread.sleep(2000);
		driver.findElement(By.xpath("//*[@id=\"card\"]/div/div/a")).click();
	}

	@Then("information is available")
	public void information_is_available() throws InterruptedException {
		String name;
		Thread.sleep(2000);
		name = driver.findElement(By.xpath("//*[@id=\"detail_container\"]/div/div[2]/h2")).getText();
		
		assertEquals(true,name.contains("Party"));
		driver.close();
		driver.quit();
	}
}
