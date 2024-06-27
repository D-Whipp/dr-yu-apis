import express from "express";
import bodyParser from "body-parser";

// import info from './recipe.json' assert {type: 'json'};

const app = express();
const port = 3000;

//Step 1: Run the solution.js file without looking at the code.
//Step 2: You can go to the recipe.json file to see the full structure of the recipeJSON below.
const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// custom middleware
// const myLogger = function (req, res, next) {
//   console.log("LOGGED");
//   const parsedJSON = JSON.parse(recipeJSON)
//   console.log("RECIPE LOGGER", parsedJSON)
//   next();
// }

// app.use(myLogger);

// const reqLogger = function (req, res, next) {
//   console.log("Request Method: ", req.method);
//   console.log("Request URL: ", req.url);
//   console.log("Request: ", req);
//   next();
// }

// app.use(reqLogger);

// const button = document.getElementsByTagName('button');
// button.addEventListener('click', function(e) {
//   console.log('Button was clicked!')
// })

const customMiddleware = function (req, res, next) {
  let parsedRecipe = JSON.parse(recipeJSON);

  console.log("Middleware Body: ", req.body.choice)
  console.log("Middleware fired!");
  console.log("recipeJSON: ", parsedRecipe[1]);
  next();
}

app.use(customMiddleware);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/recipe", (req, res) => {
  //Step 3: Write your code here to make this behave like the solution website.
  //Step 4: Add code to views/index.ejs to use the recieved recipe object.

  // console.log('JSON: ', recipes)
  console.log("Recipe Req: ", req.body.choice);
  res.render("index.ejs", {recipes: "Hi"});

});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
