module.exports = {
  "extends": ["airbnb",
              "standard",
              "standard-react"
  ],
  "plugins": [
        "prettier"
   ],
  "parserOptions": {
    "ecmaVersion": 2016,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },

  "env": {
    "es6": true,
    "browser": true,
    "node": true
  }

};
