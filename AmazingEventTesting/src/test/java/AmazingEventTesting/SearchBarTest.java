package AmazingEventTesting;

import static org.junit.Assert.assertEquals;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class SearchBarTest {
	WebDriver driver;

	@Given("user open browser-")
	public void user_open_browser() {
		System.out.println("Inside Step- Browser is Open");
		System.setProperty("webdriver.chrome.driver",
				"C:\\Users\\Dieguillo\\Desktop\\Api testing\\chromedriver_win32\\chromedriver_win32\\chromedriver.exe");
		driver = new ChromeDriver();
	}

	@And("enter into the website-")
	public void enter_into_the_website() throws InterruptedException {
		driver.navigate().to("https://amazing-events-uct.netlify.app/index.html");
		Thread.sleep(2000);

	}

	@When("^user type a (.*) in the SearchBar$")
	public void user_type_in_the_searchbar(String word) throws InterruptedException {
		driver.findElement(By.id("id_search")).sendKeys(word);
		Thread.sleep(2000);
	}

	@Then("^The information matches with the (.*)$")
	public void the_information_matches_with_the_word(String word) throws InterruptedException {
		assertEquals(word, driver.findElement(By.xpath("//*[@id=\"card\"]/div/h5")).getText());
		Thread.sleep(2000);
		driver.close();
		driver.quit();

	}
}
