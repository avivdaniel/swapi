# Star Wars API Challenge

Welcome to the Star Wars Rebel Academy Trials! This challenge is designed to test your skills in working with the Star Wars API, which provides data about Star Wars films, characters, planets, vehicles, and more. Your task is to complete two parts of the challenge. Let's dive into the details!

## Challenge Description

### Part 1: Vehicle Population Sum

- The Star Wars story includes many characters, some of whom are pilots.
- Each vehicle can have multiple pilots.
- Each pilot may drive multiple vehicles and has a home planet.
- Each home planet has a population.

Your challenge is to use the Star Wars API to find the vehicles that have the highest sum of population for all their pilots' home planets. You need to print the following information in a table:

- Vehicle name with the largest sum: `{vehicle name}`
- Related home planets and their respective population:[{name}, {number}]
- Related pilot names: [{name}]


Make sure to explore the data returned by the API before starting the implementation.

### Part 2: Home Planets Population Bar Chart

Create a bar chart to compare the population of the following home planets: Tatooine, Alderaan, Naboo, Bespin, and Endor. You should implement the chart without using any chart libraries. There is no need to include axes, but we do want to see a legend.

The chart should represent the planet populations using bars. Here is an example of how it could look:

Tatooine | ██████████ (population count)
Alderaan | █████ (population count)
Naboo    | ██████████████████████ (population count)
Bespin   | ████████ (population count)
Endor    | ███████ (population count)


## Requirements

- Implement the code to be as performant as possible.
- Prioritize code readability and maintainability.
- Use React for building the application.
- Do not use any API wrappers; interact directly with the SWAPI or implement your own wrapper.
- Submit your solution on GitLab, GitHub, Bitbucket, or any other version control platform.

## Getting Started

To run the project locally and explore the solution, follow these steps:

1. Clone the repository: `git clone https://github.com/avivdaniel/swapi.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open your browser and access the application at `http://localhost:3000`

## Project Structure

The project follows a standard React application structure:

- `src/`: Contains the source code of the application.
  - `components/`: Includes reusable React components.
  - `hooks/`: Includes hooks functions for data processing and calculations.
  - `assets/`: Contains static assets.

## Contributing

Contributions to this project are welcome! If you have any ideas for improvements or find any issues, feel free to open an issue or submit a pull request. Make sure to follow the project's code of conduct and best practices when contributing.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code for both commercial and non-commercial purposes.

May the force be with you! 🌟

