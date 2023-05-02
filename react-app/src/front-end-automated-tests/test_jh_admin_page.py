from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up Selenium WebDriver with Chrome
driver = webdriver.Chrome()

# Go to the target page
driver.get("http://localhost:5123/janeHopkinsAdmin")

# Function to wait for an element to appear
def wait_for_element(xpath, timeout=10):
    element_present = EC.presence_of_element_located((By.XPATH, xpath))
    WebDriverWait(driver, timeout).until(element_present)

# Test search input field
search_input = driver.find_element_by_xpath('//input[@placeholder="Search Patients"]')
search_input.send_keys("John Doe")
search_input.send_keys(Keys.RETURN)

# Test refresh button
refresh_button = driver.find_element_by_xpath('//button[contains(text(), "⭮")]')
refresh_button.click()

# Test share eligible patient info button
share_button = driver.find_element_by_xpath('//button[contains(text(), "Share Eligible Patient Info (End of Trial)")]')
share_button.click()

# Test check trial complete button
check_trial_complete_button = driver.find_element_by_xpath('//button[contains(text(), "Check Trial Complete")]')
check_trial_complete_button.click()

# Test edit button for the first patient
edit_button = driver.find_element_by_xpath('//tbody/tr[1]/td/button[contains(text(), "Edit")]')
edit_button.click()

# Edit patient name and save changes
name_field = driver.find_element_by_xpath('//tbody/tr[1]/td[1]/div')
name_field.send_keys(Keys.BACK_SPACE * 10)
name_field.send_keys("New Name")
save_button = driver.find_element_by_xpath('//tbody/tr[1]/td/button[contains(text(), "Save")]')
save_button.click()

# Test cancel button for the second patient
edit_button = driver.find_element_by_xpath('//tbody/tr[2]/td/button[contains(text(), "Edit")]')
edit_button.click()
cancel_button = driver.find_element_by_xpath('//tbody/tr[2]/td/button[contains(text(), "Cancel")]')
cancel_button.click()

# Close the browser
driver.quit()