import re
import os

css_file = 'c:/KULIAH/MAGANG/PORRTO/html/css/style.css'

with open(css_file, 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update body to have black background and dark text (but not too dark)
# Wait, the body rule is:
# body {
#     font-family: "Poppins", sans-serif;
# }
css = re.sub(
    r'(body\s*\{[^}]*?)\}',
    r'\1    background-color: #050505;\n    color: #a0a0a0;\n}',
    css
)

# 2. Update h1-h5 to be red
css = re.sub(
    r'(h1,\s*h2,\s*h3,\s*h4,\s*h5\s*\{[^}]*?)\}',
    r'\1    color: #F50101;\n}',
    css
)

# 3. Replace background colors to dark ones
css = css.replace('background-color: #f3f3f3;', 'background-color: #0a0a0a;')
css = css.replace('background-color: #f2f2f2;', 'background-color: #111111;')
css = css.replace('background-color: #fff;', 'background-color: #000000;')
css = css.replace('background: #f2f2f2;', 'background: #111111;')
css = css.replace('background: #fff;', 'background: #000000;')

# For navbar specifically
css = css.replace('background-color: #fff;', 'background-color: #000;') # Already covered but let's be sure
css = css.replace('fill: #fff;', 'fill: #050505;')
css = css.replace('fill: #f3f3f3;', 'fill: #0a0a0a;')
css = css.replace('fill: #111;', 'fill: #111111;')

# Replace various text colors to fit horror
# 'p' color from #748182 to a darker, bloodier gray or just red
css = css.replace('color: #748182;', 'color: #999999;')

# 'a' color #000 to red
css = css.replace('color: #000;', 'color: #F50101;')

# borders
css = css.replace('border: 1px solid #aaa;', 'border: 1px solid #F50101;')
css = css.replace('border: 1px solid #000;', 'border: 1px solid #F50101;')

# loader section background
css = css.replace('background: #111;', 'background: #000;')

# Other light stuff
css = css.replace('color: #fff;', 'color: #cccccc;')
# Re-adjust specific #F50101 elements just in case they were #fff before
# I'll leave them alone for now

# Replace hover shadows
css = css.replace('rgba(0, 0, 0, 0.1)', 'rgba(245, 1, 1, 0.2)')
css = css.replace('rgba(0, 0, 0, 0.01)', 'rgba(245, 1, 1, 0.1)')

# Re-enforce red headers and links if missed
css = css.replace('color: #000 !important;', 'color: #F50101 !important;')

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css)

print("style.css successfully updated to horror theme!")
