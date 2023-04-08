package AmazingEventTesting;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class FilterTest {
	WebDriver driver;
	@Given("user open browser1")
	public void user_open_browser1() {
		System.out.println("Inside Step- Browser is Open");
		System.setProperty("webdriver.chrome.driver", 
		"C:\\Users\\Dieguillo\\Desktop\\Api testing\\chromedriver_win32\\chromedriver_win32\\chromedriver.exe");
		driver = new ChromeDriver();
	}

	@And("enter into the website1")
	public void enter_into_the_website1() throws InterruptedException {
		driver.navigate().to("https://amazing-events-uct.netlify.app/index.html");
		Thread.sleep(2000);

	}

	@When("^click in a filter (.*)$")
	public void click_in_a_filter(String option) throws InterruptedException {
		driver.findElement(By.id(option)).click();
		Thread.sleep(2000);
	}

	@Then("show the information that matches with the filter")
	public void show_the_information_that_matches_with_the_filter() {
		String cards;
		cards = driver.findElement(By.xpath("//*[@id=\"card\"]/div/h5")).getText();
		System.out.println("Name: "+cards);
		driver.close();
		driver.quit();
	}

}
