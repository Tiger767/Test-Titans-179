import time
from selenium import webdriver

# Set up Selenium WebDriver with Chrome
driver = webdriver.Chrome()

# Navigate to the FDA page
driver.get("http://localhost:5123/fda")

# Test the search input
search_input = driver.find_element_by_css_selector("input[type='text']")
search_input.send_keys("patient_uuid")
time.sleep(2)
search_input.clear()

# Test the refresh button
refresh_button = driver.find_element_by_css_selector("button:nth-child(2)")
refresh_button.click()
time.sleep(2)

# Test the Assign Placebo Drugs Equally button
assign_placebo_button = driver.find_element_by_css_selector("button:nth-child(3)")
assign_placebo_button.click()
time.sleep(2)

# Test the Assign Bavaria Drugs Equally button
assign_bavaria_button = driver.find_element_by_css_selector("button:nth-child(4)")
assign_bavaria_button.click()
time.sleep(2)

# Test the Share Assignments (End of Trial) button
share_assignments_button = driver.find_element_by_css_selector("button:nth-child(5)")
share_assignments_button.click()
time.sleep(2)

# Test the Label Doses with FDA ID button
label_doses_button = driver.find_element_by_css_selector("button:nth-child(6)")
label_doses_button.click()
time.sleep(2)

# Test the Assign Placebo and Assign Bavaria buttons for the first patient in the list
assign_placebo_first_patient_button = driver.find_element_by_css_selector("tbody tr:first-child button:first-child")
assign_placebo_first_patient_button.click()
time.sleep(2)

assign_bavaria_first_patient_button = driver.find_element_by_css_selector("tbody tr:first-child button:nth-child(2)")
assign_bavaria_first_patient_button.click()
time.sleep(2)

# Close the browser
driver.quit()
