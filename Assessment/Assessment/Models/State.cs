﻿namespace Assessment.Models
{
    public class State
    {
        public int StateId { get; set; }
        public string Name { get; set; }

        public int CountryId { get; set; }

        public List<City> Cities { get; set; }
    }
}
