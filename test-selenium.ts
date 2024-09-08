import { Builder, Browser, By, until, Key } from "selenium-webdriver";

(async function example() {
	const driver = await new Builder().forBrowser(Browser.CHROME).build();
	try {
		await driver.manage().window().maximize();
		await driver.get("https://www.npmjs.com");
		await driver.wait(until.titleIs("npm | Home"), 1000);
		const searchBox = await driver.findElement(By.name("q"));
		await searchBox.sendKeys("selenium webdriver", Key.RETURN);
		await driver.wait(
			until.titleContains("selenium webdriver - npm search"),
			10000,
		);
		const results = await driver.findElements(
			By.className("ef4d7c63 flex-l pl1-ns pt3 pb2 ph1 bb b--black-10"),
		);
		for (const result of results) {
			const title = await result.findElement(By.css("h3"));
			const text = await title.getText();
			console.log(text);
		}
		const seleniumwd = await driver.findElement(
			By.xpath("//a[@href='/package/selenium-webdriver']"),
		);
		await seleniumwd.click();
		await driver.wait(until.titleIs("selenium-webdriver - npm"), 10000);
	} finally {
		await driver.quit();
	}
})();
