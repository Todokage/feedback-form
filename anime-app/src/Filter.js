


const Filter = ({ onTitleChange, onRatingChange }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Filter by Title"
        onChange={(e) => onTitleChange(e.target.value)}
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <input
        type="number"
        placeholder="Filter by Rating (0-5)"
        min="0"
        max="5"
        onChange={(e) => onRatingChange(e.target.value)}
        style={{ padding: '8px' }}
      />
    </div>
  );
};

export default Filter;