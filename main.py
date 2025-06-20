from fpdf import FPDF

def create_pdf_with_lines(output="output.pdf"):
    pdf = FPDF(orientation="P", unit="mm", format="A4")
    pdf.add_page()
    pdf.set_font("Helvetica", size=12)
    lines = [f"Line {i+1}" for i in range(5)]
    for line in lines:
        pdf.cell(0, 10, txt=line, ln=True)
    pdf.output(output)

def creaye_pdf_html():
    pdf = FPDF()
    pdf.add_page()
    pdf.write_html("""
    <h1>Title</h1>
    <p>This is a <b>bold</b> paragraph.</p>
    <ul><li>Item 1</li><li>Item 2</li></ul>
    <table border="1"><tr><th>ID</th><th>Name</th></tr>
        <tr><td>1</td><td>Alice</td></tr>
    </table>
    """)
    pdf.output("html_output.pdf")

if __name__ == "__main__":
    creaye_pdf_html()
