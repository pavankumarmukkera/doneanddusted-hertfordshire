
file_path = r"c:\Users\Pavan Kumar\OneDrive\Desktop\doneanddusted\style.css"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Keep lines 0-800 (which is lines 1-801 in 1-based indexing)
# Keep lines 995-End (which is lines 996-End in 1-based indexing)
# Note: Python list is 0-indexed.
# Line 800 in 1-based is index 799.
# Line 996 in 1-based is index 995.

part1 = lines[:800]
part2 = lines[995:]

new_content = "".join(part1 + part2)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed style.css")
