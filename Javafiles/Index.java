import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DataEntryAndCalculation {

    // ... (rest of the code remains the same)

    public static void main(String[] args) {
        // Create a RESTful API endpoint to receive the form data
        // For example, using Java Servlet
        public class DataEntryServlet extends HttpServlet {
            @Override
            protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
                String name = req.getParameter("name");
                String email = req.getParameter("email");
                String message = req.getParameter("message");
                double num1 = Double.parseDouble(req.getParameter("num1"));
                double num2 = Double.parseDouble(req.getParameter("num2"));
                String operator = req.getParameter("operator");

                // Perform the calculation and save the data
                double result = performCalculation(num1, num2, operator);
                if (!Double.isNaN(result)) {
                    System.out.println("Result: " + result);
                    saveData(name, email, num1, num2, operator, result);
                } else {
                    System.out.println("Calculation failed due to invalid input.");
                }
            }
        }
    }
}