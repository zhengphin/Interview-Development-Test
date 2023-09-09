# Interview-Development-Test

Setting up CORS Configuration
1.Open the program.cs file in your .NET Core project (Assessment folder).
2.Locate the following code block in program.cs:
// Add CORS configuration here
app.UseCors(policy => policy
    .WithOrigins("http://localhost:5173") // Replace with the actual origin of your React.js app
    .AllowAnyHeader()
    .AllowAnyMethod()
);

3. Start the server that return sample data

