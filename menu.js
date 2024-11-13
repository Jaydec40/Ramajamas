const menuItems = [
    {
      category: 'Breakfast',
      items: [
        {
          id: 1,
          name: '#1',
          description: 'Two eggs, bacon or sausage, grits or hashbrowns, and biscuit or toast',
          price: 6.99,
          options: [
            { name: 'Egg Style', choices: ['Scrambled', 'Fried', 'Poached', 'Over Easy', 'Sunny Side Up'] },
            { name: 'Meat', choices: ['Bacon', 'Sausage'] },
            { name: 'Side', choices: ['Grits', 'Hashbrowns'] },
            { name: 'Bread', choices: ['Biscuit', 'Toast'] },
          ],
        },
        {
          id: 2,
          name: '#2',
          description: 'Two eggs, smoked ham, grits or hashbrowns, and biscuit or toast',
          price: 8.99,
          options: [
            { name: 'Egg Style', choices: ['Scrambled', 'Fried', 'Poached', 'Over Easy', 'Sunny Side Up'] },
            { name: 'Side', choices: ['Grits', 'Hashbrowns'] },
            { name: 'Bread', choices: ['Biscuit', 'Toast'] },
          ],
        },
        {
          id: 3,
          name: '#3',
          description: 'Two eggs, two pancakes, and biscuit or toast',
          price: 6.99,
          options: [
            { name: 'Egg Style', choices: ['Scrambled', 'Fried', 'Poached', 'Over Easy', 'Sunny Side Up'] },
            { name: 'Bread', choices: ['Biscuit', 'Toast'] },
          ],
        },
        {
          id: 4,
          name: '#4',
          description: 'Two pancakes, bacon or sausage',
          price: 8.99,
          options: [
            { name: 'Meat', choices: ['Bacon', 'Sausage'] },
          ],
        },
        
      ],
    },
    {
      category: 'Biscuits',
      items: [
        {
          id: 5,
          name: 'Plain Biscuit',
          description: 'Freshly baked plain biscuit',
          price: 0.99,
          options: [],
        },
        {
          id: 6,
          name: 'Ham Biscuit',
          description: 'Grilled ham on a biscuit',
          price: 2.99,
          options: [],
        },
        {
          id: 7,
          name: 'Chicken Biscuit',
          description: 'Grilled chicken on a biscuit',
          price: 2.99,
          options: [],
        },
        {
          id: 8,
          name: 'Sausage Biscuit',
          description: 'Sausage on a biscuit',
          price: 2.79,
          options: [],
        },
        {
          id: 9,
          name: 'Bacon Biscuit',
          description: 'Bacon on a biscuit',
          price: 2.79,
          options: [],
        },
        {
          id: 10,
          name: 'Sausage Gravy Biscuit',
          description: 'Sausage on a biscuit with gravy',
          price: 3.49,
          options: [],
        },
        
      ],
    },
    {
      category: 'French Toast',
      items: [
        {
          id: 11,
          name: 'French Toast',
          description: 'Delicious French toast served with syrup',
          price: 7.99,
          options: [
            { name: 'Add Toppings', choices: ['Strawberries', 'Bananas', 'Whipped Cream'], multiple: true },
          ],
        },
      ],
    },
    {
      category: 'Sandwich Items',
      items: [
        {
          id: 12,
          name: 'BLT',
          description: 'Bacon, lettuce, tomato sandwich',
          price: 6.99,
          options: [
            { name: 'Bread', choices: ['White', 'Wheat', 'Sourdough'] },
            { name: 'Extras', choices: ['Cheese', 'Avocado'], multiple: true },
          ],
        },
        {
          id: 13,
          name: 'Cheeseburger',
          description: 'Juicy cheeseburger with all the fixings',
          price: 7.99,
          options: [
            { name: 'Cheese Type', choices: ['American', 'Cheddar', 'Swiss'] },
            { name: 'Temperature', choices: ['Rare', 'Medium Rare', 'Medium', 'Well Done'] },
            { name: 'Toppings', choices: ['Lettuce', 'Tomato', 'Onion', 'Pickles'], multiple: true },
            { name: 'Extras', choices: ['Bacon', 'Avocado', 'Extra Patty'], multiple: true },
          ],
        },
        {
          id: 14,
          name: 'Hamburger',
          description: 'Classic hamburger with fresh ingredients',
          price: 7.49,
          options: [
            { name: 'Temperature', choices: ['Rare', 'Medium Rare', 'Medium', 'Well Done'] },
            { name: 'Toppings', choices: ['Lettuce', 'Tomato', 'Onion', 'Pickles'], multiple: true },
            { name: 'Extras', choices: ['Bacon', 'Avocado', 'Extra Patty'], multiple: true },
          ],
        },
        {
          id: 15,
          name: 'Chicken Basket',
          description: 'Crispy chicken tenders with fries',
          price: 10.99,
          options: [
            { name: 'Sauce', choices: ['BBQ', 'Ranch', 'Honey Mustard', 'Ketchup'], multiple: true },
          ],
        },
        {
          id: 16,
          name: 'Hot Dog',
          description: 'Grilled hot dog on a toasted bun',
          price: 2.59,
          options: [
            { name: 'Toppings', choices: ['Ketchup', 'Mustard', 'Relish', 'Onions'], multiple: true },
          ],
        },
        
      ],
    },
    {
      category: 'Sides',
      items: [
        {
          id: 17,
          name: 'Fries',
          description: 'Crispy golden fries',
          price: 1.99,
          options: [
            { name: 'Seasoning', choices: ['Regular', 'Cajun', 'Garlic Parmesan'] },
          ],
        },
        {
          id: 18,
          name: 'Onion Rings',
          description: 'Delicious onion rings',
          price: 2.99,
          options: [],
        },
        {
          id: 19,
          name: 'Hashbrowns',
          description: 'Golden hashbrowns cooked to perfection',
          price: 1.99,
          options: [
            { name: 'Add Ons', choices: ['Cheese', 'Onions', 'Peppers'], multiple: true },
          ],
        },
        {
          id: 20,
          name: 'Grits',
          description: 'Creamy Southern-style grits',
          price: 1.99,
          options: [
            { name: 'Add Cheese', choices: ['Yes', 'No'] },
          ],
        },
        
      ],
    },
    {
      category: 'Beverages',
      items: [
        {
          id: 21,
          name: 'Coffee',
          description: 'Freshly brewed hot coffee',
          price: 1.99,
          options: [
            { name: 'Size', choices: ['Small', 'Medium', 'Large'] },
            { name: 'Additions', choices: ['Milk', 'Sugar', 'Cream'], multiple: true },
          ],
        },
        {
          id: 22,
          name: 'Tea',
          description: 'Hot or iced tea',
          price: 1.99,
          options: [
            { name: 'Type', choices: ['Hot', 'Iced'] },
            { name: 'Flavor', choices: ['Regular', 'Lemon', 'Peach'] },
          ],
        },
        {
          id: 23,
          name: 'Soda',
          description: 'Assorted soft drinks',
          price: 1.99,
          options: [
            { name: 'Flavor', choices: ['Coke', 'Diet Coke', 'Sprite', 'Dr Pepper'] },
            { name: 'Size', choices: ['Small', 'Medium', 'Large'] },
          ],
        },
        {
          id: 24,
          name: 'Orange Juice',
          description: 'Fresh squeezed orange juice',
          price: 2.49,
          options: [
            { name: 'Size', choices: ['Small', 'Medium', 'Large'] },
          ],
        },
        
      ],
    },
 
  ];
  
  