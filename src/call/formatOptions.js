export default key => {
  return {
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    }
  }
}
