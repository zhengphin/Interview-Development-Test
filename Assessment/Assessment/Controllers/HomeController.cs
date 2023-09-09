using Assessment.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Diagnostics;

namespace Assessment.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly List<Country> countries;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;

            // Initialize the countries within the constructor
            var country1 = new Country
            {
                CountryId = 1,
                Name = "United States",
                States = new List<State>
                {
                    new State
                    {
                        StateId = 101,
                        CountryId = 1,
                        Name = "California",
                        Cities = new List<City>
                        {
                            new City { CityId = 1001, Name = "Los Angeles", StateId = 101 },
                            new City { CityId = 1002, Name = "San Francisco", StateId = 101}
                        }
                    },
                    new State
                    {
                        StateId = 102,
                        Name = "New York",
                        CountryId = 1,
                        Cities = new List<City>
                        {
                            new City { CityId = 1003, Name = "New York City" , StateId = 102 },
                            new City { CityId = 1004, Name = "Buffalo" , StateId = 102 }
                        }
                    }
                }
            };

            var country2 = new Country
            {
                CountryId = 2,
                Name = "Canada",
                States = new List<State>
                {
                    new State
                    {
                        StateId = 201,
                        Name = "Ontario",
                        CountryId = 2,
                        Cities = new List<City>
                        {
                            new City { CityId = 2001, Name = "Toronto", StateId = 201 },
                            new City { CityId = 2002, Name = "Ottawa", StateId = 201 }
                        }
                    },
                    new State
                    {
                        StateId = 202,
                        Name = "Quebec",
                        CountryId = 2,
                        Cities = new List<City>
                        {
                            new City { CityId = 2003, Name = "Montreal",StateId = 202 },
                            new City { CityId = 2004, Name = "Quebec City" ,StateId = 202}
                        }
                    }
                }
            };

            countries = new List<Country> { country1, country2 };
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [HttpGet("customers")]
        public IActionResult Customers()
        {
            // Create two customer objects
            var customer1 = new Customer
            {
                CustomerId = 1,
                Name = "John Doe",
                Address = "123 Main Street",
                City = countries[0].States[0].Cities[0], // Customer lives in Los Angeles
                PinCode = "90001",
                State = countries[0].States[0], // Customer lives in California
                Country = countries[0] // Customer is in the United States
            };

            var customer2 = new Customer
            {
                CustomerId = 2,
                Name = "Alice Smith",
                Address = "456 Elm Avenue",
                City = countries[0].States[1].Cities[0], // Customer lives in New York City
                PinCode = "10001",
                State = countries[0].States[1], // Customer lives in New York
                Country = countries[0] // Customer is in the United States
            };

            var customer3 = new Customer
            {
                CustomerId = 3,
                Name = "JR Smith",
                Address = "456 Elm Avenue",
                City = countries[0].States[1].Cities[1], // Customer lives in New York City
                PinCode = "10001",
                State = countries[0].States[1], // Customer lives in New York
                Country = countries[0] // Customer is in the United States
            };
            var customer4 = new Customer
            {
                CustomerId = 4,
                Name = "Leborn James",
                Address = "456 Elm Avenue",
                City = countries[1].States[1].Cities[1], // Customer lives in New York City
                PinCode = "10041",
                State = countries[1].States[1], // Customer lives in New York
                Country = countries[1] // Customer is in the United States
            };
            var customer5 = new Customer
            {
                CustomerId = 5,
                Name = "Westbrook",
                Address = "456 Elm Avenue",
                City = countries[1].States[0].Cities[0], // Customer lives in New York City
                PinCode = "10041",
                State = countries[1].States[0], // Customer lives in New York
                Country = countries[1] // Customer is in the United States
            };
            var customer6 = new Customer
            {
                CustomerId = 6,
                Name = "Austin",
                Address = "456 Elm Avenue",
                City = countries[1].States[0].Cities[0], // Customer lives in New York City
                PinCode = "10041",
                State = countries[1].States[0], // Customer lives in New York
                Country = countries[1] // Customer is in the United States
            };
            // Create a list of customers
            var customers = new List<Customer> { customer1, customer2 , customer3, customer4, customer5, customer6};

            return Ok(customers);
        }


        [HttpGet("countries")]
        public IActionResult Countries()
        {
            return Ok(countries);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
