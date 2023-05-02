import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# Set up Selenium WebDriver with Chrome
driver = webdriver.Chrome()

# Navigate to the Doctor page
driver.get("http://localhost:5123/janeHopkinsDoctor")

# Test 'Add Patient' button
add_patient_button = driver.find_element(By.XPATH, '//button[contains(text(), "Add Patient")]')
add_patient_button.click()

time.sleep(1)

# Fill out the patient form
patient_uuid_input = driver.find_element(By.NAME, "patientUUID")
patient_uuid_input.send_keys("test-uuid")

patient_name_input = driver.find_element(By.NAME, "patientName")
patient_name_input.send_keys("John Doe")

# Submit the form
submit_button = driver.find_element(By.XPATH, '//button[contains(text(), "Submit")]')
submit_button.click()

time.sleep(1)

# Test 'Edit' button
edit_button = driver.find_element(By.XPATH, '//button[contains(text(), "Edit")]')
edit_button.click()

time.sleep(1)

# Edit a patient field
patient_name_edit = driver.find_element(By.XPATH, '//div[contains(@class, "text-sm text-gray-900")][2]')
patient_name_edit.send_keys(Keys.BACKSPACE * 5)
patient_name_edit.send_keys("Smith")

# Save changes
save_button = driver.find_element(By.XPATH, '//button[contains(text(), "Save")]')
save_button.click()

time.sleep(1)

# Test 'Give a Dose' button
give_dose_button = driver.find_element(By.XPATH, '//button[contains(text(), "Give a Dose")]')
give_dose_button.click()

time.sleep(1)

# Test 'Add Visit' button
add_visit_button = driver.find_element(By.XPATH, '//button[contains(text(), "Add Visit")]')
add_visit_button.click()

time.sleep(1)

# Test 'Show Visits' button
show_visits_button = driver.find_element(By.XPATH, '//button[contains(text(), "Show Visits")]')
show_visits_button.click()

time.sleep(1)

# Close the browser
driver.quit()

