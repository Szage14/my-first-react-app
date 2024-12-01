import PropTypes from 'prop-types';

function FruitList({ title, fruits }) {
  return (
    <div>
      <h2>{title}</h2>
      <ol>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            {fruit.name}: <b>{fruit.calories}</b> <i>calories</i>
          </li>
        ))}
      </ol>
    </div>
  );
}

FruitList.propTypes = {
  title: PropTypes.string.isRequired,
  fruits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired
    })
  ).isRequired
};

function List() {
  const fruits = [
    { id: 1, name: 'Apple', calories: 52 },
    { id: 2, name: 'Banana', calories: 96 },
    { id: 3, name: 'Cherry', calories: 50 },
    { id: 4, name: 'Date', calories: 282 },
    { id: 5, name: 'Elderberry', calories: 73 },
    { id: 6, name: 'Fig', calories: 74 },
    { id: 7, name: 'Grape', calories: 69 }
  ];

  // Sort fruits by name in ascending order
  const sortedByNameAsc = [...fruits].sort((a, b) => a.name.localeCompare(b.name));
  
  // Sort fruits by name in descending order
  const sortedByNameDesc = [...fruits].sort((a, b) => b.name.localeCompare(a.name));
  
  // Sort fruits by calories in ascending order
  const sortedByCaloriesAsc = [...fruits].sort((a, b) => a.calories - b.calories);
  
  // Sort fruits by calories in descending order
  const sortedByCaloriesDesc = [...fruits].sort((a, b) => b.calories - a.calories);

  // Filter fruits with less than 100 calories
  const lowCalFruits = fruits.filter(fruit => fruit.calories < 100);

  // Filter fruits with more than 100 calories
  const highCalFruits = fruits.filter(fruit => fruit.calories > 100);

  return (
    <div>
      <FruitList title="All Fruits (Sorted by Name Ascending)" fruits={sortedByNameAsc} />
      <FruitList title="Low Calorie Fruits (Less than 100 calories)" fruits={lowCalFruits} />
      <FruitList title="High Calorie Fruits (More than 100 calories)" fruits={highCalFruits} />
    </div>
  );
}

export default List;