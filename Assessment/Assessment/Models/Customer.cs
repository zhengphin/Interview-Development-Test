namespace Assessment.Models
{
 public class Customer
{
    public int CustomerId { get; set; } // Optionally, if you want to assign a unique ID to each customer
    public string Name { get; set; }
    public string Address { get; set; }
    public City City { get; set; }
    public string PinCode { get; set; }
    public State State { get; set; }
    public Country Country { get; set; }
}

}
