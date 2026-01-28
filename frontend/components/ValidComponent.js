// This is a valid frontend component - should pass all checks

function ValidComponent() {
  const currentUser = {
    name: 'John Doe',
    email: 'john@example.com'
  };

  return {
    name: currentUser.name,
    email: currentUser.email
  };
}

export default ValidComponent;
