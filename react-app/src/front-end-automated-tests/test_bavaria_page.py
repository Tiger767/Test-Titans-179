from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# Set up Selenium WebDriver with Chrome
driver = webdriver.Chrome()

# Visit the website
driver.get("http://localhost:5123/bavaria")

# Test the search functionality
search_input = driver.find_element_by_xpath("//input[@placeholder='Search Patients']")
search_input.send_keys("patient_uuid_example")
search_input.send_keys(Keys.RETURN)
wait = WebDriverWait(driver, 10)
wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'patient_uuid_example')]")))

# Test the Download Report button
download_report_button = driver.find_element_by_xpath("//button[contains(text(), 'Download Report')]")
download_report_button.click()
wait.until(EC.alert_is_present())

# Test the Refresh button
refresh_button = driver.find_element_by_xpath("//button[contains(text(), '⭮')]")
refresh_button.click()
wait.until(EC.staleness_of(search_input))

# Test the Add Doses button
num_doses_input = driver.find_element_by_xpath("//label[contains(text(), 'Number of Doses:')]/input")
num_doses_input.send_keys("5")
placebo_checkbox = driver.find_element_by_xpath("//label/input[@type='checkbox']")
placebo_checkbox.click()
add_doses_button = driver.find_element_by_xpath("//button[contains(text(), 'Add 5 Placebo Doses')]")
add_doses_button.click()

# Test the SideBar
dashboard_button = driver.find_element_by_xpath("//a[contains(text(), 'Dashboard')]")
dashboard_button.click()

# Close the browser
driver.quit()
