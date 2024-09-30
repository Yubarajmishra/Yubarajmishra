import os
import git
import json
from datetime import datetime

# Define paths
REPO_DIR = 'data_version_control_repo'
DATA_FILE = 'data_entries.json'

# Initialize or open a Git repository
def init_repo():
    if not os.path.exists(REPO_DIR):
        os.makedirs(REPO_DIR)
        repo = git.Repo.init(REPO_DIR)
    else:
        repo = git.Repo(REPO_DIR)
    return repo

# Save the new data entry
def save_data_entry(name, email, message, num1, num2, operator, result):
    data_path = os.path.join(REPO_DIR, DATA_FILE)
    
    # Load existing data
    if os.path.exists(data_path):
        with open(data_path, 'r') as file:
            data_entries = json.load(file)
    else:
        data_entries = []

    # Add new entry
    new_entry = {
        'name': name,
        'email': email,
        'message': message,
        'num1': num1,
        'num2': num2,
        'operator': operator,
        'result': result,
        'timestamp': datetime.now().isoformat()
    }
    data_entries.append(new_entry)

    # Save updated data
    with open(data_path, 'w') as file:
        json.dump(data_entries, file, indent=4)

# Commit changes to Git
def commit_changes(repo, name, email):
    data_path = os.path.join(REPO_DIR, DATA_FILE)
    repo.index.add([data_path])
    commit_message = f"Data entry by {name} ({email}) on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    repo.index.commit(commit_message)

# Main function to process data entry
def process_data_entry(name, email, message, num1, num2, operator):
    # Initialize repository
    repo = init_repo()

    # Calculate the result
    if operator == '+':
        result = num1 + num2
    elif operator == '-':
        result = num1 - num2
    elif operator == '*':
        result = num1 * num2
    elif operator == '/':
        if num2 == 0:
            print("Error: Division by zero!")
            return
        result = num1 / num2
    else:
        print("Error: Invalid operation!")
        return

    # Save the data entry
    save_data_entry(name, email, message, num1, num2, operator, result)

    # Commit the new data to the repository
    commit_changes(repo, name, email)

    print(f"Data entry for {name} saved and version controlled.")

# Example usage
if __name__ == '__main__':
    # Example data (this would typically come from the form)
    name = 'John Doe'
    email = 'johndoe@example.com'
    message = 'This is a sample message.'
    num1 = 10
    num2 = 5
    operator = '+'

    # Process the data entry
    process_data_entry(name, email, message, num1, num2, operator)